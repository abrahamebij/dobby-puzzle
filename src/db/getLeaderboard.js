"use server";

import databases from "./databases";

async function getLeaderboard(difficulty) {
  const { documents } = await databases.listDocuments(
    process.env.DATABASE_ID,
    difficulty === "easy"
      ? process.env.LEADERBOARD_EASY_ID
      : process.env.LEADERBOARD_HARD_ID
  );
  // console.log(documents);

  let db = {
    easy: [
      {
        id: "m493",
        name: "Abraham",
        date: new Date("2024-06-01T10:00:00Z"),
        time: 340,
      },
      {
        id: "m494",
        name: "Liam",
        date: new Date("2024-06-02T11:00:00Z"),
        time: 34.5,
      },
      {
        id: "m495",
        name: "Emma",
        date: new Date("2024-06-03T12:00:00Z"),
        time: 300,
      },
      {
        id: "m496",
        name: "Olivia",
        date: new Date("2024-06-04T13:00:00Z"),
        time: 124.35,
      },
    ],
    hard: [
      {
        id: "me493",
        name: "Shayla",
        date: new Date("2024-06-01T14:00:00Z"),
        time: 349.23,
      },
      {
        id: "me494",
        name: "Noah",
        date: new Date("2024-06-02T15:00:00Z"),
        time: 450.2,
      },
      {
        id: "me495",
        name: "Ava",
        date: new Date("2024-06-03T16:00:00Z"),
        time: 34.2,
      },
      {
        id: "me496",
        name: "Sophia",
        date: new Date("2024-06-04T17:00:00Z"),
        time: 45.6,
      },
    ],
  };
  // return db[difficulty].sort((a, b) => a.time - b.time);
  return documents.sort((a, b) => a.time - b.time);
}

export default getLeaderboard;
