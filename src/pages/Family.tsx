import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { Users, UserPlus, Shield, Trash2, Mail } from 'lucide-react';

interface Household {
  id: string;
  name: string;
}

interface Member {
  id: string;
  user_id: string;
  role: string;
  users: {
    email: string;
  };
}

const Family: React.FC = () => {
  const { user } = useAuth();
  const [household, setHousehold] = useState<Household | null>(null);
  const [members, setMembers] = useState<Member[]>([]);
  const [inviteEmail, setInviteEmail] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchFamilyData();
    }
  }, [user]);

  const fetchFamilyData = async () => {
    setIsLoading(true);
    try {
      // Get household member entry for current user
      const { data: memberData, error: memberError } = await supabase
        .from('household_members')
        .select('household_id, households(*)')
        .eq('user_id', user?.id)
        .single();

      if (memberError && memberError.code !== 'PGRST116') throw memberError;

      if (memberData) {
        setHousehold(memberData.households as any);
        
        // Fetch all members of this household
        const { data: allMembers, error: allMembersError } = await supabase
          .from('household_members')
          .select('*, users(email)')
          .eq('household_id', memberData.household_id);

        if (allMembersError) throw allMembersError;
        setMembers(allMembers as any);
      }
    } catch (err) {
      console.error('Error fetching family data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const createHousehold = async () => {
    if (!user) return;
    try {
      const { data: newHousehold, error: hError } = await supabase
        .from('households')
        .insert({ name: `${user.email?.split('@')[0]}'s Home` })
        .select()
        .single();

      if (hError) throw hError;

      const { error: mError } = await supabase
        .from('household_members')
        .insert({
          household_id: newHousehold.id,
          user_id: user.id,
          role: 'owner'
        });

      if (mError) throw mError;

      fetchFamilyData();
    } catch (err) {
      console.error('Error creating household:', err);
      alert('Failed to create household.');
    }
  };

  const inviteMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!household || !inviteEmail) return;

    try {
      // In a real app, this would send an email invitation or check if user exists.
      // For this MVP, we assume the user exists in the 'users' table.
      const { data: targetUser, error: userError } = await supabase
        .from('users')
        .select('id')
        .eq('email', inviteEmail)
        .single();

      if (userError) {
        alert('User not found. They must register for Porch & Paw first.');
        return;
      }

      const { error: inviteError } = await supabase
        .from('household_members')
        .insert({
          household_id: household.id,
          user_id: targetUser.id,
          role: 'member'
        });

      if (inviteError) throw inviteError;

      alert(`Invited ${inviteEmail} to your household!`);
      setInviteEmail('');
      fetchFamilyData();
    } catch (err) {
      console.error('Error inviting member:', err);
      alert('Failed to invite member. They might already be in a household.');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-primary mb-2 flex items-center gap-3">
          <Users size={36} />
          Family & Sharing
        </h1>
        <p className="text-neutral-content opacity-70">Coordinate care with family members and sitters</p>
      </div>

      {!household ? (
        <div className="bg-base-100 rounded-[2.5rem] p-12 text-center border-2 border-dashed border-base-300 shadow-inner">
          <div className="bg-secondary/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <Users size={48} className="text-secondary" />
          </div>
          <h2 className="text-2xl font-bold mb-4">No Household Set Up</h2>
          <p className="opacity-60 mb-8 max-w-md mx-auto text-lg">
            Create a household to start sharing your dog's records and memories with your family or partner.
          </p>
          <button 
            className="btn btn-primary btn-lg rounded-full px-12 shadow-xl"
            onClick={createHousehold}
          >
            Create My Household
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-base-100 rounded-3xl p-8 shadow-sm border border-base-200">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">{household.name}</h3>
                <span className="badge badge-secondary badge-outline px-4 py-3">Active Household</span>
              </div>

              <div className="space-y-4">
                {members.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-4 bg-base-200 rounded-2xl">
                    <div className="flex items-center gap-4">
                      <div className="avatar placeholder">
                        <div className="bg-primary text-primary-content rounded-full w-10">
                          <span>{member.users.email.charAt(0).toUpperCase()}</span>
                        </div>
                      </div>
                      <div>
                        <p className="font-bold">{member.users.email}</p>
                        <div className="flex items-center gap-1 text-xs opacity-60">
                          <Shield size={10} />
                          <span className="capitalize">{member.role}</span>
                          {member.user_id === user?.id && <span className="ml-1 text-primary font-bold">(You)</span>}
                        </div>
                      </div>
                    </div>
                    {member.role !== 'owner' && household.id && (
                      <button className="btn btn-ghost btn-sm btn-circle text-error">
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-terracotta/5 border border-terracotta/20 rounded-3xl p-8">
              <h4 className="font-bold flex items-center gap-2 mb-2 text-terracotta">
                <Shield size={18} />
                Access & Permissions
              </h4>
              <p className="text-sm opacity-70">
                All household members have full access to view and update dog profiles, health records, and memories. 
                Only the Owner can manage household members.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-base-100 rounded-3xl p-8 shadow-sm border border-base-200">
              <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                <UserPlus size={20} className="text-primary" />
                Invite Family
              </h3>
              <form onSubmit={inviteMember} className="space-y-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-bold">Email Address</span>
                  </label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40" />
                    <input 
                      type="email" 
                      placeholder="family@email.com" 
                      className="input input-bordered w-full rounded-2xl pl-12 bg-base-200 focus:bg-base-100"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary btn-block rounded-2xl shadow-md">
                  Send Invite
                </button>
              </form>
              <p className="text-[10px] opacity-50 mt-4 text-center">
                User must already have an account to be invited.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Family;
