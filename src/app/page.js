"use client";
import React, { useState, useEffect } from "react";
import GameBoard from "../components/GameBoard";
import GameControls from "../components/GameControls";
import Leaderboard from "../components/Leaderboard";
import { usePuzzle } from "../hooks/usePuzzle";
import { useTimer } from "../hooks/useTimer";
import { useLeaderboard } from "../hooks/useLeaderboard";
import Img from "@/components/Img";

function Home() {
  const [difficulty, setDifficulty] = useState("easy");
  const [gameStarted, setGameStarted] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [newScoreData, setNewScoreData] = useState(null);

  const { puzzle, isGameWon, moveCount, moveTile, resetPuzzle, size } =
    usePuzzle(difficulty);
  const { time, formattedTime, resetTimer } = useTimer(gameStarted, isGameWon);
  const {
    leaderboard,
    loading,
    error,
    fetchLeaderboard,
    submitScore,
    checkQualification,
  } = useLeaderboard();

  // Start game on first move
  const handleTileClick = (row, col) => {
    if (!gameStarted) {
      setGameStarted(true);
    }
    moveTile(row, col);
  };

  // Handle game won
  useEffect(() => {
    if (isGameWon && gameStarted) {
      const checkScore = async () => {
        // const qualification = await checkQualification(difficulty, time);
        // if (qualification.qualifies) {
        //   setNewScoreData({
        //     difficulty,
        //     time,
        //     qualifies: true,
        //     rank: qualification.rank,
        //   });
        // }
        setNewScoreData({
          difficulty,
          time,
        });
        setShowLeaderboard(true);
      };
      checkScore();
    }
  }, [isGameWon, gameStarted, difficulty, time, checkQualification]);

  const handleDifficultyChange = (newDifficulty) => {
    setDifficulty(newDifficulty);
    setGameStarted(false);
    resetTimer();
    setNewScoreData(null);
  };

  const handleNewGame = () => {
    resetPuzzle();
    setGameStarted(false);
    resetTimer();
    setNewScoreData(null);
  };

  const handleShowLeaderboard = () => {
    setShowLeaderboard(true);
  };

  const handleCloseLeaderboard = () => {
    setShowLeaderboard(false);
    setNewScoreData(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Dobby Tile Puzzle
          </h1>
          <p className="text-gray-600">
            Arrange the tiles to recreate the original image!
          </p>
        </div>

        {/* Game Controls */}
        <div className="mb-8">
          <GameControls
            difficulty={difficulty}
            onDifficultyChange={handleDifficultyChange}
            onNewGame={handleNewGame}
            onShowLeaderboard={handleShowLeaderboard}
            formattedTime={formattedTime}
            moveCount={moveCount}
            isGameWon={isGameWon}
            gameStarted={gameStarted}
          />
        </div>

        {/* Game Board and Guide */}
        <div className="flex justify-center items-start gap-8 mb-8 flex-wrap">
          {/* Guide Image */}
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Original Image
            </h3>
            <div className="w-[200px] h-[200px] border-2 border-gray-300 rounded-lg overflow-hidden shadow-lg">
              <Img
                src="/assets/puzzle_image.jpg"
                alt="Original Dobby character"
                className="w-full h-full object-cover"
                priority={true}
              />
            </div>
          </div>

          {/* Game Board */}
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Puzzle</h3>
            <GameBoard
              puzzle={puzzle}
              onTileClick={handleTileClick}
              size={size}
              isGameWon={isGameWon}
            />
          </div>
        </div>

        {/* Instructions */}
        <div className="text-center text-gray-600 max-w-2xl mx-auto">
          <p className="mb-2">
            Click on tiles adjacent to the empty space to move them.
          </p>
          <p>
            Complete the puzzle as quickly as possible to get on the global
            leaderboard!
          </p>
        </div>

        {/* Leaderboard Modal */}
        <Leaderboard
          isOpen={showLeaderboard}
          onClose={handleCloseLeaderboard}
          leaderboard={leaderboard}
          onFetchLeaderboard={fetchLeaderboard}
          onSubmitScore={submitScore}
          loading={loading}
          error={error}
          newScoreData={newScoreData}
        />
      </div>
    </div>
  );
}

export default Home;
