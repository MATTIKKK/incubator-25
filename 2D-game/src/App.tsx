import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { LoginForm } from './components/LoginForm';
import { GameField } from './components/GameField';
import { PlayerList } from './components/PlayerList';
import { GameControls } from './components/GameControls';
import { useRealtimePlayers } from './hooks/useRealtimePlayers';
import { usePlayerMovement } from './hooks/usePlayerMovement';
import { playerService } from './services/supabase';
import { generateRandomColor, generateRandomPosition, isValidName } from './utils/gameUtils';

// Game constants
const GAME_FIELD_WIDTH = 800;
const GAME_FIELD_HEIGHT = 600;
const PLAYER_SIZE = 16;

function App() {
  const [currentPlayer, setCurrentPlayer] = useState<{
    id: string;
    name: string;
    color: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { players, loading: playersLoading } = useRealtimePlayers();
  const { position, setPosition } = usePlayerMovement({
    playerId: currentPlayer?.id || null,
    gameFieldWidth: GAME_FIELD_WIDTH,
    gameFieldHeight: GAME_FIELD_HEIGHT,
    playerSize: PLAYER_SIZE,
  });

  const handleJoinGame = async (name: string) => {
    if (!isValidName(name)) return;

    setLoading(true);
    setError(null);

    try {
      const playerId = uuidv4();
      const color = generateRandomColor();
      const startPosition = generateRandomPosition(
        GAME_FIELD_WIDTH,
        GAME_FIELD_HEIGHT,
        PLAYER_SIZE
      );

      const player = await playerService.createPlayer({
        id: playerId,
        name,
        color,
        x: startPosition.x,
        y: startPosition.y,
      });

      setCurrentPlayer({
        id: player.id,
        name: player.name,
        color: player.color,
      });
      
      setPosition({ x: player.x, y: player.y });
    } catch (err) {
      console.error('Error joining game:', err);
      setError('Failed to join game. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLeaveGame = async () => {
    if (!currentPlayer) return;

    try {
      await playerService.deletePlayer(currentPlayer.id);
      setCurrentPlayer(null);
      setError(null);
    } catch (error) {
      console.error('Error leaving game:', error);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (currentPlayer) {
        // Use sendBeacon for reliable cleanup on page close
        navigator.sendBeacon('/api/cleanup', JSON.stringify({
          playerId: currentPlayer.id
        }));
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      if (currentPlayer) {
        handleLeaveGame();
      }
    };
  }, [currentPlayer]);

  // Show login form if no current player
  if (!currentPlayer) {
    return (
      <div>
        <LoginForm onJoin={handleJoinGame} loading={loading} />
        {error && (
          <div className="fixed bottom-4 right-4 bg-red-500/90 text-white px-4 py-2 rounded-lg shadow-lg">
            {error}
          </div>
        )}
      </div>
    );
  }

  // Show loading state while players are loading
  if (playersLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span className="text-white font-medium">Loading game...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Game Field - Takes up most of the space */}
          <div className="lg:col-span-3">
            <GameField
              players={players}
              width={GAME_FIELD_WIDTH}
              height={GAME_FIELD_HEIGHT}
              playerSize={PLAYER_SIZE}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Game Controls */}
            <GameControls
              playerName={currentPlayer.name}
              onLeave={handleLeaveGame}
            />

            {/* Player List */}
            <PlayerList
              players={players}
              currentPlayerId={currentPlayer.id}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-400 text-sm">
          <p>Real-time multiplayer game built with React & Supabase</p>
        </div>
      </div>

      {/* Error notification */}
      {error && (
        <div className="fixed bottom-4 right-4 bg-red-500/90 text-white px-4 py-2 rounded-lg shadow-lg">
          {error}
        </div>
      )}
    </div>
  );
}

export default App;