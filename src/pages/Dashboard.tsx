import React from 'react';
import { usePets } from '../context/PetContext';
import { 
  PawPrint, Heart, Bell, Calendar, Syringe, Plus, ShieldAlert, 
  Clock, MapPin, Book, Users, ChefHat, ShoppingBag, Briefcase
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { profiles, vaccines, medications, appointments, journal } = usePets();

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
    <div className="p-6 max-w-6xl mx-auto bg-[#FDFBF7]">
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="brand-logo-shell" aria-hidden="true">
            <img src="/logo.png" alt="Porchside Pet Life Logo" className="w-12 h-12 object-contain" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-brandCharcoal mb-1">Porchside Pet Life</h1>
            <p className="text-xs uppercase tracking-[0.35em] text-brandSage font-semibold">by Porch & Paw</p>
            <p className="opacity-70 font-medium mt-1">Here's what's happening with your furry family today.</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link to="/emergency" className="btn emergency-hub-btn rounded-2xl bg-brandTerracotta text-white border-brandTerracotta hover:bg-brandCharcoal hover:border-brandCharcoal shadow-md hover:shadow-lg transition-all">
            <ShieldAlert size={20} />
            Emergency Hub
          </Link>
        </div>
      </div>

      {/* Metric Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="stats shadow bg-brandCream border border-brandTaupe/40 rounded-3xl">
          <div className="stat">
            <div className="stat-figure text-brandTerracotta"><PawPrint size={32} /></div>
            <div className="stat-title font-semibold">Dog Profiles</div>
            <div className="stat-value text-brandTerracotta">{profiles.length}</div>
            <div className="stat-desc"><Link to="/profiles" className="link link-hover text-xs">Manage profiles</Link></div>
          </div>
        </div>
        
        <div className="stats shadow bg-brandCream border border-brandTaupe/40 rounded-3xl">
          <div className="stat">
            <div className="stat-figure text-brandSage"><Heart size={32} /></div>
            <div className="stat-title font-semibold">Active Meds</div>
            <div className="stat-value text-brandSage">{activeMeds.length}</div>
            <div className="stat-desc"><Link to="/health" className="link link-hover text-brandSage text-xs">View health center</Link></div>
          </div>
        </div>

        <div className="stats shadow bg-brandCream border border-brandTaupe/40 rounded-3xl">
          <div className="stat">
            <div className="stat-figure text-brandTaupe"><Bell size={32} /></div>
            <div className="stat-title font-semibold">Reminders</div>
            <div className="stat-value text-brandTaupe">{allReminders.length}</div>
            <div className="stat-desc"><Link to="/reminders" className="link link-hover text-brandTaupe text-xs">Next 7 days</Link></div>
          </div>
        </div>

        <div className="stats shadow bg-brandCream border border-brandTaupe/40 rounded-3xl">
          <div className="stat">
            <div className="stat-figure text-brandCharcoal"><Book size={32} /></div>
            <div className="stat-title font-semibold">Journal</div>
            <div className="stat-value text-brandCharcoal">{journal.length}</div>
            <div className="stat-desc"><Link to="/journal" className="link link-hover text-brandCharcoal text-xs">Captured moments</Link></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Columns - Reminders & Shortcuts */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-brandCream rounded-[2.5rem] p-8 shadow-sm border border-brandTaupe/40">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <Bell className="text-brandTerracotta" /> Upcoming Reminders
              </h2>
              <Link to="/reminders" className="btn btn-ghost btn-sm">View All</Link>
            </div>
            
            {allReminders.length === 0 ? (
              <div className="text-center py-12 opacity-60 bg-brandTaupe/20 rounded-3xl border-2 border-dashed border-brandTaupe/40">
                <p className="font-medium italic">No upcoming reminders or appointments.</p>
                <Link to="/reminders" className="btn btn-link no-underline text-brandTerracotta">Schedule something?</Link>
              </div>
            ) : (
              <div className="space-y-3">
                {allReminders.map((r: any) => (
                  <div key={r.id} className="flex items-center justify-between p-5 bg-brandCream border border-brandTaupe/40 rounded-3xl hover:border-brandTerracotta/30 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`p-4 rounded-2xl ${r.type === 'vaccine' ? 'bg-brandTerracotta/10 text-brandTerracotta' : 'bg-brandSage/10 text-brandSage'}`}>
                        {r.type === 'vaccine' ? <Syringe size={24} /> : <Clock size={24} />}
                      </div>
                      <div>
                        <p className="font-bold text-lg">{r.type === 'vaccine' ? r.vaccineName : r.providerName}</p>
                        <div className="flex items-center gap-2 text-sm opacity-60">
                          <span className="badge badge-ghost badge-sm">{profiles.find(p => p.id === r.dogId)?.name}</span>
                          {r.type === 'appointment' && <span className="flex items-center gap-1"><MapPin size={12} /> {r.time}</span>}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-black text-brandTerracotta">{r.sortDate}</p>
                      <p className="text-xs font-semibold opacity-40 uppercase tracking-wider">{r.type === 'vaccine' ? 'Vaccination' : r.type}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link to="/directory" className="bg-brandCream p-6 rounded-[2rem] border border-brandTaupe/40 flex items-center gap-4 hover:shadow-lg transition-shadow">
              <div className="bg-brandTaupe/20 p-4 rounded-2xl text-brandCharcoal"><Users /></div>
              <div><h4 className="font-bold">Care Directory</h4><p className="text-xs opacity-60">Vets, groomers & more</p></div>
            </Link>
            <Link to="/content" className="bg-brandCream p-6 rounded-[2rem] border border-brandTaupe/40 flex items-center gap-4 hover:shadow-lg transition-shadow">
              <div className="bg-brandSage/10 p-4 rounded-2xl text-brandSage"><ChefHat /></div>
              <div><h4 className="font-bold">From The Porch & Paw Kitchen</h4><p className="text-xs opacity-60">Healthy dog recipes</p></div>
            </Link>
          </div>
        </div>

        {/* Right Column - Tip & Forced Inline Style Quick Actions */}
        <div className="space-y-6">
          <div className="bg-brandTerracotta text-white rounded-[2.5rem] p-8 shadow-xl relative overflow-hidden group">
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-3">Daily Care Tip</h3>
              <p className="text-sm opacity-90 leading-relaxed mb-6 font-medium">
                Keep your dog hydrated! Fresh water should be available at all times, especially after playtime or walks in the sun.
              </p>
              <button className="btn bg-brandSage text-white rounded-2xl btn-sm px-6 border-brandSage hover:bg-brandSage/90">Read More</button>
            </div>
            <PawPrint className="absolute -bottom-6 -right-6 w-32 h-32 opacity-10 group-hover:scale-110 transition-transform duration-500" />
          </div>
          
          <div className="bg-brandCream rounded-[2.5rem] p-8 shadow-sm border border-brandTaupe/40">
            <h3 className="text-xl font-bold mb-6">Quick Actions</h3>
<div className="grid grid-cols-1 gap-3">              
              {/* Journal - Sage Green */}
              <Link to="/journal" style={{ backgroundColor: '#A2B29F', color: '#ffffff' }} className="quick-action-card rounded-2xl px-5 py-4 flex items-center justify-start gap-4 shadow-sm hover:shadow-md transition-all">
                <Plus size={20} /> 
                <div className="text-left">
                  <div className="font-bold">New Journal Entry</div>
                  <div className="text-[10px] opacity-80 uppercase font-bold tracking-widest">Track Today</div>
                </div>
              </Link>

              {/* Add Profile - Terracotta */}
              <Link to="/profiles" style={{ backgroundColor: '#C87A53', color: '#ffffff' }} className="quick-action-card rounded-2xl px-5 py-4 flex items-center justify-start gap-4 shadow-sm hover:shadow-md transition-all">
                <Plus size={20} /> 
                <div className="text-left">
                  <div className="font-bold">Add Profile</div>
                  <div className="text-[10px] opacity-80 uppercase font-bold tracking-widest">New Dog</div>
                </div>
              </Link>

              {/* Schedule Appt - Charcoal */}
              <Link to="/reminders" style={{ backgroundColor: '#2C302E', color: '#ffffff' }} className="quick-action-card rounded-2xl px-5 py-4 flex items-center justify-start gap-4 shadow-sm hover:shadow-md transition-all">
                <Calendar size={20} /> 
                <div className="text-left">
                  <div className="font-bold">Schedule Appt</div>
                  <div className="text-[10px] opacity-80 uppercase font-bold tracking-widest">Reminders</div>
                </div>
              </Link>

              {/* Packing List - Taupe */}
              <Link to="/travel" style={{ backgroundColor: '#8C8275', color: '#ffffff' }} className="quick-action-card rounded-2xl px-5 py-4 flex items-center justify-start gap-4 shadow-sm hover:shadow-md transition-all">
                <Briefcase size={20} /> 
                <div className="text-left">
                  <div className="font-bold">Packing List</div>
                  <div className="text-[10px] opacity-80 uppercase font-bold tracking-widest">Travel Ready</div>
                </div>
              </Link>

              {/* Shop Boutique - Warm Chocolate Dark Neutral */}
              <Link to="/store" style={{ backgroundColor: '#5C4D41', color: '#ffffff' }} className="quick-action-card rounded-2xl px-5 py-4 flex items-center justify-start gap-4 shadow-sm hover:shadow-md transition-all">
                <ShoppingBag size={20} /> 
                <div className="text-left">
                  <div className="font-bold">Shop Boutique</div>
                  <div className="text-[10px] opacity-80 uppercase font-bold tracking-widest">Premium Gear</div>
                </div>
              </Link>

              {/* Emergency Kit - Deep Safety Red */}
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
    </div>
  );
};

export default Dashboard;