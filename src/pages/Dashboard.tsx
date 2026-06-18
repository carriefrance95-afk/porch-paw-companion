import React from 'react';
import { usePets } from '../context/PetContext';
import { Link } from 'react-router-dom';
import {
  PawPrint,
  Heart,
  Bell,
  Calendar,
  Syringe,
  Plus,
  ShieldAlert,
  Clock,
  MapPin,
  Book,
  Users,
  ChefHat,
  ShoppingBag
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const {
    profiles,
    vaccines,
    medications,
    appointments,
    journal
  } = usePets();

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
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold text-primary mb-1">Hello, Pet Parent! 🐾</h1>
          <p className="opacity-70 font-medium">Here's what's happening with your furry family today.</p>
        </div>
        <div className="flex gap-2">
          <Link to="/emergency" className="btn btn-error btn-outline rounded-2xl">
            <ShieldAlert size={20} />
            Emergency Hub
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="stats shadow bg-base-100 border border-base-200 rounded-3xl">
          <div className="stat">
            <div className="stat-figure text-primary"><PawPrint size={32} /></div>
            <div className="stat-title font-semibold">Dog Profiles</div>
            <div className="stat-value text-primary">{profiles.length}</div>
            <div className="stat-desc"><Link to="/profiles" className="link link-hover text-xs">Manage profiles</Link></div>
          </div>
        </div>
        
        <div className="stats shadow bg-base-100 border border-base-200 rounded-3xl">
          <div className="stat">
            <div className="stat-figure text-secondary"><Heart size={32} /></div>
            <div className="stat-title font-semibold">Active Meds</div>
            <div className="stat-value text-secondary">{activeMeds.length}</div>
            <div className="stat-desc"><Link to="/health" className="link link-hover text-secondary text-xs">View health center</Link></div>
          </div>
        </div>

        <div className="stats shadow bg-base-100 border border-base-200 rounded-3xl">
          <div className="stat">
            <div className="stat-figure text-accent"><Bell size={32} /></div>
            <div className="stat-title font-semibold">Reminders</div>
            <div className="stat-value text-accent">{allReminders.length}</div>
            <div className="stat-desc"><Link to="/reminders" className="link link-hover text-accent text-xs">Next 7 days</Link></div>
          </div>
        </div>

        <div className="stats shadow bg-base-100 border border-base-200 rounded-3xl">
          <div className="stat">
            <div className="stat-figure text-info"><Book size={32} /></div>
            <div className="stat-title font-semibold">Journal</div>
            <div className="stat-value text-info">{journal.length}</div>
            <div className="stat-desc"><Link to="/journal" className="link link-hover text-info text-xs">Captured moments</Link></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-base-100 rounded-[2.5rem] p-8 shadow-sm border border-base-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <Bell className="text-primary" /> Upcoming Reminders
              </h2>
              <Link to="/reminders" className="btn btn-ghost btn-sm">View All</Link>
            </div>
            
            {allReminders.length === 0 ? (
              <div className="text-center py-12 opacity-60 bg-base-200/50 rounded-3xl border-2 border-dashed border-base-300">
                <p className="font-medium italic">No upcoming reminders or appointments.</p>
                <Link to="/reminders" className="btn btn-link no-underline text-primary">Schedule something?</Link>
              </div>
            ) : (
              <div className="space-y-3">
                {allReminders.map((r: any) => (
                  <div key={r.id} className="flex items-center justify-between p-5 bg-base-100 border border-base-200 rounded-3xl hover:border-primary/30 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`p-4 rounded-2xl ${r.type === 'vaccine' ? 'bg-primary/10 text-primary' : 'bg-accent/10 text-accent'}`}>
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
                      <p className="text-sm font-black text-primary">{r.sortDate}</p>
                      <p className="text-xs font-semibold opacity-40 uppercase tracking-wider">{r.type === 'vaccine' ? 'Vaccination' : r.type}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link to="/directory" className="bg-base-100 p-6 rounded-[2rem] border border-base-200 flex items-center gap-4 hover:shadow-lg transition-shadow">
              <div className="bg-info/10 p-4 rounded-2xl text-info"><Users /></div>
              <div><h4 className="font-bold">Care Directory</h4><p className="text-xs opacity-60">Vets, groomers & more</p></div>
            </Link>
            <Link to="/content" className="bg-base-100 p-6 rounded-[2rem] border border-base-200 flex items-center gap-4 hover:shadow-lg transition-shadow">
              <div className="bg-secondary/10 p-4 rounded-2xl text-secondary"><ChefHat /></div>
              <div><h4 className="font-bold">Cookbook</h4><p className="text-xs opacity-60">Healthy dog recipes</p></div>
            </Link>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-primary text-primary-content rounded-[2.5rem] p-8 shadow-xl relative overflow-hidden group">
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-3">Daily Care Tip</h3>
              <p className="text-sm opacity-90 leading-relaxed mb-6 font-medium">
                Keep your dog hydrated! Fresh water should be available at all times, especially after playtime or walks in the sun.
              </p>
              <button className="btn btn-secondary rounded-2xl btn-sm px-6">Read More</button>
            </div>
            <PawPrint className="absolute -bottom-6 -right-6 w-32 h-32 opacity-10 group-hover:scale-110 transition-transform duration-500" />
          </div>
          
          <div className="bg-base-100 rounded-[2.5rem] p-8 shadow-sm border border-base-200">
            <h3 className="text-xl font-bold mb-6">Quick Actions</h3>
            <div className="grid grid-cols-1 gap-3">
              <Link to="/journal" className="btn btn-ghost bg-base-200 hover:bg-primary hover:text-primary-content rounded-2xl justify-start gap-4 h-auto py-3">
                <Plus size={20} /> 
                <div className="text-left">
                  <div className="font-bold">New Journal Entry</div>
                  <div className="text-[10px] opacity-60 uppercase font-bold tracking-widest">Track Today</div>
                </div>
              </Link>
              <Link to="/reminders" className="btn btn-ghost bg-base-200 hover:bg-accent hover:text-accent-content rounded-2xl justify-start gap-4 h-auto py-3">
                <Calendar size={20} /> 
                <div className="text-left">
                  <div className="font-bold">Schedule Appt</div>
                  <div className="text-[10px] opacity-60 uppercase font-bold tracking-widest">Reminders</div>
                </div>
              </Link>
              <Link to="/travel" className="btn btn-ghost bg-base-200 hover:bg-info hover:text-info-content rounded-2xl justify-start gap-4 h-auto py-3">
                <ShoppingBag size={20} /> 
                <div className="text-left">
                  <div className="font-bold">Packing List</div>
                  <div className="text-[10px] opacity-60 uppercase font-bold tracking-widest">Travel Ready</div>
                </div>
              </Link>
              <Link to="/store" className="btn btn-ghost bg-base-200 hover:bg-secondary hover:text-secondary-content rounded-2xl justify-start gap-4 h-auto py-3">
                <ShoppingBag size={20} /> 
                <div className="text-left">
                  <div className="font-bold">Shop Boutique</div>
                  <div className="text-[10px] opacity-60 uppercase font-bold tracking-widest">Premium Gear</div>
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
