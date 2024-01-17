import { useCallback, useState } from 'react';
import QUESTIONS from '../utilities/questions.js';
import quizCompleteImg from '../assets/quiz-complete.png';
import Answers from './Answers.jsx';
import QuestionTimer from './QuestionTimer.jsx';


export default function Quiz() {
  const [answerState, setAnswerState] = useState('');
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIndex = answerState === '' ? userAnswers.length : userAnswers.length - 1;


  const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {

    setAnswerState('answered');

    setUserAnswers(prevUserAnswers => {
      return [...prevUserAnswers, selectedAnswer]
    })

    setTimeout(() => {
      const correctAnswer = QUESTIONS[activeQuestionIndex].answers[0] === selectedAnswer
      setAnswerState(correctAnswer ? 'correct' : 'wrong');

      setTimeout(() => {
        setAnswerState('');
      }, 2000)
    }, 2000);
  }, [activeQuestionIndex]);

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
      <div id="question">
        <QuestionTimer key={activeQuestionIndex} timeout={10000} onTimeout={onTimeOut} />
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <Answers key={QUESTIONS[activeQuestionIndex].answers}
                 answers={QUESTIONS[activeQuestionIndex].answers}
                 selectedAnswer={userAnswers[userAnswers.length - 1]}
                 selectedState={answerState}
                 onSelect={handleSelectAnswer}
        />
      </div>
    </div>
  )
}