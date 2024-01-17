import { useCallback, useState } from 'react';
import QUESTIONS from '../utilities/questions.js';
import quizCompleteImg from '../assets/quiz-complete.png';
import QuestionTimer from './QuestionTimer.jsx';


export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIndex = userAnswers.length


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

  const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
  shuffledAnswers.sort(() => Math.random() - 0.5);

  return (
    <div id="quiz">
      <div id="question">
        <QuestionTimer key={activeQuestionIndex} timeout={10000} onTimeout={onTimeOut} />
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffledAnswers.map(answer =>
            <li className="answer" key={answer}>
              <button onClick={() => handleSelectAnswer(answer)}>{answer}</button>
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}