const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://zzellrqkamskeftyprkv.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp6ZWxscnFrYW1za2VmdHlwcmt2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTcwMzI5MiwiZXhwIjoyMDg3Mjc5MjkyfQ.iWHeYgMWuJBnqGPpcITp7xVZ9pjhos2fy-7KFWui8KY'
);

async function addAddressColumn() {
  // Try to add column using RPC
  const { data, error } = await supabase.rpc('exec_sql', {
    sql: 'ALTER TABLE companies ADD COLUMN IF NOT EXISTS address TEXT DEFAULT NULL;'
  });
  
  if (error) {
    console.error('RPC Error:', error);
    // Try direct REST API
    console.log('Trying direct approach...');
  } else {
    console.log('Success:', data);
  }
}

addAddressColumn();
