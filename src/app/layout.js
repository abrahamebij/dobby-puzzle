import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "Dobby Tile Puzzle",
  description:
    "Challenge your speed and strategy in Dobby Tile Puzzle — a fast-paced tile matching game where every move counts. Climb the leaderboard and prove your skills!",
  keywords:
    "tile puzzle, brain game, leaderboard, speed challenge, Dobby Tile Puzzle",
};
export const viewport = {
  themeColor: "#EDF5FE",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
