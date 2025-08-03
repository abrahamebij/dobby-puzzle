"use server";
import { ID } from "appwrite";
import databases from "./databases";

async function updateLeaderboard(name, difficulty, time) {
  try {
    const promise = await databases.createDocument(
      process.env.DATABASE_ID,
      difficulty === "easy"
        ? process.env.LEADERBOARD_EASY_ID
        : process.env.LEADERBOARD_HARD_ID,
      ID.unique(),
      {
        name,
        date: new Date(),
        time,
      }
    );
    return promise;
  } catch (error) {
    throw new Error(error.message);
    // return error
  }
}

export default updateLeaderboard;
