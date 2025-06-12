import React from 'react';
import { Users, Crown } from 'lucide-react';
import { Player } from '../services/supabase';

interface PlayerListProps {
  players: Player[];
  currentPlayerId?: string;
}

export const PlayerList: React.FC<PlayerListProps> = ({ players, currentPlayerId }) => {
  const sortedPlayers = [...players].sort((a, b) => 
    new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  );

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6 h-full">
      <div className="flex items-center gap-2 mb-4">
        <Users className="w-5 h-5 text-purple-400" />
        <h2 className="text-xl font-bold text-white">
          Players ({players.length})
        </h2>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {sortedPlayers.map((player, index) => (
          <div
            key={player.id}
            className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
              player.id === currentPlayerId
                ? 'bg-purple-500/20 border border-purple-400/30'
                : 'bg-white/5 hover:bg-white/10'
            }`}
          >
            <div
              className="w-4 h-4 rounded-sm border-2 border-white/30 shadow-lg"
              style={{ backgroundColor: player.color }}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-white font-medium truncate">
                  {player.name}
                </span>
                {index === 0 && (
                  <Crown className="w-4 h-4 text-yellow-400" />
                )}
                {player.id === currentPlayerId && (
                  <span className="text-xs text-purple-300 font-medium">
                    (You)
                  </span>
                )}
              </div>
              <div className="text-xs text-gray-400">
                Position: ({player.x}, {player.y})
              </div>
            </div>
          </div>
        ))}

        {players.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No players online</p>
          </div>
        )}
      </div>
    </div>
  );
};