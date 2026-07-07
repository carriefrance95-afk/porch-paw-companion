import { createClient } from '@supabase/supabase-js';

// These pull your unique credentials from your existing environment configuration
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || '';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
EOFmkdir -p src/utils
cat << 'EOF' > src/utils/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

// These pull your unique credentials from your existing environment configuration
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || '';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
