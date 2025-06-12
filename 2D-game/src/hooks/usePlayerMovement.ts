import { useState, useEffect, useCallback } from 'react';
import { playerService } from '../services/supabase';

interface UsePlayerMovementProps {
  playerId: string | null;
  gameFieldWidth: number;
  gameFieldHeight: number;
  playerSize: number;
}

export const usePlayerMovement = ({ 
  playerId, 
  gameFieldWidth, 
  gameFieldHeight, 
  playerSize 
}: UsePlayerMovementProps) => {
  const [position, setPosition] = useState({ x: 400, y: 300 });
  const [pressedKeys, setPressedKeys] = useState(new Set<string>());

  const updatePlayerPosition = useCallback(
    async (newX: number, newY: number) => {
      if (!playerId) return;

      // Bound checking
      const boundedX = Math.max(0, Math.min(gameFieldWidth - playerSize, newX));
      const boundedY = Math.max(0, Math.min(gameFieldHeight - playerSize, newY));

      setPosition({ x: boundedX, y: boundedY });

      try {
        await playerService.updatePlayerPosition(playerId, boundedX, boundedY);
      } catch (error) {
        console.error('Error updating player position:', error);
      }
    },
    [playerId, gameFieldWidth, gameFieldHeight, playerSize]
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      if (['w', 'a', 's', 'd'].includes(key)) {
        event.preventDefault();
        setPressedKeys(prev => new Set(prev).add(key));
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      if (['w', 'a', 's', 'd'].includes(key)) {
        event.preventDefault();
        setPressedKeys(prev => {
          const newSet = new Set(prev);
          newSet.delete(key);
          return newSet;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Movement animation loop
  useEffect(() => {
    if (pressedKeys.size === 0) return;

    const moveSpeed = 2;
    const intervalId = setInterval(() => {
      setPosition(prev => {
        let newX = prev.x;
        let newY = prev.y;

        if (pressedKeys.has('a')) newX -= moveSpeed;
        if (pressedKeys.has('d')) newX += moveSpeed;
        if (pressedKeys.has('w')) newY -= moveSpeed;
        if (pressedKeys.has('s')) newY += moveSpeed;

        // Only update if position changed
        if (newX !== prev.x || newY !== prev.y) {
          updatePlayerPosition(newX, newY);
        }

        return { x: newX, y: newY };
      });
    }, 16); // ~60fps

    return () => clearInterval(intervalId);
  }, [pressedKeys, updatePlayerPosition]);

  return { position, setPosition };
};