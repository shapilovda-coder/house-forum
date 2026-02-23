const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://zzellrqkamskeftyprkv.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp6ZWxscnFrYW1za2VmdHlwcmt2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTcwMzI5MiwiZXhwIjoyMDg3Mjc5MjkyfQ.iWHeYgMWuJBnqGPpcITp7xVZ9pjhos2fy-7KFWui8KY',
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

async function fetchCompanies() {
  const { data, error } = await supabase
    .from('companies')
    .select('id, slug, name, website')
    .eq('status', 'active')
    .order('id');
  
  if (error) {
    console.error('Error:', error);
    process.exit(1);
  }
  
  console.log(JSON.stringify(data, null, 2));
}

fetchCompanies();
