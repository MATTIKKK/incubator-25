import React from 'react';
import { LogOut, Keyboard } from 'lucide-react';

interface GameControlsProps {
  playerName: string;
  onLeave: () => void;
}

export const GameControls: React.FC<GameControlsProps> = ({ playerName, onLeave }) => {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-white">Welcome, {playerName}!</h3>
          <p className="text-gray-300 text-sm">Use WASD keys to move around</p>
        </div>
        <button
          onClick={onLeave}
          className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 rounded-lg font-medium transition-all duration-200 flex items-center gap-2"
        >
          <LogOut className="w-4 h-4" />
          Leave Game
        </button>
      </div>

      <div className="bg-white/5 rounded-lg p-4 border border-white/10">
        <div className="flex items-center gap-2 mb-3">
          <Keyboard className="w-5 h-5 text-purple-400" />
          <span className="text-white font-medium">Controls</span>
        </div>
        
        <div className="grid grid-cols-3 gap-2 max-w-40">
          <div></div>
          <kbd className="px-3 py-2 bg-white/20 text-white rounded text-center font-mono text-sm">W</kbd>
          <div></div>
          <kbd className="px-3 py-2 bg-white/20 text-white rounded text-center font-mono text-sm">A</kbd>
          <kbd className="px-3 py-2 bg-white/20 text-white rounded text-center font-mono text-sm">S</kbd>
          <kbd className="px-3 py-2 bg-white/20 text-white rounded text-center font-mono text-sm">D</kbd>
        </div>
        
        <p className="text-gray-400 text-xs mt-3">
          Hold keys for continuous movement
        </p>
      </div>
    </div>
  );
};