import { createClient } from '@supabase/supabase-js';


const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log('SUPABASE_URL:', SUPABASE_URL);
console.log('SUPABASE_ANON_KEY:', SUPABASE_ANON_KEY);


export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const fetchVariables = async () => {
  const { data, error } = await supabase.from('env variables').select('*');
  if (error) throw error;
  return data;
};

export const addVariable = async (name: string, value: string, description: string) => {
  const { error } = await supabase.from('env variables').insert([{ name, value, description }]);
  if (error) throw error;
};

export const removeVariable = async (id: string) => {
  const { error } = await supabase.from('env variables').delete().eq('id', id);
  if (error) throw error;
};

