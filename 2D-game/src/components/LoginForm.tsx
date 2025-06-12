import React, { useState } from 'react';
import { User, Gamepad2 } from 'lucide-react';

interface LoginFormProps {
  onJoin: (name: string) => void;
  loading?: boolean;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onJoin, loading = false }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onJoin(name.trim());
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 w-full max-w-md shadow-2xl">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
              <Gamepad2 className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Multiplayer Arena</h1>
          <p className="text-gray-300">Enter your name to join the game</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-200 mb-2">
              Player Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name..."
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                maxLength={20}
                disabled={loading}
                autoFocus
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={!name.trim() || loading}
            className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-lg hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                Joining Game...
              </div>
            ) : (
              'Join Game'
            )}
          </button>
        </form>

        <div className="mt-8 p-4 bg-white/5 rounded-lg border border-white/10">
          <h3 className="text-white font-medium mb-2">How to Play:</h3>
          <ul className="text-gray-300 text-sm space-y-1">
            <li>• Use <kbd className="px-1 py-0.5 bg-white/20 rounded text-xs">WASD</kbd> keys to move</li>
            <li>• See other players in real-time</li>
            <li>• Your color is randomly assigned</li>
          </ul>
        </div>
      </div>
    </div>
  );
};