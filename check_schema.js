const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://zzellrqkamskeftyprkv.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp6ZWxscnFrYW1za2VmdHlwcmt2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTcwMzI5MiwiZXhwIjoyMDg3Mjc5MjkyfQ.iWHeYgMWuJBnqGPpcITp7xVZ9pjhos2fy-7KFWui8KY'
);

async function checkSchema() {
  const { data, error } = await supabase
    .from('companies')
    .select('*')
    .limit(1);
  
  if (error) {
    console.error('Error:', error);
    return;
  }
  
  if (data && data.length > 0) {
    console.log('Available columns:', Object.keys(data[0]));
  }
}

checkSchema();
