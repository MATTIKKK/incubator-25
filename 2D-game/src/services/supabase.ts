import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Player {
  id: string;
  name: string;
  x: number;
  y: number;
  color: string;
  last_active: string;
  created_at: string;
}

// Player management functions
export const playerService = {
  async createPlayer(player: Omit<Player, 'last_active' | 'created_at'>) {
    const { data, error } = await supabase
      .from('players')
      .insert([player])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updatePlayerPosition(id: string, x: number, y: number) {
    const { error } = await supabase
      .from('players')
      .update({ x, y, last_active: new Date().toISOString() })
      .eq('id', id);
    
    if (error) throw error;
  },

  async deletePlayer(id: string) {
    const { error } = await supabase
      .from('players')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  async getAllPlayers() {
    const { data, error } = await supabase
      .from('players')
      .select('*')
      .order('created_at', { ascending: true });
    
    if (error) throw error;
    return data || [];
  }
};