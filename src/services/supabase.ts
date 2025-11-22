import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface SavedPrompt {
  id: string;
  name: string;
  prompt: string;
  state: Record<string, any>;
  created_at: string;
  updated_at: string;
  is_favorite: boolean;
}

export const promptService = {
  async getAll(): Promise<SavedPrompt[]> {
    const { data, error } = await supabase
      .from('saved_prompts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching prompts:', error);
      return [];
    }

    return data || [];
  },

  async create(name: string, prompt: string, state: Record<string, any>): Promise<SavedPrompt | null> {
    const { data, error } = await supabase
      .from('saved_prompts')
      .insert({ name, prompt, state })
      .select()
      .single();

    if (error) {
      console.error('Error creating prompt:', error);
      return null;
    }

    return data;
  },

  async update(id: string, updates: Partial<SavedPrompt>): Promise<SavedPrompt | null> {
    const { data, error } = await supabase
      .from('saved_prompts')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating prompt:', error);
      return null;
    }

    return data;
  },

  async delete(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('saved_prompts')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting prompt:', error);
      return false;
    }

    return true;
  },

  async toggleFavorite(id: string, isFavorite: boolean): Promise<boolean> {
    const { error } = await supabase
      .from('saved_prompts')
      .update({ is_favorite: isFavorite })
      .eq('id', id);

    if (error) {
      console.error('Error toggling favorite:', error);
      return false;
    }

    return true;
  }
};
