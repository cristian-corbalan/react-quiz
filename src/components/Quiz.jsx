import { useCallback, useState } from 'react';
import QUESTIONS from '../utilities/questions.js';
import quizCompleteImg from '../assets/quiz-complete.png';
import Question from './Question.jsx';


export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIndex = userAnswers.length;


  const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
    setUserAnswers(prevUserAnswers => {
      return [...prevUserAnswers, selectedAnswer]
    })
  }, []);

  const onTimeOut = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer]);

  // Quiz complete:
  const quizComplete = activeQuestionIndex === QUESTIONS.length

  if (quizComplete) {
    return (
      <div id="summary">
        <img src={quizCompleteImg} alt="Trophy icon" />
        <h2>Quiz completed!</h2>
      </div>
    );
  }

  return (
    <div id="quiz">
      <Question key={activeQuestionIndex}
                activeIndex={activeQuestionIndex}
                onSelectAnswer={handleSelectAnswer}
                onSkipAnswer={onTimeOut}
      />
    </div>
  )
}