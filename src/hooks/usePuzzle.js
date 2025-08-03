import { useState, useCallback, useEffect } from "react";

// Fisher-Yates shuffle algorithm
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Check if puzzle is solvable
const isSolvable = (puzzle, size) => {
  const flat = puzzle.flat();
  const emptyIndex = flat.findIndex((tile) => tile === null);
  const emptyRow = Math.floor(emptyIndex / size);

  let inversions = 0;
  for (let i = 0; i < flat.length - 1; i++) {
    if (flat[i] === null) continue;
    for (let j = i + 1; j < flat.length; j++) {
      if (flat[j] === null) continue;
      if (flat[i] > flat[j]) inversions++;
    }
  }

  if (size % 2 === 1) {
    return inversions % 2 === 0;
  } else {
    return (inversions + emptyRow) % 2 === 1;
  }
};

// Generate solvable puzzle
const generateSolvablePuzzle = (size) => {
  let puzzle;
  do {
    const tiles = Array.from({ length: size * size - 1 }, (_, i) => i);
    tiles.push(null); // empty tile
    const shuffled = shuffleArray(tiles);
    puzzle = [];
    for (let i = 0; i < size; i++) {
      puzzle.push(shuffled.slice(i * size, (i + 1) * size));
    }
  } while (!isSolvable(puzzle, size));

  return puzzle;
};

// Check if puzzle is solved
const isPuzzleSolved = (puzzle, size) => {
  const flat = puzzle.flat();
  for (let i = 0; i < flat.length - 1; i++) {
    if (flat[i] !== i) return false;
  }
  return flat[flat.length - 1] === null;
};

// Find empty tile position
const findEmptyTile = (puzzle) => {
  for (let row = 0; row < puzzle.length; row++) {
    for (let col = 0; col < puzzle[row].length; col++) {
      if (puzzle[row][col] === null) {
        return { row, col };
      }
    }
  }
  return null;
};

// Check if tile can move to empty space
const canMoveTile = (tileRow, tileCol, emptyRow, emptyCol) => {
  const rowDiff = Math.abs(tileRow - emptyRow);
  const colDiff = Math.abs(tileCol - emptyCol);
  return (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1);
};

export const usePuzzle = (difficulty) => {
  const size = difficulty === "easy" ? 3 : 4;
  const [puzzle, setPuzzle] = useState(() => generateSolvablePuzzle(size));
  const [isGameWon, setIsGameWon] = useState(false);
  const [moveCount, setMoveCount] = useState(0);

  // Reset puzzle when difficulty changes
  useEffect(() => {
    const newSize = difficulty === "easy" ? 3 : 4;
    setPuzzle(generateSolvablePuzzle(newSize));
    setIsGameWon(false);
    setMoveCount(0);
  }, [difficulty]);

  // setTimeout(() => {
  //   setIsGameWon(true);
  // }, 4000);

  const moveTile = useCallback(
    (row, col) => {
      if (isGameWon) return false;

      const emptyTile = findEmptyTile(puzzle);
      if (!emptyTile || !canMoveTile(row, col, emptyTile.row, emptyTile.col)) {
        return false;
      }

      const newPuzzle = puzzle.map((row) => [...row]);
      // Swap tile with empty space
      [newPuzzle[row][col], newPuzzle[emptyTile.row][emptyTile.col]] = [
        newPuzzle[emptyTile.row][emptyTile.col],
        newPuzzle[row][col],
      ];

      setPuzzle(newPuzzle);
      setMoveCount((prev) => prev + 1);

      // Check if puzzle is solved
      if (isPuzzleSolved(newPuzzle, size)) {
        setIsGameWon(true);
      }

      return true;
    },
    [puzzle, isGameWon, size]
  );

  const resetPuzzle = useCallback(() => {
    setPuzzle(generateSolvablePuzzle(size));
    setIsGameWon(false);
    setMoveCount(0);
  }, [size]);

  return {
    puzzle,
    isGameWon,
    moveCount,
    moveTile,
    resetPuzzle,
    size,
  };
};
