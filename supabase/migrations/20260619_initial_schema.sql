-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 3.1 User & Plan Management
CREATE TYPE subscription_plan AS ENUM ('Free', 'Wellness', 'Memory', 'Premium');

CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  plan subscription_plan DEFAULT 'Free',
  synced_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3.2 Core Dog Data
CREATE TABLE dog_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  breed TEXT,
  birth_date DATE,
  gotcha_date DATE,
  photo_url TEXT,
  microchip_id TEXT,
  insurance_provider TEXT,
  insurance_policy_number TEXT,
  goal_weight DECIMAL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE weight_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  dog_id UUID REFERENCES dog_profiles(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  weight DECIMAL NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3.3 Health & Wellness Records
CREATE TYPE health_event_type AS ENUM ('vaccine', 'medication', 'surgery', 'vet_visit', 'allergy');

CREATE TABLE health_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  dog_id UUID REFERENCES dog_profiles(id) ON DELETE CASCADE,
  type health_event_type NOT NULL,
  date DATE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  -- Metadata columns for specific types
  next_due_date DATE, -- For vaccines
  dosage TEXT, -- For meds
  frequency TEXT, -- For meds
  end_date DATE, -- For meds
  is_active BOOLEAN DEFAULT TRUE, -- For meds
  severity TEXT, -- For allergies
  veterinarian TEXT, -- For vet visits
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3.4 Care & Logistics
CREATE TYPE appointment_type AS ENUM ('Vet', 'Groomer', 'Trainer', 'Other');

CREATE TABLE appointments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  dog_id UUID REFERENCES dog_profiles(id) ON DELETE CASCADE,
  type appointment_type NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  provider_name TEXT NOT NULL,
  provider_address TEXT,
  notes TEXT,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE directory_entries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  address TEXT,
  website TEXT,
  rating INTEGER,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE sitter_instructions (
  dog_id UUID PRIMARY KEY REFERENCES dog_profiles(id) ON DELETE CASCADE,
  feeding_schedule TEXT,
  medication_guide TEXT,
  behavioral_notes TEXT,
  favorite_toys TEXT,
  routines TEXT,
  emergency_notes TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE emergency_contacts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  relationship TEXT,
  phone TEXT NOT NULL,
  email TEXT,
  is_primary BOOLEAN DEFAULT FALSE
);

CREATE TABLE lost_pet_flyers (
  dog_id UUID PRIMARY KEY REFERENCES dog_profiles(id) ON DELETE CASCADE,
  last_seen_date DATE,
  last_seen_location TEXT,
  reward TEXT,
  contact_phone TEXT,
  notes TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3.5 Memories & Journaling
CREATE TABLE journal_entries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  dog_id UUID REFERENCES dog_profiles(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  mood TEXT,
  behavior_notes TEXT,
  diet_notes TEXT,
  exercise_notes TEXT,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE albums (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  dog_id UUID REFERENCES dog_profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE memory_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  dog_id UUID REFERENCES dog_profiles(id) ON DELETE CASCADE,
  album_id UUID REFERENCES albums(id) ON DELETE SET NULL,
  date DATE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  media_type TEXT DEFAULT 'Photo',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3.6 E-commerce Sync (Shopify Integration)
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  shopify_order_id TEXT UNIQUE,
  total_amount DECIMAL,
  status TEXT, -- 'pending', 'shipped', 'delivered'
  order_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE dog_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE weight_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE health_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE directory_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE sitter_instructions ENABLE ROW LEVEL SECURITY;
ALTER TABLE emergency_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE lost_pet_flyers ENABLE ROW LEVEL SECURITY;
ALTER TABLE journal_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE albums ENABLE ROW LEVEL SECURITY;
ALTER TABLE memory_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can only access their own profile" ON users FOR ALL USING (id = auth.uid());
CREATE POLICY "Users can only access their own dog profiles" ON dog_profiles FOR ALL USING (user_id = auth.uid());
CREATE POLICY "Users can only access weight history of their own dogs" ON weight_history FOR ALL USING (dog_id IN (SELECT id FROM dog_profiles WHERE user_id = auth.uid()));
CREATE POLICY "Users can only access health records of their own dogs" ON health_records FOR ALL USING (dog_id IN (SELECT id FROM dog_profiles WHERE user_id = auth.uid()));
CREATE POLICY "Users can only access their own appointments" ON appointments FOR ALL USING (user_id = auth.uid());
CREATE POLICY "Users can only access their own directory entries" ON directory_entries FOR ALL USING (user_id = auth.uid());
CREATE POLICY "Users can only access sitter instructions of their own dogs" ON sitter_instructions FOR ALL USING (dog_id IN (SELECT id FROM dog_profiles WHERE user_id = auth.uid()));
CREATE POLICY "Users can only access their own emergency contacts" ON emergency_contacts FOR ALL USING (user_id = auth.uid());
CREATE POLICY "Users can only access lost pet flyers of their own dogs" ON lost_pet_flyers FOR ALL USING (dog_id IN (SELECT id FROM dog_profiles WHERE user_id = auth.uid()));
CREATE POLICY "Users can only access journal entries of their own dogs" ON journal_entries FOR ALL USING (dog_id IN (SELECT id FROM dog_profiles WHERE user_id = auth.uid()));
CREATE POLICY "Users can only access albums of their own dogs" ON albums FOR ALL USING (dog_id IN (SELECT id FROM dog_profiles WHERE user_id = auth.uid()));
CREATE POLICY "Users can only access memory items of their own dogs" ON memory_items FOR ALL USING (dog_id IN (SELECT id FROM dog_profiles WHERE user_id = auth.uid()));
CREATE POLICY "Users can only access their own orders" ON orders FOR ALL USING (user_id = auth.uid());

-- Function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.users (id, email)
  VALUES (new.id, new.email);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
