import { useEffect, useState } from 'react';


export default function QuestionTimer({timeout, onTimeout}) {
  const [remainingTime, setRemainingTime] = useState(timeout);

  useEffect(() => {
    console.log("EXPIRE TIMER");
    const timer = setTimeout(onTimeout, timeout);

    return () => clearTimeout(timer);
  }, [timeout, onTimeout]);


  useEffect(() => {
    console.log("INTERVAL");
    const interval = setInterval(() => {
      setRemainingTime(prevRemainingTime => prevRemainingTime - 10);
    }, 10);

    return () => clearInterval(interval)
  }, []);
  return <progress id="question-time" value={remainingTime} max={timeout} />
}