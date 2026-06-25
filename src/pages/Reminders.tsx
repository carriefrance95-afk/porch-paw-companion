import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { usePets } from '../context/PetContext';
import type { Appointment, DirectoryEntry } from '../types';
import { addDays, addMonths, addWeeks, addYears, eachDayOfInterval, endOfMonth, endOfWeek, format, isWithinInterval, parseISO, startOfMonth, startOfWeek, subMonths, subWeeks } from 'date-fns';
import { Plus, Calendar as CalendarIcon, Clock, MapPin, CheckCircle2, Circle, Trash2, Edit, ChevronLeft, ChevronRight, LayoutGrid, List, Funnel, Sparkles } from 'lucide-react';

const CATEGORY_OPTIONS = [
  { value: 'all', label: 'All Events' },
  { value: 'Vet', label: 'Vet Appointment' },
  { value: 'Groomer', label: 'Grooming' },
  { value: 'Trainer', label: 'Training' },
  { value: 'Medication', label: 'Medication' },
  { value: 'Vaccination', label: 'Vaccination' },
  { value: 'Birthday', label: 'Birthday' },
  { value: 'Other', label: 'Custom' },
];

const PRIORITY_OPTIONS = [
  { value: 'all', label: 'All Priorities' },
  { value: 'Low', label: 'Low' },
  { value: 'Medium', label: 'Medium' },
  { value: 'High', label: 'High' },
];

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const REMINDER_VIEWS = ['Month', 'Week', 'Agenda'] as const;

type ReminderView = typeof REMINDER_VIEWS[number];

type DayOfWeek = 'Sun' | 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat';

interface EventOccurrence {
  date: Date;
  appointment: Appointment;
}

const getEventColor = (type: Appointment['type']) => {
  switch (type) {
    case 'Vet':
      return 'bg-sage-light text-sage border border-sage/20';
    case 'Groomer':
      return 'bg-terracotta-light text-terracotta border border-terracotta/20';
    case 'Trainer':
      return 'bg-primary/10 text-primary border border-primary/20';
    case 'Medication':
      return 'bg-[#f8e7d8] text-[#b65e3c] border border-[#b65e3c]/20';
    case 'Vaccination':
      return 'bg-[#e7f0e5] text-[#5f744c] border border-[#5f744c]/20';
    case 'Birthday':
      return 'bg-[#f4ece5] text-[#7a7b5a] border border-[#7a7b5a]/20';
    default:
      return 'bg-base-200 text-base-content border border-base-300';
  }
};

const getPriorityBadge = (priority?: Appointment['priority']) => {
  switch (priority) {
    case 'High':
      return 'badge badge-error badge-sm';
    case 'Medium':
      return 'badge badge-warning badge-sm';
    case 'Low':
      return 'badge badge-primary badge-sm';
    default:
      return 'badge badge-outline badge-sm';
  }
};

const parseDate = (date: string) => parseISO(date);

const buildOccurrences = (appointment: Appointment, rangeStart: Date, rangeEnd: Date): EventOccurrence[] => {
  const eventDate = parseDate(appointment.date);
  const recurrence = appointment.recurrence;
  const occurrences: EventOccurrence[] = [];
  const withinRange = (date: Date) => isWithinInterval(date, { start: rangeStart, end: rangeEnd });

  if (!recurrence || recurrence.frequency === 'None') {
    if (withinRange(eventDate)) {
      occurrences.push({ date: eventDate, appointment });
    }
    return occurrences;
  }

  const endsOn = recurrence.endsOn ? parseDate(recurrence.endsOn) : rangeEnd;
  const interval = recurrence.interval || 1;

  if (recurrence.frequency === 'Daily') {
    let current = eventDate;
    while (current <= rangeEnd && current <= endsOn) {
      if (withinRange(current)) occurrences.push({ date: current, appointment });
      current = addDays(current, interval);
    }
    return occurrences;
  }

  if (recurrence.frequency === 'Weekly') {
    const daysOfWeek = recurrence.daysOfWeek?.length ? recurrence.daysOfWeek : [DAY_LABELS[parseDate(appointment.date).getDay()] as DayOfWeek];
    let currentWeek = startOfWeek(eventDate, { weekStartsOn: 0 });
    while (currentWeek <= rangeEnd && currentWeek <= endsOn) {
      daysOfWeek.forEach(dayLabel => {
        const dayIndex = DAY_LABELS.indexOf(dayLabel);
        const candidate = addDays(currentWeek, dayIndex);
        if (candidate >= eventDate && candidate <= rangeEnd && candidate <= endsOn && withinRange(candidate)) {
          occurrences.push({ date: candidate, appointment });
        }
      });
      currentWeek = addWeeks(currentWeek, interval);
    }
    return occurrences;
  }

  if (recurrence.frequency === 'Monthly') {
    let current = eventDate;
    while (current <= rangeEnd && current <= endsOn) {
      if (withinRange(current)) occurrences.push({ date: current, appointment });
      current = addMonths(current, interval);
    }
    return occurrences;
  }

  if (recurrence.frequency === 'Yearly') {
    let current = eventDate;
    while (current <= rangeEnd && current <= endsOn) {
      if (withinRange(current)) occurrences.push({ date: current, appointment });
      current = addYears(current, interval);
    }
    return occurrences;
  }

  return occurrences;
};

