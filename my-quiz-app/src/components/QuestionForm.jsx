import React, { useState } from 'react';

// This component displays a single multiple-choice question and allows the user to select and submit an answer
export default function QuestionForm({
  questionData,         // Contains the question, answers array, and correct answer (from App.jsx)
  selectedAnswer,       // Tracks which answer the user picked
  setSelectedAnswer,    // Function to update the selected answer
  onSubmit,             // Function to call when the user submits their answer
  apiError,             // Error message if something goes wrong with the API
}) {
  // Local state to track whether the user tried to submit without selecting an answer
  const [error, setError] = useState('');

  // This handles the form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page refresh
    if (!selectedAnswer) {
      setError('Please select an answer.');
      return;
    }
    setError('');
    onSubmit(); // Call the parent function to check the answer and move to results
  };

  return (
    <div className="container">
      <h2>Question</h2>

      {/* If there was a problem fetching the question, show the API error */}
      {apiError ? (
        <p className="error">{apiError}</p>
      ) : (
        <form onSubmit={handleSubmit}>
          {/* Display the question */}
          <p>{questionData.question}</p>

          {/* Display the list of possible answers as radio buttons */}
          <div className="radio-group">
            {questionData.answers.map((answer, idx) => (
              <label key={idx}>
                <input
                  type="radio"
                  name="answer"
                  value={answer}
                  checked={selectedAnswer === answer}
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                />
                {answer}
              </label>
            ))}
          </div>

          {/* Button to submit the selected answer */}
          <button type="submit">Submit Answer</button>

          {/* Show validation error if no answer was selected */}
          {error && <p className="error">{error}</p>}
        </form>
      )}
    </div>
  );
}