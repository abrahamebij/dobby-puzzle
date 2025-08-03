import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Trophy, Medal, Award } from "lucide-react";

const Leaderboard = ({
  isOpen,
  onClose,
  leaderboard,
  onFetchLeaderboard,
  onSubmitScore,
  loading,
  error,
  newScoreData = null, // { difficulty, time, qualifies, rank }
}) => {
  const [playerName, setPlayerName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("easy");

  useEffect(() => {
    if (isOpen) {
      onFetchLeaderboard(activeTab);
    }
  }, [isOpen, onFetchLeaderboard]);

  function handleTabChange(tab) {
    onFetchLeaderboard(tab);
  }

  const handleSubmitScore = async () => {
    if (!playerName.trim() || !newScoreData) return;

    setSubmitting(true);
    try {
      await onSubmitScore(
        playerName.trim(),
        newScoreData.difficulty,
        newScoreData.time
      );
      setPlayerName("");
      // The leaderboard will be automatically refreshed by the hook
    } catch (error) {
      console.error("Failed to submit score:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = (seconds % 60).toFixed(1);
    return `${mins.toString().padStart(2, "0")}:${secs.padStart(4, "0")}`;
  };

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Trophy className="text-yellow-500" size={20} />;
      case 2:
        return <Medal className="text-gray-400" size={20} />;
      case 3:
        return <Award className="text-amber-600" size={20} />;
      default:
        return <span className="text-gray-600 font-bold">{rank}</span>;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">
            Global Leaderboard
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className={"cursor-pointer"}
          >
            <X size={20} />
          </Button>
        </div>

        {/* New Score Submission */}
        {newScoreData && (
          // {newScoreData && newScoreData.qualifies && (
          <div className="p-6 bg-green-50 border-b">
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold text-green-800">
                🎉 Congratulations! 🎉
                {/* 🎉 New High Score! 🎉 */}
              </h3>
              <p className="text-green-700">
                You finished {newScoreData.difficulty} mode in{" "}
                {formatTime(newScoreData.time)}!
                {newScoreData.rank && ` You're ranked #${newScoreData.rank}!`}
              </p>
            </div>
            <div className="flex space-x-2">
              <Input
                placeholder="Enter your name"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                maxLength={50}
                className="flex-1"
              />
              <Button
                onClick={handleSubmitScore}
                disabled={!playerName.trim() || submitting}
              >
                {submitting ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex border-b">
          <button
            className={`flex-1 py-3 px-4 text-center font-medium ${
              activeTab === "easy"
                ? "border-b-2 border-blue-500 text-blue-600 bg-blue-50"
                : "text-gray-600 hover:text-gray-800"
            }`}
            onClick={() => {
              setActiveTab("easy");
              handleTabChange("easy");
            }}
          >
            Easy (3×3)
          </button>
          <button
            className={`flex-1 py-3 px-4 text-center font-medium ${
              activeTab === "hard"
                ? "border-b-2 border-red-500 text-red-600 bg-red-50"
                : "text-gray-600 hover:text-gray-800"
            }`}
            onClick={() => {
              setActiveTab("hard");
              handleTabChange("hard");
            }}
          >
            Hard (4×4)
          </button>
        </div>

        {/* Leaderboard Content */}
        <div className="p-6 max-h-96 overflow-y-auto">
          {loading && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading leaderboard...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-8">
              <p className="text-red-600">Error: {error}</p>
              <Button
                onClick={() => onFetchLeaderboard(activeTab)}
                variant="outline"
                className="mt-2"
              >
                Retry
              </Button>
            </div>
          )}

          {!loading && !error && (
            <div className="space-y-2">
              {leaderboard?.length > 0 ? (
                leaderboard.map((score, index) => (
                  <div
                    key={score.$id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100"
                  >
                    <div className="flex items-center space-x-3">
                      {getRankIcon(index + 1)}
                      <div>
                        <div className="font-semibold text-gray-800">
                          {score.name}
                        </div>
                        <div className="text-sm text-gray-600">
                          {new Date(score.date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-blue-600">
                        {formatTime(score.time)}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-600">
                  No scores yet. Be the first to complete the {activeTab}{" "}
                  puzzle!
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
