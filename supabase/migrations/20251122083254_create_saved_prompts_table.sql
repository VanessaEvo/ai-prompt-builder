/*
  # Create Saved Prompts Table

  1. New Tables
    - `saved_prompts`
      - `id` (uuid, primary key) - Unique identifier for each saved prompt
      - `name` (text) - User-defined name for the prompt
      - `prompt` (text) - The generated prompt text
      - `state` (jsonb) - Complete prompt state including all options
      - `created_at` (timestamptz) - Timestamp when prompt was created
      - `updated_at` (timestamptz) - Timestamp when prompt was last modified
      - `is_favorite` (boolean) - Whether the prompt is marked as favorite

  2. Security
    - Enable RLS on `saved_prompts` table
    - This is a public table (no auth required) for now, allowing anonymous users to save prompts
    - Add policy for public read access
    - Add policy for public insert access
    - Add policy for public update access
    - Add policy for public delete access

  3. Important Notes
    - Using JSONB for flexible state storage to accommodate evolving prompt options
    - Updated_at automatically updates on row modifications
    - No authentication required initially, but can be added later
*/

CREATE TABLE IF NOT EXISTS saved_prompts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  prompt text NOT NULL,
  state jsonb NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  is_favorite boolean DEFAULT false
);

ALTER TABLE saved_prompts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access"
  ON saved_prompts
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow public insert access"
  ON saved_prompts
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow public update access"
  ON saved_prompts
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public delete access"
  ON saved_prompts
  FOR DELETE
  TO anon
  USING (true);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_saved_prompts_updated_at
  BEFORE UPDATE ON saved_prompts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();