const getDisplayTitle = (appointment: Appointment) => appointment.title || appointment.providerName || appointment.type;

const Reminders: React.FC = () => {
  const { profiles, appointments, directory, addAppointment, updateAppointment, deleteAppointment } = usePets();
  const location = useLocation();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<ReminderView>('Month');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDog, setSelectedDog] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeEventId, setActiveEventId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);
  const [providerContext, setProviderContext] = useState<DirectoryEntry | null>(null);
  const [prefillApplied, setPrefillApplied] = useState(false);

  const defaultFormState: Partial<Appointment> = {
    dogId: profiles[0]?.id || '',
    type: 'Vet',
    title: '',
    date: new Date().toISOString().split('T')[0],
    time: '10:00',
    providerName: '',
    providerAddress: '',
    location: '',
    notes: '',
    priority: 'Medium',
    completed: false,
    recurrence: { frequency: 'None', interval: 1, daysOfWeek: [] },
  };

  const [formData, setFormData] = useState<Partial<Appointment>>(defaultFormState);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const providerId = params.get('providerId');
    if (!providerId || prefillApplied || isModalOpen) return;

    const provider = directory.find(item => item.id === providerId);
    if (!provider) return;

    setProviderContext(provider);
    setFormData(prev => ({
      ...prev,
      providerName: provider.name,
      providerAddress: provider.address ?? '',
      title: prev.title || provider.name,
    }));
    setIsModalOpen(true);
    setPrefillApplied(true);
    navigate('/reminders', { replace: true });
  }, [location.search, directory, prefillApplied, isModalOpen, navigate]);

  const filteredAppointments = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return appointments.filter(appointment => {
      if (selectedDog !== 'all' && appointment.dogId !== selectedDog) return false;
      if (selectedCategory !== 'all' && appointment.type !== selectedCategory) return false;
      if (selectedPriority !== 'all' && appointment.priority !== selectedPriority) return false;

      if (!query) return true;

      const title = getDisplayTitle(appointment).toLowerCase();
      const notes = appointment.notes?.toLowerCase() ?? '';
      const location = appointment.location?.toLowerCase() ?? '';
      return title.includes(query) || notes.includes(query) || location.includes(query);
    });
  }, [appointments, selectedDog, selectedCategory, selectedPriority, searchTerm]);

  const viewRange = useMemo(() => {
    if (viewMode === 'Week') {
      const start = startOfWeek(currentDate, { weekStartsOn: 0 });
      const end = endOfWeek(currentDate, { weekStartsOn: 0 });
      return { start, end };
    }

    if (viewMode === 'Agenda') {
      const start = currentDate;
      const end = addMonths(currentDate, 1);
      return { start, end };
    }

    const start = startOfWeek(startOfMonth(currentDate), { weekStartsOn: 0 });
    const end = endOfWeek(endOfMonth(currentDate), { weekStartsOn: 0 });
    return { start, end };
  }, [currentDate, viewMode]);

  const occurrences = useMemo(() => {
    const events = filteredAppointments.flatMap(appointment => buildOccurrences(appointment, viewRange.start, viewRange.end));
    return events.sort((a, b) => a.date.getTime() - b.date.getTime());
  }, [filteredAppointments, viewRange]);

  const occurrencesByDate = useMemo(() => {
    return occurrences.reduce<Record<string, EventOccurrence[]>>((acc, occurrence) => {
      const dayKey = format(occurrence.date, 'yyyy-MM-dd');
      acc[dayKey] = acc[dayKey] ? [...acc[dayKey], occurrence] : [occurrence];
      return acc;
    }, {});
  }, [occurrences]);

  const timelineDays = useMemo(() => {
    if (viewMode === 'Week') {
      return eachDayOfInterval({ start: viewRange.start, end: viewRange.end });
    }
    return eachDayOfInterval({ start: viewRange.start, end: viewRange.end });
  }, [viewMode, viewRange]);

  const activeEvent = useMemo(() => {
    return appointments.find(app => app.id === activeEventId) || null;
  }, [activeEventId, appointments]);

  const statTotals = useMemo(() => {
    return {
      total: filteredAppointments.length,
      upcoming: filteredAppointments.filter(a => !a.completed).length,
      recurring: filteredAppointments.filter(a => a.recurrence?.frequency && a.recurrence.frequency !== 'None').length,
      highPriority: filteredAppointments.filter(a => a.priority === 'High').length,
    };
  }, [filteredAppointments]);

  const handleOpenModal = (appointment?: Appointment) => {
    if (appointment) {
      setEditingAppointment(appointment);
      setFormData(appointment);
    } else {
      setEditingAppointment(null);
      setFormData({ ...defaultFormState, dogId: profiles[0]?.id || '' });
    }
    setIsModalOpen(true);
  };

  const handleRecurrenceChange = (field: keyof NonNullable<Appointment['recurrence']>, value: any) => {
    setFormData(prev => ({
      ...prev,
      recurrence: {
        ...(prev.recurrence ?? { frequency: 'None', interval: 1, daysOfWeek: [] }),
        [field]: value,
      },
    }));
  };

  const handleToggleWeekday = (day: DayOfWeek) => {
    setFormData(prev => {
      const daysOfWeek = prev.recurrence?.daysOfWeek || [];
      const updated = daysOfWeek.includes(day)
        ? daysOfWeek.filter(item => item !== day)
        : [...daysOfWeek, day];
      return {
        ...prev,
        recurrence: {
          ...(prev.recurrence ?? { frequency: 'None', interval: 1, daysOfWeek: [] }),
          daysOfWeek: updated,
        },
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const appointment: Appointment = {
      id: editingAppointment?.id ?? Math.random().toString(36).substring(2, 11),
      dogId: formData.dogId || profiles[0]?.id || '',
      type: formData.type as Appointment['type'] || 'Vet',
      title: formData.title,
      date: formData.date || new Date().toISOString().split('T')[0],
      time: formData.time || '10:00',
      providerName: formData.providerName || '',
      providerAddress: formData.providerAddress,
      location: formData.location,
      notes: formData.notes,
      priority: formData.priority as Appointment['priority'] || 'Medium',
      recurrence: formData.recurrence || { frequency: 'None', interval: 1, daysOfWeek: [] },
      completed: formData.completed ?? false,
      externalSource: formData.externalSource,
      externalId: formData.externalId,
    };

    if (editingAppointment) {
      updateAppointment(appointment);
    } else {
      addAppointment(appointment);
    }
    setIsModalOpen(false);
  };

  const handlePeriodNav = (direction: 'prev' | 'next') => {
    if (viewMode === 'Month') {
      setCurrentDate(prev => (direction === 'prev' ? subMonths(prev, 1) : addMonths(prev, 1)));
    } else if (viewMode === 'Week') {
      setCurrentDate(prev => (direction === 'prev' ? subWeeks(prev, 1) : addWeeks(prev, 1)));
    } else {
      setCurrentDate(prev => (direction === 'prev' ? addDays(prev, -7) : addDays(prev, 7)));
    }
  };

  const getDayEvents = (day: Date) => {
    const key = format(day, 'yyyy-MM-dd');
    return occurrencesByDate[key] ?? [];
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <CalendarIcon size={28} className="text-primary" />
            <div>
              <h1 className="text-3xl font-bold text-base-content">Reminders & Scheduling</h1>
              <p className="text-base-content/70">Month, week, and agenda planning for every pet-specific event.</p>
            </div>
          </div>
          {providerContext && (
            <div className="rounded-3xl border border-info/20 bg-info/5 p-4 text-sm text-info-content">
              <strong>Provider selected:</strong> {providerContext.name} — {providerContext.category}
              {providerContext.phone && (
                <span className="block mt-1">Contact: <a href={`tel:${providerContext.phone}`} className="underline">{providerContext.phone}</a></span>
              )}
            </div>
          )}
        </div>
        <button className="btn btn-primary rounded-2xl shadow-lg flex items-center gap-2" onClick={() => handleOpenModal()} disabled={profiles.length === 0}>
          <Plus size={20} /> Add Reminder
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.5fr_0.9fr]">
        <div className="space-y-6">
          <div className="rounded-[2rem] border border-base-200 bg-base-100 p-5 shadow-sm">
            <div className="grid gap-4 xl:grid-cols-4">
              <div className="form-control">
                <label className="label"><span className="label-text font-semibold">Dog</span></label>
                <select className="select select-bordered rounded-2xl" value={selectedDog} onChange={e => setSelectedDog(e.target.value)}>
                  <option value="all">All Pets</option>
                  {profiles.map(dog => <option key={dog.id} value={dog.id}>{dog.name}</option>)}
                </select>
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text font-semibold">Category</span></label>
                <select className="select select-bordered rounded-2xl" value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
                  {CATEGORY_OPTIONS.map(item => <option key={item.value} value={item.value}>{item.label}</option>)}
                </select>
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text font-semibold">Priority</span></label>
                <select className="select select-bordered rounded-2xl" value={selectedPriority} onChange={e => setSelectedPriority(e.target.value)}>
                  {PRIORITY_OPTIONS.map(item => <option key={item.value} value={item.value}>{item.label}</option>)}
                </select>
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text font-semibold">Search</span></label>
                <input type="search" className="input input-bordered rounded-2xl" placeholder="Search reminders" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] bg-base-100 border border-base-200 p-5 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-base-content/50">Calendar View</p>
                <h2 className="text-xl font-bold">{viewMode} View</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {REMINDER_VIEWS.map(mode => (
                  <button key={mode} type="button" onClick={() => setViewMode(mode)} className={`btn btn-sm rounded-full ${viewMode === mode ? 'btn-primary' : 'btn-outline'}`}>
                    {mode === 'Month' ? <LayoutGrid size={16} /> : mode === 'Week' ? <List size={16} /> : <Funnel size={16} />} {mode}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-3 rounded-full border border-base-300 bg-base-200 px-4 py-3">
                  <button type="button" className="btn btn-ghost btn-circle btn-sm" onClick={() => handlePeriodNav('prev')}><ChevronLeft size={18} /></button>
                  <span className="font-semibold">{viewMode === 'Month' ? format(currentDate, 'MMMM yyyy') : viewMode === 'Week' ? `${format(viewRange.start, 'MMM d')} - ${format(viewRange.end, 'MMM d')}` : `Next 30 days`}</span>
                  <button type="button" className="btn btn-ghost btn-circle btn-sm" onClick={() => handlePeriodNav('next')}><ChevronRight size={18} /></button>
                </div>
              </div>
              <button type="button" className="btn btn-outline rounded-2xl" onClick={() => setCurrentDate(new Date())}>Today</button>
            </div>
          </div>

          <div className="rounded-[2rem] border border-base-200 bg-base-100 p-4 overflow-hidden">
            {viewMode === 'Month' && (
              <div className="grid grid-cols-7 gap-px border-b border-base-200 text-center text-xs uppercase tracking-[0.2em] text-base-content/60 bg-base-200 py-3">
                {DAY_LABELS.map(day => <div key={day}>{day}</div>)}
              </div>
            )}

            {viewMode === 'Month' && (
              <div className="grid grid-cols-7 gap-px bg-base-200">
                {eachDayOfInterval({ start: viewRange.start, end: viewRange.end }).map(day => {
                  const isCurrentMonth = day.getMonth() === currentDate.getMonth();
                  const dayEvents = getDayEvents(day);
                  return (
                    <div key={day.toISOString()} className={`min-h-[90px] md:min-h-[140px] border border-base-200 bg-base-100 p-3 ${isCurrentMonth ? '' : 'bg-base-200 text-base-content/50'}`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold">{format(day, 'd')}</span>
                        {isWithinInterval(day, { start: new Date(), end: new Date() }) && format(day, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd') ? <span className="badge badge-primary badge-sm">Today</span> : null}
                      </div>
                      <div className="space-y-2">
                        {dayEvents.slice(0, 2).map((occ, idx) => (
                          <button key={`${occ.appointment.id}-${idx}`} type="button" onClick={() => setActiveEventId(occ.appointment.id)} className={`block w-full rounded-2xl p-2 text-left ${getEventColor(occ.appointment.type)} hover:scale-[1.01] transition`}> 
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-[11px] font-bold uppercase tracking-[0.2em]">{occ.appointment.type}</span>
                              {occ.appointment.priority && <span className={getPriorityBadge(occ.appointment.priority)}>{occ.appointment.priority}</span>}
                            </div>
                            <p className="text-sm font-semibold leading-tight mt-1">{getDisplayTitle(occ.appointment)}</p>
                          </button>
                        ))}
                        {dayEvents.length > 2 && (
                          <button type="button" className="text-xs text-primary mt-1" onClick={() => setActiveEventId(dayEvents[2].appointment.id)}>
                            +{dayEvents.length - 2} more
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {viewMode === 'Week' && (
              <div className="grid grid-cols-1 lg:grid-cols-7 gap-3">
                {timelineDays.map(day => {
                  const dayEvents = getDayEvents(day);
                  return (
                    <div key={day.toISOString()} className="rounded-3xl border border-base-200 bg-base-100 p-4">
                      <div className="mb-4">
                        <p className="text-xs uppercase tracking-[0.3em] text-base-content/50">{format(day, 'EEE')}</p>
                        <p className="text-lg font-bold">{format(day, 'd')}</p>
                      </div>
                      <div className="space-y-3">
                        {dayEvents.length === 0 ? (
                          <p className="text-sm opacity-60">No events</p>
                        ) : dayEvents.map(occ => (
                          <button key={occ.appointment.id} type="button" onClick={() => setActiveEventId(occ.appointment.id)} className={`block w-full rounded-3xl p-3 text-left ${getEventColor(occ.appointment.type)} hover:shadow-lg transition`}>
                            <div className="flex items-center justify-between gap-2 mb-2">
                              <span className="text-[11px] uppercase tracking-[0.2em]">{occ.appointment.type}</span>
                              {occ.appointment.priority && <span className={getPriorityBadge(occ.appointment.priority)}>{occ.appointment.priority}</span>}
                            </div>
                            <p className="font-semibold leading-tight">{getDisplayTitle(occ.appointment)}</p>
                            <p className="text-xs opacity-80 mt-2">{occ.appointment.time || 'All day'}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {viewMode === 'Agenda' && (
              <div className="space-y-3">
                {occurrences.length === 0 ? (
                  <div className="rounded-3xl border border-dashed border-base-300 bg-base-200 p-6 text-center opacity-80">No reminders in this range yet.</div>
                ) : occurrences.map(occ => (
                  <button key={`${occ.appointment.id}-${occ.date.toISOString()}`} type="button" onClick={() => setActiveEventId(occ.appointment.id)} className="w-full rounded-[2rem] border border-base-200 bg-base-100 p-4 text-left hover:shadow-lg transition">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-base-content/50">{format(occ.date, 'EEE, MMM d')}</p>
                        <h3 className="text-lg font-bold mt-2">{getDisplayTitle(occ.appointment)}</h3>
                        <div className="flex flex-wrap gap-2 mt-2 text-sm opacity-70 items-center">
                          <span className="flex items-center gap-1"><Clock size={14} /> {occ.appointment.time || 'All day'}</span>
                          {occ.appointment.location && <span className="flex items-center gap-1"><MapPin size={14} /> {occ.appointment.location}</span>}
                          {occ.appointment.priority && <span className={getPriorityBadge(occ.appointment.priority)}>{occ.appointment.priority}</span>}
                        </div>
                      </div>
                      <div className="badge badge-outline badge-lg">{occ.appointment.type}</div>
                    </div>
                    {occ.appointment.notes && <p className="mt-4 text-sm opacity-80">{occ.appointment.notes}</p>}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-[2rem] bg-base-100 border border-base-200 p-6 shadow-sm">
            <div className="flex items-center justify-between gap-3 mb-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-base-content/50">Summary</p>
                <h3 className="text-xl font-bold">Focus Dashboard</h3>
              </div>
              <Sparkles size={24} className="text-secondary" />
            </div>
            <div className="space-y-3">
              <div className="rounded-3xl bg-sage-light p-4">
                <p className="text-sm uppercase tracking-[0.25em] text-sage/80">Total</p>
                <p className="text-3xl font-bold">{statTotals.total}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-3xl bg-base-200 p-4">
                  <p className="text-xs uppercase tracking-[0.25em] text-base-content/60">Upcoming</p>
                  <p className="text-2xl font-bold">{statTotals.upcoming}</p>
                </div>
                <div className="rounded-3xl bg-base-200 p-4">
                  <p className="text-xs uppercase tracking-[0.25em] text-base-content/60">Recurring</p>
                  <p className="text-2xl font-bold">{statTotals.recurring}</p>
                </div>
                <div className="rounded-3xl bg-base-200 p-4">
                  <p className="text-xs uppercase tracking-[0.25em] text-base-content/60">High Priority</p>
                  <p className="text-2xl font-bold">{statTotals.highPriority}</p>
                </div>
                <div className="rounded-3xl bg-base-200 p-4">
                  <p className="text-xs uppercase tracking-[0.25em] text-base-content/60">Filter</p>
                  <p className="text-2xl font-bold">{selectedCategory !== 'all' ? selectedCategory : 'All'}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] bg-base-100 border border-base-200 p-6 shadow-sm">
            <div className="mb-4">
              <p className="text-xs uppercase tracking-[0.3em] text-base-content/50">Event Preview</p>
              <h3 className="text-xl font-bold">Selected Reminder</h3>
            </div>
            {activeEvent ? (
              <div className="space-y-4">
                <div className="rounded-3xl bg-base-200 p-4">
                  <p className="text-sm uppercase tracking-[0.2em] text-base-content/60">Title</p>
                  <p className="font-semibold mt-2">{getDisplayTitle(activeEvent)}</p>
                </div>
                <div className="rounded-3xl bg-base-200 p-4">
                  <p className="text-sm uppercase tracking-[0.2em] text-base-content/60">Details</p>
                  <p className="mt-2 text-sm leading-relaxed">{activeEvent.notes || 'No notes added yet.'}</p>
                </div>
                <div className="flex flex-col gap-2 text-sm text-base-content/80">
                  <div><strong>Type:</strong> {activeEvent.type}</div>
                  <div><strong>Date:</strong> {format(parseDate(activeEvent.date), 'PPP')}</div>
                  <div><strong>Time:</strong> {activeEvent.time || 'All day'}</div>
                  <div><strong>Priority:</strong> {activeEvent.priority || 'Medium'}</div>
                </div>
              </div>
            ) : (
              <div className="rounded-3xl border border-dashed border-base-300 bg-base-200 p-6 text-center opacity-80">
                <p>Select a reminder on the calendar to preview details.</p>
              </div>
            )}
          </div>

          <div className="rounded-[2rem] bg-base-100 border border-base-200 p-6 shadow-sm">
            <div className="mb-4">
              <p className="text-xs uppercase tracking-[0.3em] text-base-content/50">Calendar Imports</p>
              <h3 className="text-xl font-bold">Google / Apple Ready</h3>
            </div>
            <p className="text-sm opacity-70 mb-4">This workspace is ready for future calendar sync imports with external source metadata and reminder mapping.</p>
            <button type="button" className="btn btn-outline btn-primary w-full rounded-2xl mb-3">Import from Google</button>
            <button type="button" className="btn btn-outline btn-secondary w-full rounded-2xl">Import from Apple</button>
          </div>
        </aside>
      </div>

      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box rounded-[2.5rem] max-w-2xl">
            <h3 className="font-bold text-2xl mb-6">{editingAppointment ? 'Edit Reminder' : 'Schedule Reminder'}</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-4 lg:grid-cols-2">
                <div className="form-control">
                  <label className="label"><span className="label-text font-semibold">Dog</span></label>
                  <select className="select select-bordered rounded-2xl" value={formData.dogId} onChange={e => setFormData({ ...formData, dogId: e.target.value })} required>
                    {profiles.map(dog => <option key={dog.id} value={dog.id}>{dog.name}</option>)}
                  </select>
                </div>
                <div className="form-control">
                  <label className="label"><span className="label-text font-semibold">Category</span></label>
                  <select className="select select-bordered rounded-2xl" value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value as Appointment['type'] })} required>
                    {CATEGORY_OPTIONS.filter(option => option.value !== 'all').map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid gap-4 lg:grid-cols-3">
                <div className="form-control">
                  <label className="label"><span className="label-text font-semibold">Event Title</span></label>
                  <input
                    type="text"
                    className="input input-bordered rounded-2xl w-full"
                    placeholder="Walk, Vaccine, Birthday"
                    value={formData.title}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>
                <div className="form-control">
                  <label className="label"><span className="label-text font-semibold">Date</span></label>
                  <input type="date" className="input input-bordered rounded-2xl w-full" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} required />
                </div>
                <div className="form-control">
                  <label className="label"><span className="label-text font-semibold">Time</span></label>
                  <input type="time" className="input input-bordered rounded-2xl w-full" value={formData.time} onChange={e => setFormData({ ...formData, time: e.target.value })} />
                </div>
              </div>

              <div className="grid gap-4 lg:grid-cols-2">
                <div className="form-control">
                  <label className="label"><span className="label-text font-semibold">Location / Provider</span></label>
                  <input type="text" className="input input-bordered rounded-2xl w-full" placeholder="Vet clinic, groomer, home" value={formData.providerName} onChange={e => setFormData({ ...formData, providerName: e.target.value })} />
                </div>
                <div className="form-control">
                  <label className="label"><span className="label-text font-semibold">Priority</span></label>
                  <select className="select select-bordered rounded-2xl w-full" value={formData.priority} onChange={e => setFormData({ ...formData, priority: e.target.value as Appointment['priority'] })}>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div className="grid gap-4 lg:grid-cols-2">
                <div className="form-control">
                  <label className="label"><span className="label-text font-semibold">Address / Location</span></label>
                  <input type="text" className="input input-bordered rounded-2xl w-full" value={formData.providerAddress} onChange={e => setFormData({ ...formData, providerAddress: e.target.value })} />
                </div>
                <div className="form-control">
                  <label className="label"><span className="label-text font-semibold">Status</span></label>
                  <select className="select select-bordered rounded-2xl w-full" value={formData.completed ? 'Completed' : 'Pending'} onChange={e => setFormData({ ...formData, completed: e.target.value === 'Completed' })}>
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>

              <div className="form-control">
                <label className="label"><span className="label-text font-semibold">Notes</span></label>
                <textarea className="textarea textarea-bordered rounded-2xl h-28" value={formData.notes} onChange={e => setFormData({ ...formData, notes: e.target.value })} placeholder="Details, reminders, or care instructions." />
              </div>

              <div className="rounded-[2rem] border border-base-200 bg-base-200 p-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-semibold">Recurring Event</span>
                  <span className="text-xs opacity-70">Optional</span>
                </div>
                <div className="grid gap-4 lg:grid-cols-3">
                  <div className="form-control">
                    <label className="label"><span className="label-text">Frequency</span></label>
                    <select className="select select-bordered rounded-2xl" value={formData.recurrence?.frequency ?? 'None'} onChange={e => handleRecurrenceChange('frequency', e.target.value)}>
                      <option value="None">None</option>
                      <option value="Daily">Daily</option>
                      <option value="Weekly">Weekly</option>
                      <option value="Monthly">Monthly</option>
                      <option value="Yearly">Yearly</option>
                    </select>
                  </div>
                  <div className="form-control">
                    <label className="label"><span className="label-text">Every</span></label>
                    <input type="number" min={1} className="input input-bordered rounded-2xl" value={formData.recurrence?.interval ?? 1} onChange={e => handleRecurrenceChange('interval', Number(e.target.value) || 1)} />
                  </div>
                  <div className="form-control">
                    <label className="label"><span className="label-text">Ends On</span></label>
                    <input type="date" className="input input-bordered rounded-2xl" value={formData.recurrence?.endsOn ?? ''} onChange={e => handleRecurrenceChange('endsOn', e.target.value)} />
                  </div>
                </div>
                {formData.recurrence?.frequency === 'Weekly' && (
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    {DAY_LABELS.map(day => (
                      <button type="button" key={day} className={`btn btn-sm rounded-full ${formData.recurrence?.daysOfWeek?.includes(day as DayOfWeek) ? 'btn-primary' : 'btn-outline'}`} onClick={() => handleToggleWeekday(day as DayOfWeek)}>{day}</button>
                    ))}
                  </div>
                )}
              </div>

              <div className="modal-action gap-4 flex flex-col sm:flex-row">
                <button type="button" className="btn btn-ghost rounded-2xl flex-1" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary rounded-2xl flex-1">{editingAppointment ? 'Update Reminder' : 'Save Reminder'}</button>
              </div>
            </form>
          </div>
          <div className="modal-backdrop" onClick={() => setIsModalOpen(false)}></div>
        </div>
      )}
    </div>
  );
};

export default Reminders;
