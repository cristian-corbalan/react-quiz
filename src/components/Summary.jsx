import imgQuizComplete from '../assets/quiz-complete.png';
import QUESTIONS from '../utilities/questions.js';


export default function Summary({userAnswers}) {
  const skippedAnswers = userAnswers.filter(answer => answer === null);
  const correctAnswers = userAnswers.filter((answer, index) => answer === QUESTIONS[index].answers[0]);

  const skippedAnswersShare = Math.round((skippedAnswers.length / userAnswers.length) * 100);
  const correctAnswersShare = Math.round((correctAnswers.length / userAnswers.length) * 100);
  const wrongAnswersShare = 100 - skippedAnswersShare - correctAnswersShare;

  return (
    <div id="summary">
      <img src={imgQuizComplete} alt="Trophy icon" />
      <h2>Quiz completed!</h2>
      <ul id="summary-stats">
        <li>
          <span className="number">{skippedAnswersShare}%</span>
          <span className="text">Skipped</span>
        </li>
        <li>
          <span className="number">{correctAnswersShare}%</span>
          <span className="text">Answered correctly</span>
        </li>
        <li>
          <span className="number">{wrongAnswersShare}%</span>
          <span className="text">Answered incorrectly</span>
        </li>
      </ul>
      <ol>
        {userAnswers.map((answer, i) => {
            let cssClass = 'user-answer ';

            if (!answer) {
              cssClass += 'skipped';
            } else if (answer === QUESTIONS[i].answers[0]) {
              cssClass += 'correct';
            } else {
              cssClass += 'wrong';
            }


            return <li key={i}>
              <h3>{i}</h3>
              <p className="question">{QUESTIONS[i].text}</p>
              <p className={cssClass}>{answer ?? 'Skipped'}</p>
            </li>
          }
        )}
      </ol>
    </div>
  );
}