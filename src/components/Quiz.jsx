import {useState} from 'react';
import QUESTIONS from '../utilities/questions.js';

export default function Quiz () {
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIndex = userAnswers.length

  function handleSelectAnswer (selectedAnswer){
    console.info("Selected answer:", selectedAnswer);

    setUserAnswers(prevUserAnswers => {
      return [...prevUserAnswers, selectedAnswer]
    })
  }

  return (
    <div id="quiz">
      <div id="questions">
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {QUESTIONS[activeQuestionIndex].answers.map(answer =>
            <li className="answer" key={answer}>
              <button onClick={() => handleSelectAnswer(answer)}>{answer}</button>
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}