import React from 'react';
import { usePets } from '../context/PetContext';
import { PawPrint, Heart, Bell, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { profiles, vaccines } = usePets();

  const upcomingVaccines = vaccines
    .filter(v => new Date(v.nextDueDate) > new Date())
    .sort((a, b) => new Date(a.nextDueDate).getTime() - new Date(b.nextDueDate).getTime())
    .slice(0, 3);

  return (
    <div className=\"p-6 max-w-6xl mx-auto\">
      <div className=\"mb-8\">
        <h1 className=\"text-4xl font-bold text-primary\">Hello, Pet Parent! 🐾</h1>
        <p className=\"opacity-70\">Here's what's happening with your furry family today.</p>
      </div>

      <div className=\"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10\">
        <div className=\"stats shadow bg-base-100 border border-base-200 rounded-3xl\">
          <div className=\"stat\">
            <div className=\"stat-figure text-primary\"><PawPrint size={32} /></div>
            <div className=\"stat-title font-semibold\">Dog Profiles</div>
            <div className=\"stat-value text-primary\">{profiles.length}</div>
            <div className=\"stat-desc\"><Link to=\"/profiles\" className=\"link link-hover\">Manage profiles</Link></div>
          </div>
        </div>
        
        <div className=\"stats shadow bg-base-100 border border-base-200 rounded-3xl\">
          <div className=\"stat\">
            <div className=\"stat-figure text-secondary\"><Heart size={32} /></div>
            <div className=\"stat-title font-semibold\">Health Records</div>
            <div className=\"stat-value text-secondary\">{vaccines.length}</div>
            <div className=\"stat-desc\"><Link to=\"/health\" className=\"link link-hover\">View wellness</Link></div>
          </div>
        </div>

        <div className=\"stats shadow bg-base-100 border border-base-200 rounded-3xl\">
          <div className=\"stat\">
            <div className=\"stat-figure text-accent\"><Bell size={32} /></div>
            <div className=\"stat-title font-semibold\">Upcoming</div>
            <div className=\"stat-value text-accent\">{upcomingVaccines.length}</div>
            <div className=\"stat-desc\">Next 30 days</div>
          </div>
        </div>

        <div className=\"stats shadow bg-base-100 border border-base-200 rounded-3xl\">
          <div className=\"stat\">
            <div className=\"stat-figure text-info\"><Calendar size={32} /></div>
            <div className=\"stat-title font-semibold\">Journal</div>
            <div className=\"stat-value text-info\">0</div>
            <div className=\"stat-desc\">Memories captured</div>
          </div>
        </div>
      </div>

      <div className=\"grid grid-cols-1 lg:grid-cols-3 gap-8\">
        <div className=\"lg:col-span-2 space-y-6\">
          <div className=\"bg-base-100 rounded-3xl p-8 shadow-sm border border-base-200\">
            <h2 className=\"text-2xl font-bold mb-6 flex items-center gap-3\">
              <Bell className=\"text-primary\" /> Upcoming Reminders
            </h2>
            {upcomingVaccines.length === 0 ? (
              <div className=\"text-center py-10 opacity-60 bg-base-200 rounded-2xl\">
                <p>No upcoming vaccinations or reminders.</p>
              </div>
            ) : (
              <div className=\"space-y-4\">
                {upcomingVaccines.map(v => (
                  <div key={v.id} className=\"flex items-center justify-between p-4 bg-base-200 rounded-2xl\">
                    <div className=\"flex items-center gap-4\">
                      <div className=\"bg-primary/20 p-3 rounded-xl text-primary\">
                        <Syringe size={20} />
                      </div>
                      <div>
                        <p className=\"font-bold\">{v.vaccineName}</p>
                        <p className=\"text-sm opacity-70\">{profiles.find(p => p.id === v.dogId)?.name}</p>
                      </div>
                    </div>
                    <div className=\"text-right\">
                      <p className=\"text-sm font-bold\">{v.nextDueDate}</p>
                      <p className=\"text-xs opacity-50\">Due date</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className=\"space-y-6\">
          <div className=\"bg-primary text-primary-content rounded-3xl p-8 shadow-lg\">
            <h3 className=\"text-xl font-bold mb-2\">Daily Care Tip</h3>
            <p className=\"text-sm opacity-90 leading-relaxed mb-6\">
              Make sure to check your dog's paws after walks, especially in extreme weather conditions. Clean paws are happy paws!
            </p>
            <button className=\"btn btn-secondary btn-sm\">Read More</button>
          </div>
          
          <div className=\"bg-base-100 rounded-3xl p-8 shadow-sm border border-base-200\">
            <h3 className=\"text-xl font-bold mb-4\">Quick Actions</h3>
            <div className=\"grid grid-cols-1 gap-2\">
              <Link to=\"/profiles\" className=\"btn btn-outline btn-sm justify-start gap-3\">
                <Plus size={16} /> Add Dog Profile
              </Link>
              <Link to=\"/health\" className=\"btn btn-outline btn-sm justify-start gap-3\">
                <Heart size={16} /> Log Vaccination
              </Link>
              <Link to=\"/journal\" className=\"btn btn-outline btn-sm justify-start gap-3\">
                <Calendar size={16} /> Write Journal Entry
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Import needed for Dashboard component since it uses Syringe and Plus
import { Syringe, Plus } from 'lucide-react';

export default Dashboard;
