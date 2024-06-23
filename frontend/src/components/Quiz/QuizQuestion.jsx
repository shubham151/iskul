import React, { useState } from 'react';
import styles from '../../css/QuizQuestion.module.css';

function QuizQuestion({ questionData, onNext, totalQuestions, onQuizFinish }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);

  const handleOptionClick = (option) => {
    if (!isAnswered) {
      setSelectedOption(option);
    }
  };

  const handleNextClick = () => {
    setIsAnswered(true);
    setQuestionsAnswered(questionsAnswered + 1);
    if (selectedOption === questionData.correct_response) {
      setCorrectAnswers(correctAnswers + 1);
    }
    setTimeout(() => {
      onNext();
      setIsAnswered(false);
      setSelectedOption(null);
    }, 1000); // Delay for showing the correct/incorrect highlight
  };

  const isCorrect = selectedOption === questionData.correct_response;
  const isWrong = isAnswered && selectedOption !== questionData.correct_response;

  if (questionsAnswered === totalQuestions) {
    // When all questions are answered, display quiz score
    const quizScore = Math.round((correctAnswers / totalQuestions) * 100);
    onQuizFinish(quizScore);
  }

  return (
    <div className={styles.quizQuestion}>
      <p>{questionData.question}</p>
      <ul>
        <li
          className={`${styles.option} ${
            isAnswered && questionData.option1 === questionData.correct_response ? styles.correct : ''
          } ${
            isWrong && selectedOption === questionData.option1 ? styles.wrong : ''
          }`}
          onClick={() => handleOptionClick(questionData.option1)}
        >
          <input
            type="checkbox"
            checked={selectedOption === questionData.option1}
            readOnly
          />
          {questionData.option1}
        </li>
        <li
          className={`${styles.option} ${
            isAnswered && questionData.option2 === questionData.correct_response ? styles.correct : ''
          } ${
            isWrong && selectedOption === questionData.option2 ? styles.wrong : ''
          }`}
          onClick={() => handleOptionClick(questionData.option2)}
        >
          <input
            type="checkbox"
            checked={selectedOption === questionData.option2}
            readOnly
          />
          {questionData.option2}
        </li>
        <li
          className={`${styles.option} ${
            isAnswered && questionData.option3 === questionData.correct_response ? styles.correct : ''
          } ${
            isWrong && selectedOption === questionData.option3 ? styles.wrong : ''
          }`}
          onClick={() => handleOptionClick(questionData.option3)}
        >
          <input
            type="checkbox"
            checked={selectedOption === questionData.option3}
            readOnly
          />
          {questionData.option3}
        </li>
        <li
          className={`${styles.option} ${
            isAnswered && questionData.option4 === questionData.correct_response ? styles.correct : ''
          } ${
            isWrong && selectedOption === questionData.option4 ? styles.wrong : ''
          }`}
          onClick={() => handleOptionClick(questionData.option4)}
        >
          <input
            type="checkbox"
            checked={selectedOption === questionData.option4}
            readOnly
          />
          {questionData.option4}
        </li>
      </ul>
      {isAnswered && (
        <p className={`${styles.answerFeedback} ${isCorrect ? styles.correctFeedback : styles.incorrectFeedback}`}>
          {isCorrect ? 'Correct!' : `Incorrect. Correct answer: ${questionData.correct_response}`}
        </p>
      )}
      <button
        className={styles.nextButton}
        onClick={handleNextClick}
        disabled={selectedOption === null || isAnswered}
      >
        Next
      </button>
    </div>
  );
}

export default QuizQuestion;
