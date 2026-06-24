-- Households table
CREATE TABLE households (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Household members table
CREATE TABLE household_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  household_id UUID REFERENCES households(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('owner', 'member', 'sitter')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(household_id, user_id)
);

-- Add household_id to dog_profiles
ALTER TABLE dog_profiles ADD COLUMN household_id UUID REFERENCES households(id) ON DELETE SET NULL;

-- Enable RLS
ALTER TABLE households ENABLE ROW LEVEL SECURITY;
ALTER TABLE household_members ENABLE ROW LEVEL SECURITY;

-- Household RLS Policies
CREATE POLICY "Users can view households they belong to" 
ON households FOR SELECT 
USING (id IN (SELECT household_id FROM household_members WHERE user_id = auth.uid()));

CREATE POLICY "Owners can update their households" 
ON households FOR UPDATE 
USING (id IN (SELECT household_id FROM household_members WHERE user_id = auth.uid() AND role = 'owner'));

-- Household Members RLS Policies
CREATE POLICY "Members can view other members in their household" 
ON household_members FOR SELECT 
USING (household_id IN (SELECT household_id FROM household_members WHERE user_id = auth.uid()));

-- Update Dog Profiles RLS to include household access
DROP POLICY "Users can only access their own dog profiles" ON dog_profiles;
CREATE POLICY "Users can access dogs they own or share a household with" 
ON dog_profiles FOR ALL 
USING (
  user_id = auth.uid() OR 
  household_id IN (SELECT household_id FROM household_members WHERE user_id = auth.uid())
);

-- Update other tables RLS to follow dog access
-- (Existing policies already use 'dog_id IN (SELECT id FROM dog_profiles ...)')
-- Since dog_profiles now allows household access, the dependent tables will too.
