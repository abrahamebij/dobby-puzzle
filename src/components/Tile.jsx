const Tile = ({ value, row, col, size, onClick, isGameWon }) => {
  if (value === null) {
    return <div className="bg-gray-900 rounded border-2 border-gray-700"></div>;
  }

  const handleClick = () => {
    if (!isGameWon) {
      onClick(row, col);
    }
  };

  // Calculate the position of this tile in the original image
  const originalRow = Math.floor(value / size);
  const originalCol = value % size;

  const backgroundPositionX = `-${originalCol * (100 / size)}%`;
  const backgroundPositionY = `-${originalRow * (100 / size)}%`;

  return (
    <div
      className={`
        relative overflow-hidden rounded border-2 border-gray-600 cursor-pointer
        transition-all duration-200 hover:border-blue-400 hover:shadow-lg
        ${isGameWon && "border-green-400 shadow-green-400/50"}
      `}
      onClick={handleClick}
      style={{
        backgroundImage: "url(/assets/puzzle_image.jpg)",
        backgroundSize: "400px 400px",
        backgroundPosition: `-${originalCol * (400 / size)}px -${
          originalRow * (400 / size)
        }px`,
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Optional: Show tile number for debugging */}
      {/* <div className="absolute top-1 left-1 text-xs font-bold text-white bg-black bg-opacity-50 px-1 rounded">
        {value}
      </div> */}
    </div>
  );
};

export default Tile;
