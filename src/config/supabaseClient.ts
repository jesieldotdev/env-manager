import { createClient } from '@supabase/supabase-js';


const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;


export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const fetchVariables = async () => {
  
  const { data, error } = await supabase.from('env_variables').select('*');
  if (error) throw error;
  return data;
};

export const addVariable = async (name: string, value: string, description: string, user_id: string) => {
  const { error } = await supabase.from('env_variables').insert([{ name, value, description, user_id }]);
  if (error) throw error;
};

export const removeVariable = async (id: string) => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user ) {
    throw new Error('User not authenticated');
  }

  const { data: variables, error: fetchError } = await supabase
    .from('env_variables')
    .select('id')
    .eq('id', id)
    .eq('user_id',user?.id);

  if (fetchError) {
    console.error('Error fetching variable:', fetchError);
    throw fetchError;
  }

  if (!variables || variables.length === 0) {
    throw new Error('Variable not found or not owned by the user');
  }

  const { error } = await supabase.from('env_variables').delete().eq('id', id);
  if (error) {
    throw error;
  }

  console.log('Variable deleted successfully');
};


