import dynamic from "next/dynamic";

const Tile = dynamic(() => import("./Tile"), {
  ssr: false,
});

const GameBoard = ({ puzzle, onTileClick, size, isGameWon }) => {
  const boardSize = size === 3 ? "w-[400px] h-[400px]" : "w-[400px] h-[400px]";
  const gridCols = size === 3 ? "grid-cols-3" : "grid-cols-4";

  return (
    <div
      className={`${boardSize} mx-auto bg-gray-800 rounded-lg p-2 shadow-2xl`}
    >
      <div className={`grid ${gridCols} gap-1 h-full w-full`}>
        {puzzle.map((row, rowIndex) =>
          row.map((tile, colIndex) => (
            <Tile
              key={`${rowIndex}-${colIndex}`}
              value={tile}
              row={rowIndex}
              col={colIndex}
              size={size}
              onClick={onTileClick}
              isGameWon={isGameWon}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default GameBoard;
