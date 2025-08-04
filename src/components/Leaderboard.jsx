import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Trophy, Medal, Award } from "lucide-react";
import formatUsername, { removeUsernameSymbol } from "@/lib/formatUsername";
import Link from "next/link";

const Leaderboard = ({
  isOpen,
  onClose,
  leaderboard,
  onFetchLeaderboard,
  onSubmitScore,
  setNewScoreData,
  loading,
  error,
  newScoreData = null,
}) => {
  const [playerName, setPlayerName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("easy");
  const [isInputCorrect, setIsInputCorrect] = useState(true);

  useEffect(() => {
    if (isOpen) {
      onFetchLeaderboard(activeTab);
    }
  }, [isOpen, onFetchLeaderboard]);

  function handleTabChange(tab) {
    onFetchLeaderboard(tab);
  }
  function handleInputChange(e) {
    const name = e.target.value;
    // console.log(name.includes(" "));

    if (name.includes(" ")) {
      setIsInputCorrect(false);
    } else {
      setIsInputCorrect(true);
    }
    setPlayerName(name);
  }
  const handleSubmitScore = async (e) => {
    e.preventDefault();
    if (!playerName.trim() || !newScoreData) return;

    setSubmitting(true);
    try {
      await onSubmitScore(
        formatUsername(playerName.trim()),
        newScoreData.difficulty,
        newScoreData.time
      );
      setPlayerName("");
      setNewScoreData(null);

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
            <p className="font-semibold pb-2">Enter your X username</p>
            <form
              className="flex space-x-2 items-stretch"
              onSubmit={handleSubmitScore}
            >
              <Input
                placeholder="E.g @ebij_dev"
                value={playerName}
                onChange={handleInputChange}
                maxLength={50}
                className={`flex-1 ${!isInputCorrect && "border-red-500"}`}
              />
              <Button
                // onClick={handleSubmitScore}
                type="submit"
                disabled={!playerName.trim() || !isInputCorrect || submitting}
              >
                {submitting ? "Submitting..." : "Submit"}
              </Button>
            </form>
            {!isInputCorrect && (
              <p className="text-sm pt-2 text-red-600">
                Kindly remove all spaces before submitting
              </p>
            )}
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
                        <Link
                          target="_blank"
                          className="font-semibold text-gray-800 underline hover:no-underline"
                          href={`https://x.com/${removeUsernameSymbol(
                            score.name
                          )}`}
                        >
                          {score.name}
                        </Link>
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
