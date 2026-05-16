import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://pegeemusducbhdgtgzet.supabase.co'
const supabaseAnonKey = 'sb_publishable_OoPxhu5NkJHBemFsU6Cy6g_W8ku9fB8'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
