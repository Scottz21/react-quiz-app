import React, { useState } from 'react';

// The HomePage component renders the quiz setup form.
// Props:
// - userData: current values for name, category, and difficulty
// - setUserData: function to update user input in parent state
// - onSubmit: function to call when the form is valid and submitted
export default function HomePage({ userData, setUserData, onSubmit }) {
  const [error, setError] = useState(''); // Local error state to show validation messages

  // Predefined list of categories for the dropdown (IDs match the Open Trivia API)
  const categories = [
    { id: 9, name: "General Knowledge" },
    { id: 12, name: "Music" },
    { id: 17, name: "Science & Nature" },
    { id: 21, name: "Sports" },
  ];

  // Updates the userData object when any input or select changes
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  // Called when the user clicks the "Start Quiz" button
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    const { name, category, difficulty } = userData;

    // Validate that all fields are filled out
    if (!name || !category || !difficulty) {
      setError('All fields are required.');
      return;
    }

    // If all fields are valid, clear error and call onSubmit (which fetches the question)
    setError('');
    onSubmit();
  };

  return (
    <div className="container">
      <h1>Trivia Time!</h1>
      <p>Welcome! Fill out the form below to start your trivia challenge.</p>

      <form onSubmit={handleSubmit}>
        {/* Input for user's first name */}
        <label>
          First Name:
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
          />
        </label>

        {/* Category selection dropdown */}
        <label>
          Category:
          <select
            name="category"
            value={userData.category}
            onChange={handleChange}
          >
            <option value="">--Select--</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </label>

        {/* Difficulty level selection dropdown */}
        <label>
          Difficulty:
          <select
            name="difficulty"
            value={userData.difficulty}
            onChange={handleChange}
          >
            <option value="">--Select--</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </label>

        {/* Submit button */}
        <button type="submit">Start Quiz</button>

        {/* Show error message if validation fails */}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}
