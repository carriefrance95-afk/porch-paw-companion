import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { usePets } from '../../context/PetContext';
import WelcomeHero from './components/WelcomeHero';
import ComingUp, { type ComingUpItem } from './ComingUp';
import QuickActions from './components/QuickActions';
import SummaryCards from './SummaryCards';

const formatDateLabel = (dateValue: string): string => {
  const date = new Date(`${dateValue}T12:00:00`);

  if (Number.isNaN(date.getTime())) {
    return dateValue;
  }

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  }).format(date);
};

const formatTimeLabel = (timeValue?: string): string | undefined => {
  if (!timeValue) {
    return undefined;
  }

  const [hoursValue, minutesValue] = timeValue.split(':');
  const hours = Number(hoursValue);
  const minutes = Number(minutesValue);

  if (Number.isNaN(hours) || Number.isNaN(minutes)) {
    return timeValue;
  }

  const date = new Date();
  date.setHours(hours, minutes, 0, 0);

  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  }).format(date);
};

const YourPorch: React.FC = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();

  const {
    profiles,
    medications,
    appointments,
    memories,
  } = usePets();

  const firstName = useMemo(() => {
    const metadata = user?.user_metadata;

    const savedName =
      metadata?.first_name ||
      metadata?.firstName ||
      metadata?.full_name ||
      metadata?.name;

    if (typeof savedName === 'string' && savedName.trim()) {
      return savedName.trim().split(' ')[0];
    }

    const emailName = user?.email?.split('@')[0];

    if (emailName) {
      return emailName.charAt(0).toUpperCase() + emailName.slice(1);
    }

    return 'there';
  }, [user]);

  const dogNames = useMemo(
    () =>
      profiles
        .map((profile) => profile.name?.trim())
        .filter((name): name is string => Boolean(name)),
    [profiles],
  );

  const primaryDogName = dogNames[0] ?? 'your dogs';

  const activeMedicationCount = useMemo(
    () => medications.filter((medication) => medication.active).length,
    [medications],
  );

  const upcomingItems = useMemo<ComingUpItem[]>(() => {
    const now = new Date();

    return appointments
      .filter((appointment) => {
        if (appointment.completed || !appointment.date) {
          return false;
        }

        const appointmentDate = new Date(
          `${appointment.date}T${appointment.time || '23:59:00'}`,
        );

        return (
          !Number.isNaN(appointmentDate.getTime()) &&
          appointmentDate.getTime() >= now.getTime()
        );
      })
      .sort((firstAppointment, secondAppointment) => {
        const firstDate = new Date(
          `${firstAppointment.date}T${firstAppointment.time || '23:59:00'}`,
        ).getTime();

        const secondDate = new Date(
          `${secondAppointment.date}T${secondAppointment.time || '23:59:00'}`,
        ).getTime();

        return firstDate - secondDate;
      })
      .map((appointment) => {
        const dog = profiles.find(
          (profile) => profile.id === appointment.dogId,
        );

        const detailParts = [
          appointment.providerName,
          appointment.providerAddress,
        ].filter(
          (value): value is string =>
            typeof value === 'string' && value.trim().length > 0,
        );

        return {
          id: appointment.id,
          title: appointment.type?.trim() || 'Appointment',
          dateLabel: formatDateLabel(appointment.date),
          dogName: dog?.name,
          time: formatTimeLabel(appointment.time),
          detail:
            detailParts.length > 0
              ? detailParts.join(' · ')
              : appointment.notes || undefined,
          type: 'appointment',
        };
      });
  }, [appointments, profiles]);

  const handleViewReminders = () => {
    navigate('/reminders');
  };

  if (authLoading) {
    return (
      <main className="min-h-full bg-[#FAF7F2] px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto flex min-h-[420px] w-full max-w-[1440px] items-center justify-center">
          <p className="text-sm font-medium text-[#7A7147]">
            Getting your porch ready…
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-full bg-[#FAF7F2] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-[1440px]">
        <WelcomeHero
          firstName={firstName}
          dogName={primaryDogName}
          reminderCount={upcomingItems.length}
          onViewReminders={handleViewReminders}
        />

        <SummaryCards
          dogNames={dogNames}
          activeMedicationCount={activeMedicationCount}
          reminderCount={upcomingItems.length}
          memoryCount={memories.length}
        />

        <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.65fr)_minmax(320px,0.75fr)]">
          <ComingUp items={upcomingItems} />
          <QuickActions />
        </div>
      </div>
    </main>
  );
};

export default YourPorch;