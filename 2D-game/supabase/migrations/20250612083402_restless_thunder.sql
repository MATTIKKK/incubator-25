/*
  # Create players table for real-time multiplayer game

  1. New Tables
    - `players`
      - `id` (uuid, primary key) - unique player identifier
      - `name` (text) - player nickname
      - `x` (integer) - x coordinate position
      - `y` (integer) - y coordinate position  
      - `color` (text) - player color in hex format
      - `last_active` (timestamp) - last activity timestamp
      - `created_at` (timestamp) - when player joined

  2. Security
    - Enable RLS on `players` table
    - Add policy for all users to read and write player data
    - Add policy for users to delete their own player data

  3. Real-time
    - Enable real-time replication for the players table
*/

CREATE TABLE IF NOT EXISTS players (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT 'Anonymous',
  x integer NOT NULL DEFAULT 400,
  y integer NOT NULL DEFAULT 300,
  color text NOT NULL DEFAULT '#3B82F6',
  last_active timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE players ENABLE ROW LEVEL SECURITY;

-- Allow all users to read all players
CREATE POLICY "Anyone can read players"
  ON players
  FOR SELECT
  TO public
  USING (true);

-- Allow all users to insert players
CREATE POLICY "Anyone can insert players"
  ON players
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Allow all users to update any player (for real-time movement)
CREATE POLICY "Anyone can update players"
  ON players
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

-- Allow all users to delete any player (for cleanup)
CREATE POLICY "Anyone can delete players"
  ON players
  FOR DELETE
  TO public
  USING (true);

-- Enable real-time replication
ALTER PUBLICATION supabase_realtime ADD TABLE players;