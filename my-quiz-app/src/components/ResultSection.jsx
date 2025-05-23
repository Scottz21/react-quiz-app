import React from 'react';

// This component shows the result of the quiz.
// Props:
// - name: the user's name
// - result: an object with two properties:
//    - isCorrect (boolean): whether the user got the question right
//    - correctAnswer (string): the actual correct answer
// - onRestart: a function to reset the quiz and go back to the home page
export default function ResultSection({ name, result, onRestart }) {
  return (
    // Wrapper with container class for styling
    <div className="container">
      {/* Section title */}
      <h2>☑️ Results</h2>

      {/* Show a personalized message depending on whether the answer was correct */}
      <p>
        {result.isCorrect
          ? `Well done, ${name}! You got it right! 🎉` // Success message
          : `Nice try, ${name}. That was incorrect.`   // Error message
        }
      </p>

      {/* If the user got it wrong, show the correct answer */}
      {!result.isCorrect && (
        <p>
          The correct answer was: <strong>{result.correctAnswer}</strong>
        </p>
      )}

      {/* Button to restart the quiz. It triggers the onRestart function passed from App.jsx */}
      <button onClick={onRestart}>Try Another Question</button>
    </div>
  );
}