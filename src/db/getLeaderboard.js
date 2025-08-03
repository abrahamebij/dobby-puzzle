"use server";
import databases from "./databases";

const cache = {
  easy: { data: null, timestamp: 0 },
  hard: { data: null, timestamp: 0 },
};
const CACHE_TTL = 60 * 2000; // 2 minutes

const getLeaderboard = async (difficulty, forceFresh = false) => {
  const key = difficulty === "easy" ? "easy" : "hard";
  const now = Date.now();

  if (
    !forceFresh &&
    cache[key].data &&
    now - cache[key].timestamp < CACHE_TTL
  ) {
    return cache[key].data;
  }

  // try {
  const { documents } = await databases.listDocuments(
    process.env.DATABASE_ID,
    key === "easy"
      ? process.env.LEADERBOARD_EASY_ID
      : process.env.LEADERBOARD_HARD_ID
  );

  const sorted = documents.sort((a, b) => a.time - b.time);
  cache[key] = { data: sorted, timestamp: now };

  return sorted;
  // } catch (error) {
  //   throw new Error(error);
  // }
};

export default getLeaderboard;
