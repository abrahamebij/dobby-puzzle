import React from 'react';
import { Button } from '@/components/ui/button';
import { RotateCcw, Play, Trophy } from 'lucide-react';

const GameControls = ({ 
  difficulty, 
  onDifficultyChange, 
  onNewGame, 
  onShowLeaderboard,
  formattedTime,
  moveCount,
  isGameWon,
  gameStarted 
}) => {
  return (
    <div className="space-y-4">
      {/* Difficulty Selection */}
      <div className="flex justify-center space-x-2">
        <Button
          variant={difficulty === 'easy' ? 'default' : 'outline'}
          onClick={() => onDifficultyChange('easy')}
          className="px-6"
        >
          Easy (3×3)
        </Button>
        <Button
          variant={difficulty === 'hard' ? 'default' : 'outline'}
          onClick={() => onDifficultyChange('hard')}
          className="px-6"
        >
          Hard (4×4)
        </Button>
      </div>

      {/* Game Stats */}
      <div className="flex justify-center space-x-6 text-lg font-semibold">
        <div className="text-blue-600">
          Time: {formattedTime}
        </div>
        <div className="text-green-600">
          Moves: {moveCount}
        </div>
      </div>

      {/* Game Status */}
      {isGameWon && (
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600 mb-2">
            🎉 Congratulations! 🎉
          </div>
          <div className="text-lg text-gray-700">
            You solved the {difficulty} puzzle in {formattedTime}!
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-center space-x-3">
        <Button
          onClick={onNewGame}
          className="flex items-center space-x-2"
          variant="outline"
        >
          <RotateCcw size={16} />
          <span>New Game</span>
        </Button>
        
        <Button
          onClick={onShowLeaderboard}
          className="flex items-center space-x-2"
          variant="outline"
        >
          <Trophy size={16} />
          <span>Leaderboard</span>
        </Button>
      </div>
    </div>
  );
};

export default GameControls;

