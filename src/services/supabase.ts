import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export interface SavedPrompt {
  id: string;
  name: string;
  prompt: string;
  state: Record<string, any>;
  created_at: string;
  updated_at: string;
  is_favorite: boolean;
}

const STORAGE_KEY = 'aiPromptBuilder_savedPrompts';

export const promptService = {
  async getAll(): Promise<SavedPrompt[]> {
    if (!supabase) {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    }

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
    if (!supabase) {
      const newPrompt: SavedPrompt = {
        id: Date.now().toString(),
        name,
        prompt,
        state,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        is_favorite: false,
      };
      const stored = await this.getAll();
      const updated = [newPrompt, ...stored];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return newPrompt;
    }

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
    if (!supabase) {
      const stored = await this.getAll();
      const index = stored.findIndex(p => p.id === id);
      if (index !== -1) {
        stored[index] = { ...stored[index], ...updates, updated_at: new Date().toISOString() };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
        return stored[index];
      }
      return null;
    }

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
    if (!supabase) {
      const stored = await this.getAll();
      const filtered = stored.filter(p => p.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
      return true;
    }

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
    if (!supabase) {
      const stored = await this.getAll();
      const index = stored.findIndex(p => p.id === id);
      if (index !== -1) {
        stored[index].is_favorite = isFavorite;
        stored[index].updated_at = new Date().toISOString();
        localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
        return true;
      }
      return false;
    }

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
