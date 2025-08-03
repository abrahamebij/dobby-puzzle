const getLeaderboardRank = (difficulty, time, data) => {
  if (!data) return null; // Data empty

  // Ensure it's sorted (in case)
  const sorted = JSON.parse(data).sort((a, b) => a.time - b.time);

  // Find the index where this time would fit
  let rank = sorted.findIndex((entry) => time < entry.time);

  // If it's worse than all, rank is at the end
  if (rank == -1) return sorted.length;

  return rank + 1; // Convert 0-based index to 1-based rank
};

export default getLeaderboardRank;
