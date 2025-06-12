import { useState, useEffect } from 'react';
import { supabase, Player, playerService } from '../services/supabase';

export const useRealtimePlayers = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load initial players
    const loadPlayers = async () => {
      try {
        const initialPlayers = await playerService.getAllPlayers();
        setPlayers(initialPlayers);
      } catch (error) {
        console.error('Error loading players:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPlayers();

    // Set up real-time subscription
    const channel = supabase
      .channel('players-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'players'
        },
        (payload) => {
          const newPlayer = payload.new as Player;
          setPlayers(prev => [...prev, newPlayer]);
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'players'
        },
        (payload) => {
          const updatedPlayer = payload.new as Player;
          setPlayers(prev => 
            prev.map(player => 
              player.id === updatedPlayer.id ? updatedPlayer : player
            )
          );
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table: 'players'
        },
        (payload) => {
          const deletedPlayer = payload.old as Player;
          setPlayers(prev => 
            prev.filter(player => player.id !== deletedPlayer.id)
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { players, loading };
};