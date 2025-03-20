import React from "react";

const Die = ({ number, hold, isHeld }) => {
  const styles = {
    backgroundColor: isHeld ? "#59e391" : "white",
  };
  return (
    <>
      <button
        onClick={hold}
        style={styles}
        aria-pressed={isHeld}
        aria-label={`Die with value ${number}, ${isHeld ? "held" : "not held"}`}
      >
        {number}
      </button>
    </>
  );
};

export default Die;
