import React, { useContext } from 'react';
import { AuthContext } from '../App';
import { questions } from '../data/questions';

const Result = () => {
  const { score } = useContext(AuthContext);

  return (
    <div className="max-w-xl w-full bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Your Score: {score} / {questions.length}</h2>
      {questions.map((question, index) => (
        <div key={index} className="mb-6">
          <h3 className="text-xl font-bold">{question.question}</h3>
          <p className="text-green-600">Correct Answer: {question.correctAnswer.join(', ')}</p>
          <p className="text-gray-700 mt-2">Explanation: {question.explanation}</p>
        </div>
      ))}
      <button
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 mt-4"
        onClick={() => window.location.reload()}
      >
        Retake Test
      </button>
    </div>
  );
};

export default Result;