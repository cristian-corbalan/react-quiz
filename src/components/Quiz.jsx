import { useCallback, useState } from 'react';
import QUESTIONS from '../utilities/questions.js';
import Question from './Question.jsx';
import Summary from './Summary.jsx';


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
    return <Summary userAnswers={userAnswers}/>
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