const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  console.log('--- Checking lab_test_tubes table ---');
  const { data: tubes, error: tError } = await supabase.from('lab_test_tubes').select('*').limit(1);
  if (tError) console.error('Error fetching tubes:', tError);
  else console.log('Found tubes:', tubes);

  console.log('--- Checking specific micro join ---');
  const { data: micro, error: mError } = await supabase
    .from('microorganisms')
    .select('id, scientific_name, lab_test_tubes(*)')
    .eq('id', '79b476d1-5cfc-4b0f-920b-eb32dcffb12a')
    .single();
  if (mError) console.error('Error joining tubes:', mError);
  else console.log('Micro with storage:', JSON.stringify(micro, null, 2));
}

check();
