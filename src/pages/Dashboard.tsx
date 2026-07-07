import React, { useState, useEffect } from 'react';
import { usePets } from '../context/PetContext';
import { 
  PawPrint, Heart, Bell, Calendar, Syringe, Plus, ShieldAlert, 
  Clock, MapPin, Book, Users, ChefHat, ShoppingBag, Briefcase, Camera, CheckSquare
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { profiles, vaccines, medications, appointments, journal } = usePets();
  const [userPhoto, setUserPhoto] = useState<string>('');

  // Load user photo choice from localStorage on mount
  useEffect(() => {
    const savedPhoto = localStorage.getItem('dashboard_user_photo');
    if (savedPhoto) setUserPhoto(savedPhoto);
  }, []);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setUserPhoto(base64String);
      localStorage.setItem('dashboard_user_photo', base64String);
    };
    reader.readAsDataURL(file);
  };

  const upcomingVaccines = vaccines
    .filter(v => new Date(v.nextDueDate) > new Date())
    .map(v => ({ ...v, type: 'vaccine', sortDate: v.nextDueDate }));

  const activeMeds = medications
    .filter(m => m.active)
    .map(m => ({ ...m, type: 'medication', sortDate: m.startDate }));

  const upcomingAppointments = appointments
    .filter(a => !a.completed)
    .map(a => ({ ...a, type: 'appointment', sortDate: a.date }));

  const allReminders = [...upcomingVaccines, ...upcomingAppointments]
    .sort((a, b) => new Date(a.sortDate).getTime() - new Date(b.sortDate).getTime())
    .slice(0, 5);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#FDFBF7]">
      
      {/* SIDEBAR NAVIGATION PANEL */}
      <aside className="w-full md:w-64 bg-[#3D2A1C] text-[#FDFBF7] flex flex-col p-6 gap-2 shrink-0 border-r border-[#B6A799]/20">
        <div className="mb-6 px-2">
          <h2 className="text-xl font-bold font-serif text-[#FDFBF7]">Porch & Paw</h2>
          <p className="text-[10px] uppercase tracking-widest text-[#A2A795]">Companion App</p>
        </div>
        <nav className="flex flex-row md:flex-col gap-1 overflow-x-auto md:overflow-x-visible pb-3 md:pb-0 font-medium text-sm">
          <Link to="/" className="px-4 py-3 rounded-xl bg-[#B55D3B] text-white flex items-center gap-3 whitespace-nowrap"><PawPrint size={18} /> Dashboard</Link>
          <Link to="/profiles" className="px-4 py-3 rounded-xl hover:bg-white/5 transition-colors flex items-center gap-3 text-[#FDFBF7] whitespace-nowrap"><Users size={18} /> Dog Profiles</Link>
          <Link to="/health" className="px-4 py-3 rounded-xl hover:bg-white/5 transition-colors flex items-center gap-3 text-[#FDFBF7] whitespace-nowrap"><Heart size={18} /> Health Center</Link>
          <Link to="/reminders" className="px-4 py-3 rounded-xl hover:bg-white/5 transition-colors flex items-center gap-3 text-[#FDFBF7] whitespace-nowrap"><Bell size={18} /> Reminders</Link>
          <Link to="/journal" className="px-4 py-3 rounded-xl hover:bg-white/5 transition-colors flex items-center gap-3 text-[#FDFBF7] whitespace-nowrap"><Book size={18} /> Memory Journal</Link>
          <Link to="/directory" className="px-4 py-3 rounded-xl hover:bg-white/5 transition-colors flex items-center gap-3 text-[#FDFBF7] whitespace-nowrap"><MapPin size={18} /> Care Directory</Link>
          <Link to="/content" className="px-4 py-3 rounded-xl hover:bg-white/5 transition-colors flex items-center gap-3 text-[#FDFBF7] whitespace-nowrap"><ChefHat size={18} /> P&P Kitchen</Link>
        </nav>
      </aside>

      {/* MAIN DASHBOARD CONTENT */}
      <main className="flex-1 p-6 max-w-6xl mx-auto text-left w-full">

        {/* HEADER SECTION */}
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[#B6A799]/20 pb-6">
          <div className="flex items-center gap-5">
            <div className="relative group w-16 h-16 rounded-full ring-2 ring-[#B55D3B] ring-offset-2 bg-[#E6E1DA] flex items-center justify-center overflow-hidden cursor-pointer">
              {userPhoto ? (
                <img src={userPhoto} alt="User Choice Profile" className="w-full h-full object-cover" />
              ) : (
                <Camera size={24} className="text-[#A2A795]" />
              )}
              <input type="file" accept="image/*" id="user-avatar-upload" className="hidden" onChange={handlePhotoUpload} />
              <label htmlFor="user-avatar-upload" className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                <span className="text-[9px] text-white font-bold">UPLOAD</span>
              </label>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-[#2D2A27] mb-1 font-serif">Porchside Pet Life</h1>
              <p className="text-xs uppercase tracking-[0.35em] text-[#A2A795] font-semibold">by Porch & Paw</p>
              <p className="opacity-70 text-sm font-medium mt-1">Here's what's happening with your furry family today.</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Link to="/emergency" className="btn gap-2 rounded-full bg-[#B55D3B] text-white border-[#B55D3B] hover:bg-[#2D2A27] hover:border-[#2D2A27] shadow-md hover:shadow-lg transition-all px-6">
              <ShieldAlert size={18} />
              Emergency Hub
            </Link>
          </div>
        </div>

        {/* METRIC STATS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="stats shadow-sm bg-white border border-[#B6A799]/30 rounded-3xl p-2">
            <div className="stat flex items-center justify-between p-4">
              <div>
                <div className="stat-title font-bold text-neutral/60 text-sm">Dog Profiles</div>
                <div className="stat-value text-3xl font-serif font-bold text-[#2D2A27] my-1">{profiles.length}</div>
                <div className="stat-desc"><Link to="/profiles" className="link link-hover text-xs text-[#B55D3B] font-bold">Manage profiles</Link></div>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-[#A2A795]/10 flex items-center justify-center text-[#B55D3B]"><PawPrint size={26} /></div>
            </div>
          </div>

          <div className="stats shadow-sm bg-white border border-[#B6A799]/30 rounded-3xl p-2">
            <div className="stat flex items-center justify-between p-4">
              <div>
                <div className="stat-title font-bold text-neutral/60 text-sm">Active Meds</div>
                <div className="stat-value text-3xl font-serif font-bold text-[#2D2A27] my-1">{activeMeds.length}</div>
                <div className="stat-desc"><Link to="/health" className="link link-hover text-xs text-[#A2A795] font-bold">View health center</Link></div>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-[#A2A795]/10 flex items-center justify-center text-[#A2A795]"><Heart size={26} /></div>
            </div>
          </div>

          <div className="stats shadow-sm bg-white border border-[#B6A799]/30 rounded-3xl p-2">
            <div className="stat flex items-center justify-between p-4">
              <div>
                <div className="stat-title font-bold text-neutral/60 text-sm">Reminders</div>
                <div className="stat-value text-3xl font-serif font-bold text-[#2D2A27] my-1">{allReminders.length}</div>
                <div className="stat-desc"><Link to="/reminders" className="link link-hover text-xs text-neutral/50 font-bold">Next 7 days</Link></div>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-[#A2A795]/10 flex items-center justify-center text-[#8C8275]"><Bell size={26} /></div>
            </div>
          </div>

          <div className="stats shadow-sm bg-white border border-[#B6A799]/30 rounded-3xl p-2">
            <div className="stat flex items-center justify-between p-4">
              <div>
                <div className="stat-title font-bold text-neutral/60 text-sm">Journal</div>
                <div className="stat-value text-3xl font-serif font-bold text-[#2D2A27] my-1">{journal.length}</div>
                <div className="stat-desc"><Link to="/journal" className="link link-hover text-xs text-[#2D2A27] font-bold">Captured moments</Link></div>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-[#A2A795]/10 flex items-center justify-center text-[#2D2A27]"><Book size={26} /></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Columns - Reminders & Shortcuts */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-[#B6A799]/30">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold font-serif flex items-center gap-3 text-[#2D2A27]">
                  <Bell className="text-[#B55D3B]" /> Upcoming Reminders
                </h2>
                <Link to="/reminders" className="btn btn-ghost btn-sm rounded-xl font-bold">View All</Link>
              </div>

              {allReminders.length === 0 ? (
                <div className="text-center p-8 bg-[#FDFBF7] rounded-3xl border-2 border-dashed border-[#B6A799]/40">
                  <p className="font-bold text-[#2D2A27] mb-2">No upcoming reminders or appointments.</p>
                  <p className="text-xs text-neutral/60 max-w-md mx-auto mb-4 leading-relaxed">
                    Tap 'Schedule something' or use the Reminders tab on your sidebar to organize vaccinations, medication times, or upcoming vet appointments.
                  </p>
                  <Link to="/reminders" className="btn btn-sm px-6 rounded-xl bg-[#B55D3B] text-white border-[#B55D3B] hover:bg-[#9E5033] no-underline">Schedule something</Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {allReminders.map((r: any) => (
                    <div key={r.id} className="flex items-center justify-between p-5 bg-white border border-[#B6A799]/30 rounded-3xl hover:border-brandTerracotta/30 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className={`p-4 rounded-2xl ${r.type === 'vaccine' ? 'bg-[#B55D3B]/10 text-[#B55D3B]' : 'bg-[#A2A795]/10 text-[#A2A795]'}`}>
                          {r.type === 'vaccine' ? <Syringe size={24} /> : <Clock size={24} />}
                        </div>
                        <div>
                          <p className="font-bold text-lg text-[#2D2A27]">{r.type === 'vaccine' ? r.vaccineName : r.providerName}</p>
                          <div className="flex items-center gap-2 text-sm opacity-60">
                            <span className="badge badge-ghost badge-sm">{profiles.find(p => p.id === r.dogId)?.name}</span>
                            {r.type === 'appointment' && <span className="flex items-center gap-1"><MapPin size={12} /> {r.time}</span>}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-black text-[#B55D3B]">{r.sortDate}</p>
                        <p className="text-xs font-semibold opacity-40 uppercase tracking-wider">{r.type === 'vaccine' ? 'Vaccination' : r.type}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link to="/directory" className="bg-white p-6 rounded-[2rem] border border-[#B6A799]/30 flex items-center gap-4 hover:shadow-md transition-all">
                <div className="bg-[#8C8275]/10 p-4 rounded-2xl text-[#8C8275]"><Users /></div>
                <div><h4 className="font-bold text-[#2D2A27] font-serif">Care Directory</h4><p className="text-xs opacity-60">Vets, groomers & more</p></div>
              </Link>
              <Link to="/content" className="bg-white p-6 rounded-[2rem] border border-[#B6A799]/30 flex items-center gap-4 hover:shadow-md transition-all">
                <div className="bg-[#A2A795]/10 p-4 rounded-2xl text-[#A2A795]"><ChefHat /></div>
                <div><h4 className="font-bold text-[#2D2A27] font-serif">Porch & Paw Kitchen</h4><p className="text-xs opacity-60">Healthy dog recipes</p></div>
              </Link>
            </div>

            {/* APP INSTRUCTIONS */}
            <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-[#B6A799]/30 text-left">
              <h3 className="text-xl font-bold font-serif text-[#2D2A27] mb-2 flex items-center gap-2">
                <CheckSquare size={22} className="text-[#A2A795]" /> Getting Started with Porchside Pet Life
              </h3>
              <p className="text-xs text-neutral/60 mb-6 font-medium">Follow these core steps to customize and setup your companion dashboard tracking system:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="p-4 bg-[#FDFBF7] rounded-2xl border border-[#B6A799]/20">
                  <span className="font-bold text-[#B55D3B] block mb-1">Step 1: Set Up Profiles</span>
                  <p className="text-xs opacity-70 leading-relaxed">Head over to 'Dog Profiles' to add your pets, configure weight parameters, and upload pictures via file input elements.</p>
                </div>
                <div className="p-4 bg-[#FDFBF7] rounded-2xl border border-[#B6A799]/20">
                  <span className="font-bold text-[#A2A795] block mb-1">Step 2: Add Medical Logs</span>
                  <p className="text-xs opacity-70 leading-relaxed">Open the 'Health & Wellness' panel to document current prescription medications, booster vaccines, and surgery timelines.</p>
                </div>
                <div className="p-4 bg-[#FDFBF7] rounded-2xl border border-[#B6A799]/20">
                  <span className="font-bold text-[#8C8275] block mb-1">Step 3: Monitor Reminders</span>
                  <p className="text-xs opacity-70 leading-relaxed">Schedule routine clinical care visits or recurring grooming setups directly to generate a complete timeline feed.</p>
                </div>
                <div className="p-4 bg-[#FDFBF7] rounded-2xl border border-[#B6A799]/20">
                  <span className="font-bold text-[#2D2A27] block mb-1">Step 4: Save Daily Memories</span>
                  <p className="text-xs opacity-70 leading-relaxed">Log interactive companion updates, photos, or specialized training notes directly within the Journal module.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Softened Gold-Cream Tip Block & Quick Actions */}
          <div className="space-y-6">
            <div className="bg-[#F5EEDC] rounded-[2.5rem] p-8 shadow-sm border border-[#B6A799]/20 relative overflow-hidden group">
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold tracking-wider text-[#A2A795] uppercase bg-white/60 px-3 py-1 rounded-full shadow-sm">
                    💡 Tip of the Day
                  </span>
                </div>
                <h3 className="text-2xl font-bold font-serif mb-3 text-[#2D2A27]">Daily Care Tip</h3>
                <p className="text-[#2D2A27]/80 text-sm leading-relaxed mb-6 font-medium">
                  Keep your dog hydrated! Fresh water should be available at all times, especially after playtime or walks in the sun.
                </p>
                <Link to="/content" className="btn btn-sm px-6 rounded-2xl bg-[#A2A795] text-white border-[#A2A795] hover:bg-[#8F9483] font-bold shadow-sm">
                  View Care Archive
                </Link>
              </div>
              <PawPrint className="absolute -bottom-6 -right-6 w-32 h-32 text-[#2D2A27]/5 group-hover:scale-110 transition-transform duration-500 pointer-events-none" />
            </div>

            <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-[#B6A799]/30">
              <h3 className="text-xl font-bold font-serif text-[#2D2A27] mb-6">Quick Actions</h3>
              <div className="grid grid-cols-1 gap-3">
                <Link to="/journal" style={{ backgroundColor: '#A2A795', color: '#ffffff' }} className="quick-action-card rounded-2xl px-5 py-4 flex items-center justify-start gap-4 shadow-sm hover:shadow-md transition-all">
                  <Plus size={20} />
                  <div className="text-left">
                    <div className="font-bold">New Journal Entry</div>
                    <div className="text-[10px] opacity-80 uppercase font-bold tracking-widest">Track Today</div>
                  </div>
                </Link>

                <Link to="/profiles" style={{ backgroundColor: '#B55D3B', color: '#ffffff' }} className="quick-action-card rounded-2xl px-5 py-4 flex items-center justify-start gap-4 shadow-sm hover:shadow-md transition-all">
                  <Plus size={20} />
                  <div className="text-left">
                    <div className="font-bold">Add Profile</div>
                    <div className="text-[10px] opacity-80 uppercase font-bold tracking-widest">New Dog</div>
                  </div>
                </Link>

                <Link to="/reminders" style={{ backgroundColor: '#5C5C50', color: '#ffffff' }} className="quick-action-card rounded-2xl px-5 py-4 flex items-center justify-start gap-4 shadow-sm hover:shadow-md transition-all">
                  <Calendar size={20} />
                  <div className="text-left">
                    <div className="font-bold">Schedule Appt</div>
                    <div className="text-[10px] opacity-80 uppercase font-bold tracking-widest">Reminders</div>
                  </div>
                </Link>

                <Link to="/travel" style={{ backgroundColor: '#8C8275', color: '#ffffff' }} className="quick-action-card rounded-2xl px-5 py-4 flex items-center justify-start gap-4 shadow-sm hover:shadow-md transition-all">
                  <Briefcase size={20} />
                  <div className="text-left">
                    <div className="font-bold">Packing List</div>
                    <div className="text-[10px] opacity-80 uppercase font-bold tracking-widest">Travel Ready</div>
                  </div>
                </Link>

                <Link to="/store" style={{ backgroundColor: '#5C4D41', color: '#ffffff' }} className="quick-action-card rounded-2xl px-5 py-4 flex items-center justify-start gap-4 shadow-sm hover:shadow-md transition-all">
                  <ShoppingBag size={20} />
                  <div className="text-left">
                    <div className="font-bold">Shop Boutique</div>
                    <div className="text-[10px] opacity-80 uppercase font-bold tracking-widest">Premium Gear</div>
                  </div>
                </Link>

                <Link to="/emergency" style={{ backgroundColor: '#B91C1C', color: '#ffffff' }} className="quick-action-card rounded-2xl px-5 py-4 flex items-center justify-start gap-4 shadow-sm hover:shadow-md transition-all">
                  <ShieldAlert size={20} />
                  <div className="text-left">
                    <div className="font-bold">Emergency Kit</div>
                    <div className="text-[10px] opacity-80 uppercase font-bold tracking-widest">Safety First</div>
                  </div>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Dashboard;