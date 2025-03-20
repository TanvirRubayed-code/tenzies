import "./App.css";
import Die from "./Die";
import { useRef, useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {
  const [random, setRandom] = useState(() => generateAllNewdice());
  const [rollClick, setRollClick] = useState(false);
  const buttonRef = useRef(null);

  const gameWon =
    random.every((die) => die.isHeld) &&
    random.every((die) => die.value === random[0].value);

  useEffect(() => {
    if (gameWon) {
      buttonRef.current.focus();
    }
  }, [gameWon]);

  function generateAllNewdice() {
    let newDice = [];
    for (let i = 0; i < 10; i++) {
      const rand = Math.ceil(Math.random() * 6);
      newDice.push({ value: rand, isHeld: false, id: nanoid() });
    }
    return newDice;
  }

  function rollDice() {
    setRollClick((prev) => !prev);
    setTimeout(() => {
      setRollClick((prev) => !prev);
    }, 50);
    if (!gameWon) {
      setRandom((oldDice) =>
        oldDice.map((die) =>
          die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) }
        )
      );
    } else {
      setRandom(generateAllNewdice());
    }
  }

  function hold(id) {
    setRandom((oldDice) =>
      oldDice.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  }

  return (
    <main>
      {gameWon && <Confetti width="2000%" height="1000%" />}
      <div aria-live="polite" className="sr-only">
        {gameWon && (
          <p>Congratulations! You won! Press "New Game" to start again.</p>
        )}
      </div>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">
        {random.map((dieObj) => (
          <Die
            key={dieObj.id}
            isHeld={dieObj.isHeld}
            hold={() => hold(dieObj.id)}
            number={dieObj.value}
          />
        ))}
      </div>
      <button
        ref={buttonRef}
        onClick={rollDice}
        className={rollClick ? "roll clicked" : "roll"}
      >
        {!gameWon ? "Roll" : "New Game"}
      </button>
    </main>
  );
}

export default App;
