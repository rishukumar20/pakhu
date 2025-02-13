import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../App';
import { questions } from '../data/questions';

const Question = () => {
  const { score, setScore, currentQuestionIndex, setCurrentQuestionIndex } = useContext(AuthContext);
  const [selectedAnswer, setSelectedAnswer] = useState([]);
  const history = useHistory();
  const question = questions[currentQuestionIndex];

  const handleSubmit = () => {
    if (JSON.stringify(selectedAnswer.sort()) === JSON.stringify(question.correctAnswer.sort())) {
      setScore(score + 1);
    }
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer([]);
    } else {
      history.push('/result');
    }
  };

  const handleAnswerChange = (answer) => {
    if (question.type === 'multiple_correct') {
      setSelectedAnswer(selectedAnswer.includes(answer) 
        ? selectedAnswer.filter(a => a !== answer) 
        : [...selectedAnswer, answer]);
    } else {
      setSelectedAnswer([answer]);
    }
  };

  return (
    <div className="max-w-xl w-full bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">{question.question}</h2>
      {question.type === 'single_correct' || question.type === 'multiple_correct' ? (
        question.options.map(option => (
          <div key={option} className="mb-2">
            <label className="flex items-center">
              <input
                type={question.type === 'single_correct' ? 'radio' : 'checkbox'}
                name="answer"
                value={option}
                checked={selectedAnswer.includes(option)}
                onChange={() => handleAnswerChange(option)}
                className="mr-2"
              />
              {option}
            </label>
          </div>
        ))
      ) : question.type === 'true_false' ? (
        ['True', 'False'].map(option => (
          <div key={option} className="mb-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="answer"
                value={option}
                checked={selectedAnswer.includes(option)}
                onChange={() => handleAnswerChange(option)}
                className="mr-2"
              />
              {option}
            </label>
          </div>
        ))
      ) : question.type === 'fill_blank' || question.type === 'numerical' ? (
        <div className="mb-2">
          <input
            type="text"
            value={selectedAnswer[0] || ''}
            onChange={(e) => setSelectedAnswer([e.target.value])}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
      ) : null}
      <button
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 mt-4"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default Question;