import { supabase } from './supabaseClient';

export async function signInWithEmail(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        if (error.message === 'Email not confirmed') {
          throw new Error('Por favor, confirme seu e-mail antes de fazer login.');
        }
        throw error;
      }
      return data;
    } catch (err) {
      throw err;
    }
  }

export async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
}


export async function signUpWithEmail(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    return data;
}


export async function isUserLoggedIn() {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;

    // Retorna `true` se houver uma sessão válida
    return !!data.session;
}



export async function resendConfirmationEmail(email: string) {
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email,
    });
    if (error) throw error;
  }