import { useRef } from 'react';


export default function Answers({answers, selectedState, selectedAnswer, onSelect}) {
  const shuffledAnswers = useRef();

  if(!shuffledAnswers.current){
    shuffledAnswers.current = [...answers];
    shuffledAnswers.current.sort(() => Math.random() - 0.5);
  }

  return (<ul id="answers">
    {shuffledAnswers.current.map(answer => {
        const isSelected = selectedAnswer === answer;
        let cssClass = '';

        if (selectedState === 'answered' && isSelected) {
          cssClass = 'selected';
        }

        if ((selectedState === 'wrong' || selectedState === 'correct') && isSelected) {
          cssClass = selectedState;
        }

        return (
          <li className="answer" key={answer}>
            <button className={cssClass}
                    onClick={() => onSelect(answer)}
                    disabled={!!selectedState}
            >{answer}</button>
          </li>
        )
      }
    )}
  </ul>)
}