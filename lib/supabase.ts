import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zzellrqkamskeftyprkv.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp6ZWxscnFrYW1za2VmdHlwcmt2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE3MDMyOTIsImV4cCI6MjA4NzI3OTI5Mn0.vNrzaaOWG2cDBCDcrQISN_R2PgKb0XekNTQAndLhNy8'

export const supabase = createClient(supabaseUrl, supabaseKey)