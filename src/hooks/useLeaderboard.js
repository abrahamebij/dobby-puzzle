import getLeaderboard from "@/db/getLeaderboard";
import updateLeaderboard from "@/db/updateLeaderboard";
import { useState, useCallback } from "react";

export const useLeaderboard = () => {
  const [leaderboard, setLeaderboard] = useState({ easy: [], hard: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchLeaderboard = useCallback(async (difficulty) => {
    setLoading(true);
    setError(null);

    setLeaderboard(await getLeaderboard(difficulty));
    setLoading(false);
  }, []);

  const submitScore = useCallback(
    async (name, difficulty, time) => {
      setLoading(true);
      setError(null);

      try {
        const response = await updateLeaderboard(name, difficulty, time);
        // console.log(name, difficulty, time);

        // const data = await response.json();

        // Refresh leaderboard after successful submission
        await fetchLeaderboard(difficulty);
        // getLeaderboard();

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
    const response = getLeaderboard(difficulty);
    return response;
    // try {
    //   const response = await fetch(
    //     `${API_BASE_URL}/leaderboard/check/${difficulty}/${time.toFixed(1)}`
    //   );
    //   if (!response.ok) {
    //     throw new Error(
    //       `Failed to check qualification: ${response.statusText}`
    //     );
    //   }

    //   const data = await response.json();
    //   return data;
    // } catch (err) {
    //   console.error("Error checking qualification:", err);
    //   return { qualifies: false, rank: null };
    // }
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
