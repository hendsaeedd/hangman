import { useCallback, useEffect, useState, Fragment } from "react";
import words from "./wordList.json";
import HangmanDrawing from "./components/HangmanDrawing";
import HangmanWord from "./components/HangmanWord";
import Keyword from "./components/Keyword";

function getWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function App() {
  const [wordToGuess, setWordToGuess] = useState(getWord);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

  const incorrectLetters = guessedLetters.filter(
    (letter) => !wordToGuess.includes(letter)
  );

  const isLoser = incorrectLetters.length >= 6;
  const isWinner = wordToGuess
    .split("")
    .every((letter) => guessedLetters.includes(letter));

  const addGuessedLetter = useCallback(
    (letter: string) => {
      if (guessedLetters.includes(letter) || isLoser || isWinner) return;

      setGuessedLetters((currentLetters) => [...currentLetters, letter]);
    },
    [guessedLetters, isWinner, isLoser]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      if (!key.match(/^[a-z]$/)) return;

      e.preventDefault();
      addGuessedLetter(key);
    };

    document.addEventListener("keypress", handler);

    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, [guessedLetters]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      if (key !== "Enter") return;

      e.preventDefault();
      setGuessedLetters([]);
      setWordToGuess(getWord());
    };

    document.addEventListener("keypress", handler);

    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, []);

  return (
    <Fragment>
      <div className="bg-indigo-500">
        <div
          style={{
            maxWidth: "700px",
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            margin: "0 auto",
            alignItems: "center",
          }}
        >
          <div className="text-2xl font-bold text-center mt-8 ">
            {isWinner && "Winner! 🎉👏 - Refresh to try again"}
            {isLoser && "Nice Try 😊 - Refresh to try again"}
          </div>
          <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
          <HangmanWord
            reveal={isLoser}
            guessedLetters={guessedLetters}
            wordToGuess={wordToGuess}
          />
          <div style={{ alignSelf: "stretch" }}>
            <Keyword
              disabled={isWinner || isLoser}
              activeLetters={guessedLetters.filter((letter) =>
                wordToGuess.includes(letter)
              )}
              inactiveLetters={incorrectLetters}
              addGuessedLetter={addGuessedLetter}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
