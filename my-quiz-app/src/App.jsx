// Import global CSS and necessary React tools
import './App.css'; 
import React, { useState } from 'react';

// Import the three main components for the quiz flow
import HomePage from './components/HomePage';
import QuestionForm from './components/QuestionForm';
import ResultSection from './components/ResultSection';

export default function App() {
  // Controls which part of the quiz the user is on: 'home', 'question', or 'result'
  const [step, setStep] = useState('home');

  // Stores the user's input (name, category, difficulty)
  const [userData, setUserData] = useState({
    name: '',
    category: '',
    difficulty: '',
  });

  // Stores the question, correct answer, and shuffled answers fetched from the API
  const [questionData, setQuestionData] = useState(null);

  // Tracks which answer the user selected
  const [selectedAnswer, setSelectedAnswer] = useState('');

  // Stores the result of the quiz (correct or not, and correct answer if wrong)
  const [result, setResult] = useState(null);

  // Stores an error message if something goes wrong with the API
  const [apiError, setApiError] = useState(null);

  // Decodes HTML entities like &quot; into readable characters (e.g. quotes)
  const decodeHtml = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  // Called when user submits the form to start the quiz
  const startQuiz = async () => {
    try {
      // API URL based on selected category and difficulty
      const url = `https://opentdb.com/api.php?amount=1&type=multiple&category=${userData.category}&difficulty=${userData.difficulty}`;
      
      // Fetch question from Open Trivia DB
      const res = await fetch(url);
      const data = await res.json();

      if (data.results.length === 0) throw new Error("No questions found.");

      const question = data.results[0];

      // Combine and decode all answers, then shuffle
      const allAnswers = [
        ...question.incorrect_answers,
        question.correct_answer
      ];

      const shuffledAnswers = allAnswers
        .map((ans) => decodeHtml(ans)) // decode each answer
        .sort(() => Math.random() - 0.5); // shuffle

      // Save decoded and shuffled question data to state
      setQuestionData({
        question: decodeHtml(question.question),
        correct_answer: decodeHtml(question.correct_answer),
        answers: shuffledAnswers
      });

      // Move to question step
      setStep('question');
      setApiError(null); // clear any previous errors
    } catch (err) {
      console.error(err);
      setApiError('Failed to fetch question. Please try again.');
    }
  };

  // Called when user submits their answer
  const checkAnswer = () => {
    const isCorrect = selectedAnswer === questionData.correct_answer;
    setResult({ isCorrect, correctAnswer: questionData.correct_answer });
    setStep('result'); // show result page
  };

  // Resets all quiz state to start over
  const resetQuiz = () => {
    setStep('home');
    setUserData({ name: '', category: '', difficulty: '' });
    setQuestionData(null);
    setSelectedAnswer('');
    setResult(null);
    setApiError(null);
  };

  // Conditional rendering based on the current quiz step
  return (
    <>
      {step === 'home' && (
        <HomePage
          userData={userData}
          setUserData={setUserData}
          onSubmit={startQuiz}
        />
      )}
      {step === 'question' && (
        <QuestionForm
          questionData={questionData}
          selectedAnswer={selectedAnswer}
          setSelectedAnswer={setSelectedAnswer}
          onSubmit={checkAnswer}
          apiError={apiError}
        />
      )}
      {step === 'result' && (
        <ResultSection
          name={userData.name}
          result={result}
          onRestart={resetQuiz}
        />
      )}
    </>
  );
}