import { useState } from 'react';
import QUESTIONS from '../utilities/questions.js';
import Answers from './Answers.jsx';
import QuestionTimer from './QuestionTimer.jsx';


export default function Question({activeIndex, onSelectAnswer, onSkipAnswer}) {
  const [answer, setAnswer] = useState({
    selectedAnswer: '',
    isCorrect: null,
  });

  function handleSelectAnswer (answer){
    setAnswer({
      selectedAnswer: answer,
      isCorrect: null
    });

    setTimeout(() => {
      // Verify if the answer is correct:
      setAnswer({
        selectedAnswer: answer,
        isCorrect: QUESTIONS[activeIndex].answers[0] === answer
      });

      setTimeout(() => {
        onSelectAnswer(answer);
      }, 2000)
    }, 1000)
  }

  let selectedState = '';

  if(answer.selectedAnswer && answer.isCorrect === null){
    selectedState = 'answered'
  }else if(answer.selectedAnswer){
    selectedState = answer.isCorrect ? 'correct' : 'wrong';
  }

  return (
    <div id="question">
      <QuestionTimer timeout={10000} onTimeout={onSkipAnswer} />
      <h2>{QUESTIONS[activeIndex].text}</h2>
      <Answers answers={QUESTIONS[activeIndex].answers}
               selectedAnswer={answer.selectedAnswer}
               selectedState={selectedState}
               onSelect={handleSelectAnswer}
      />
    </div>
  );
}