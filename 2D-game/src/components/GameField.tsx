import React, { useRef, useEffect } from 'react';
import { Player } from '../services/supabase';

interface GameFieldProps {
  players: Player[];
  width: number;
  height: number;
  playerSize: number;
}

export const GameField: React.FC<GameFieldProps> = ({ 
  players, 
  width, 
  height, 
  playerSize 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, width, height);

    // Draw grid pattern
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    const gridSize = 50;
    
    for (let x = 0; x <= width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    
    for (let y = 0; y <= height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Draw players
    players.forEach((player) => {
      // Player shadow
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.fillRect(player.x + 2, player.y + 2, playerSize, playerSize);

      // Player square
      ctx.fillStyle = player.color;
      ctx.fillRect(player.x, player.y, playerSize, playerSize);

      // Player glow effect
      ctx.shadowColor = player.color;
      ctx.shadowBlur = 10;
      ctx.fillRect(player.x, player.y, playerSize, playerSize);
      ctx.shadowBlur = 0;

      // Player name
      ctx.fillStyle = 'white';
      ctx.font = '12px system-ui, -apple-system, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(
        player.name,
        player.x + playerSize / 2,
        player.y - 8
      );
    });
  }, [players, width, height, playerSize]);

  return (
    <div className="relative">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-4 rounded-xl border border-white/20 shadow-2xl">
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          className="border border-slate-600 rounded-lg bg-slate-900"
        />
      </div>
      
      <div className="absolute top-2 left-2 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
        Game Field: {width}×{height}
      </div>
    </div>
  );
};