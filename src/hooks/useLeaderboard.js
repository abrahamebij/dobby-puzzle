import getLeaderboard from "@/db/getLeaderboard";
import getLeaderboardRank from "@/db/getLeaderboardRank";
import updateLeaderboard from "@/db/updateLeaderboard";
import { useState, useCallback } from "react";

export const useLeaderboard = () => {
  const [leaderboard, setLeaderboard] = useState({ easy: [], hard: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // const fetchLeaderboard = useCallback(
  //   async (difficulty, forceRefresh = false) => {
  //     setLoading(true);
  //     setError(null);
  //     try {
  //       setLeaderboard(await getLeaderboard(difficulty, forceRefresh));
  //     } catch (error) {
  //       setError(error.message);
  //     }
  //     setLoading(false);
  //   },
  //   []
  // );

  const fetchLeaderboard = useCallback(
    async (difficulty, forceRefresh = false) => {
      setLoading(true);
      setError(null);

      const key = `leaderboard-${difficulty}`;

      try {
        // Check session storage first (if not forcing refresh)
        if (!forceRefresh) {
          const cached = sessionStorage.getItem(key);
          if (cached) {
            setLeaderboard(JSON.parse(cached));
            setLoading(false);
            return;
          }
        }

        // Otherwise fetch fresh data
        const data = await getLeaderboard(difficulty, forceRefresh);
        setLeaderboard(data);
        sessionStorage.setItem(key, JSON.stringify(data)); // Cache it
      } catch (error) {
        setError(error.message);
      }

      setLoading(false);
    },
    []
  );

  const submitScore = useCallback(
    async (name, difficulty, time) => {
      setLoading(true);
      setError(null);

      try {
        const response = await updateLeaderboard(name, difficulty, time);

        // Refresh leaderboard after successful submission
        await fetchLeaderboard(difficulty, true);

        return response;
      } catch (err) {
        setError(err.message);
        console.error("Error submitting score:", err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [fetchLeaderboard]
  );

  const checkQualification = useCallback(async (difficulty, time) => {
    const rank = getLeaderboardRank(
      difficulty,
      time,
      sessionStorage.getItem(`leaderboard-${difficulty}`)
    );

    return rank;
  }, []);

  return {
    leaderboard,
    loading,
    error,
    fetchLeaderboard,
    submitScore,
    checkQualification,
  };
};
