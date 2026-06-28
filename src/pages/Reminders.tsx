import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Plus, 
  ChevronLeft, 
  ChevronRight, 
  Search, 
  Sparkles,
  Stethoscope,
  Clock,
  X,
  RefreshCw
} from 'lucide-react';

interface ReminderItem {
  id: string;
  title: string;
  date: string; 
  dogName: string;
  category: string;
  priority: 'High' | 'Medium' | 'Low';
}

const Reminders: React.FC = () => {
  const [currentView, setCurrentView] = useState<'Month' | 'Week' | 'Agenda'>('Month');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Fully restored dropdown filter states
  const [selectedDog, setSelectedDog] = useState('All Pets');
  const [selectedCategory, setSelectedCategory] = useState('All Events');
  const [selectedPriority, setSelectedPriority] = useState('All Priorities');

  // June 2026 Baseline Calendar Matrix
  const calendarDays = [
    { day: 31, isCurrentMonth: false },
    { day: 1, isCurrentMonth: true }, { day: 2, isCurrentMonth: true }, { day: 3, isCurrentMonth: true },
    { day: 4, isCurrentMonth: true }, { day: 5, isCurrentMonth: true }, { day: 6, isCurrentMonth: true },
    { day: 7, isCurrentMonth: true }, { day: 8, isCurrentMonth: true }, { day: 9, isCurrentMonth: true },
    { day: 10, isCurrentMonth: true }, { day: 11, isCurrentMonth: true }, { day: 12, isCurrentMonth: true },
    { day: 13, isCurrentMonth: true }, { day: 14, isCurrentMonth: true }, { day: 15, isCurrentMonth: true },
    { day: 16, isCurrentMonth: true }, { day: 17, isCurrentMonth: true }, { day: 18, isCurrentMonth: true },
    { day: 19, isCurrentMonth: true }, { day: 20, isCurrentMonth: true }, { day: 21, isCurrentMonth: true },
    { day: 22, isCurrentMonth: true }, { day: 23, isCurrentMonth: true }, { day: 24, isCurrentMonth: true },
    { day: 25, isCurrentMonth: true }, { day: 26, isCurrentMonth: true }, { day: 27, isCurrentMonth: true },
    { day: 28, isCurrentMonth: true }, { day: 29, isCurrentMonth: true }, { day: 30, isCurrentMonth: true },
    { day: 1, isCurrentMonth: false }, { day: 2, isCurrentMonth: false }, { day: 3, isCurrentMonth: false },
    { day: 4, isCurrentMonth: false }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto bg-[#FDFBF7] min-h-screen text-left">
      
      {/* Header Container */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-[#2D2A27]">
            <CalendarIcon size={24} className="text-[#B55D3B]" />
            <h1 className="text-3xl font-bold font-serif">Reminders & Scheduling</h1>
          </div>
          <p className="text-sm text-[#2D2A27]/60 mt-1">Month, week, and agenda planning for every pet-specific event.</p>
        </div>
        
        <button className="bg-[#B55D3B] hover:bg-[#9E5033] text-white font-bold text-sm px-6 py-2.5 rounded-full shadow-sm flex items-center gap-2 border-none transition-all cursor-pointer">
          <Plus size={16} />
          Add Reminder
        </button>
      </div>

      {/* Reconnected Active Filters Engine Row */}
      <div className="bg-white border border-[#B6A799]/30 rounded-3xl p-4 mb-6 grid grid-cols-2 md:grid-cols-4 gap-4 shadow-sm">
        <div>
          <label className="block text-xs font-bold text-[#2D2A27]/70 mb-1.5">Dog</label>
          <select 
            value={selectedDog} 
            onChange={(e) => setSelectedDog(e.target.value)} 
            className="w-full bg-[#FDFBF7] border border-[#B6A799]/40 rounded-xl text-sm h-[38px] px-3 focus:outline-none focus:border-[#B55D3B]"
          >
            <option value="All Pets">All Pets</option>
            <option value="Stitch">Stitch</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold text-[#2D2A27]/70 mb-1.5">Category</label>
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)} 
            className="w-full bg-[#FDFBF7] border border-[#B6A799]/40 rounded-xl text-sm h-[38px] px-3 focus:outline-none focus:border-[#B55D3B]"
          >
            <option value="All Events">All Events</option>
            <option value="Vet Visits">Vet Visits</option>
            <option value="Medications">Medications</option>
            <option value="Grooming">Grooming</option>
            <option value="Meals">Meals / Diet</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold text-[#2D2A27]/70 mb-1.5">Priority</label>
          <select 
            value={selectedPriority} 
            onChange={(e) => setSelectedPriority(e.target.value)} 
            className="w-full bg-[#FDFBF7] border border-[#B6A799]/40 rounded-xl text-sm h-[38px] px-3 focus:outline-none focus:border-[#B55D3B]"
          >
            <option value="All Priorities">All Priorities</option>
            <option value="High">High Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="Low">Low Priority</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold text-[#2D2A27]/70 mb-1.5">Search</label>
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search reminders" 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)} 
              className="w-full bg-[#FDFBF7] border border-[#B6A799]/40 rounded-xl text-sm h-[38px] pl-8 pr-3 focus:outline-none focus:border-[#B55D3B]" 
            />
            <Search size={14} className="absolute left-2.5 top-3 text-[#2D2A27]/40" />
          </div>
        </div>
      </div>

      {/* Main Grid Splitting Array */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Left Side: Interactive Calendar Canvas */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white border border-[#B6A799]/30 rounded-[2rem] p-6 shadow-sm">
            
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
              <div>
                <span className="text-[10px] font-bold tracking-widest text-[#2D2A27]/50 uppercase block mb-1">Calendar View</span>
                <h2 className="text-2xl font-bold font-serif text-[#2D2A27]">{currentView} View</h2>
              </div>
              <div className="bg-[#FDFBF7] border border-[#B6A799]/30 rounded-xl p-1 flex gap-1">
                {(['Month', 'Week', 'Agenda'] as const).map((view) => (
                  <button 
                    key={view} 
                    onClick={() => setCurrentView(view)} 
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all border-none cursor-pointer ${currentView === view ? 'bg-[#B55D3B] text-white shadow-sm' : 'text-[#2D2A27]/60 hover:text-[#2D2A27] bg-transparent'}`}
                  >
                    {view}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-1 bg-[#FDFBF7] border border-[#B6A799]/30 rounded-xl p-0.5">
                <button className="p-2 hover:text-[#B55D3B] bg-transparent border-none cursor-pointer"><ChevronLeft size={16} /></button>
                <span className="text-sm font-bold text-[#2D2A27] px-3 font-serif">June 2026</span>
                <button className="p-2 hover:text-[#B55D3B] bg-transparent border-none cursor-pointer"><ChevronRight size={16} /></button>
              </div>
              <button className="bg-white border border-[#B6A799]/40 hover:border-[#B55D3B] text-xs font-bold text-[#2D2A27] px-4 py-2 rounded-xl transition-all cursor-pointer">Today</button>
            </div>

            {currentView === 'Month' && (
              <div className="border border-[#B6A799]/20 rounded-2xl overflow-hidden shadow-sm">
                <div className="grid grid-cols-7 bg-[#FDFBF7] border-b border-[#B6A799]/20 text-center py-2.5">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                    <span key={d} className="text-[10px] font-bold uppercase tracking-wider text-[#2D2A27]/50">{d}</span>
                  ))}
                </div>

                <div className="grid grid-cols-7 grid-rows-5 divide-x divide-y divide-[#B6A799]/10 bg-[#B6A799]/5">
                  {calendarDays.map((item, idx) => (
                    <div key={idx} className={`min-h-[85px] bg-white p-2 transition-all hover:bg-[#FDFBF7] relative group cursor-pointer flex flex-col justify-between ${!item.isCurrentMonth ? 'bg-neutral-50/20 opacity-30' : ''}`}>
                      <span className="text-xs font-bold text-[#2D2A27]/80">{item.day}</span>
                      <span className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-[#B55D3B]">
                        <Plus size={12} />
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Sidebar Panel explicitly customized with your Lighter Sage Green */}
        <div className="space-y-4 bg-[#7A7A59] p-4 rounded-[2.5rem] shadow-md">
          
          {/* Focus Metrics Panel */}
          <div className="bg-white rounded-[2rem] p-5 relative overflow-hidden">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-[9px] font-bold text-[#2D2A27]/40 uppercase tracking-widest block">Summary</span>
                <h3 className="text-lg font-bold font-serif text-[#2D2A27]">Focus Dashboard</h3>
              </div>
              <Sparkles size={18} className="text-[#B55D3B]" />
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-[#FDFBF7] border border-[#B6A799]/20 p-3 rounded-2xl">
                <span className="text-[10px] font-bold uppercase tracking-wide text-[#2D2A27]/50 block">Total</span>
                <span className="text-2xl font-bold font-serif text-[#2D2A27]">0</span>
              </div>
              <div className="bg-[#FDFBF7] border border-[#B6A799]/20 p-3 rounded-2xl">
                <span className="text-[10px] font-bold uppercase tracking-wide text-[#2D2A27]/50 block">Upcoming</span>
                <span className="text-2xl font-bold font-serif text-[#2D2A27]">0</span>
              </div>
            </div>

            <div className="border-t border-[#B6A799]/20 pt-3 space-y-2 text-xs text-left">
              <span className="text-[9px] font-bold text-[#2D2A27]/50 uppercase tracking-wider block mb-1">Event Categories</span>
              <div className="flex items-center gap-2 font-medium text-[#2D2A27]/80">
                <span className="w-2.5 h-2.5 rounded-full bg-[#B55D3B]" /> Medical & Vet Preps
              </div>
              <div className="flex items-center gap-2 font-medium text-[#2D2A27]/80">
                <span className="w-2.5 h-2.5 rounded-full bg-[#7A7A59]" /> Grooming & Care
              </div>
              <div className="flex items-center gap-2 font-medium text-[#2D2A27]/80">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2D2A27]" /> Medications & Routines
              </div>
            </div>
          </div>

          {/* Real-time Preview Area */}
          <div className="bg-white rounded-[2rem] p-5">
            <span className="text-[9px] font-bold text-[#2D2A27]/40 uppercase tracking-widest block">Event Preview</span>
            <h3 className="text-lg font-bold font-serif text-[#2D2A27] mb-3">Selected Reminder</h3>
            <div className="bg-[#FDFBF7] border border-dashed border-[#B6A799]/50 rounded-2xl p-6 text-center text-xs text-[#2D2A27]/50 leading-relaxed">
              Select a reminder on the calendar to preview details.
            </div>
          </div>

          {/* Updated Two-Way API Calendar Connection Interface */}
          <div className="bg-white rounded-[2rem] p-5 text-left">
            <span className="text-[9px] font-bold text-[#2D2A27]/40 uppercase tracking-widest block">Calendar Integrations</span>
            <h3 className="text-lg font-bold font-serif text-[#2D2A27] mb-1">Live Account Sync</h3>
            <p className="text-xs text-[#2D2A27]/60 leading-relaxed mb-4">
              Establish a continuous, two-way channel link to automatically mirror app entries with external timelines.
            </p>
            <div className="space-y-2">
              <button className="w-full bg-white hover:bg-[#FDFBF7] border border-[#B6A799]/40 text-[#2D2A27] font-bold text-xs py-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5">
                <RefreshCw size={12} className="text-[#7A7A59]" /> Connect Google Calendar
              </button>
              <button className="w-full bg-white hover:bg-[#FDFBF7] border border-[#B6A799]/40 text-[#2D2A27] font-bold text-xs py-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5">
                <RefreshCw size={12} className="text-[#7A7A59]" /> Connect Apple Calendar
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Reminders;