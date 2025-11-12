import './App.css';
import { useState } from 'react';

import QuestionComponent from './components/QuestionComponent/QuestionComponent.tsx';
import type { Question } from './models/Question.ts';

interface AppProps {
  questions: Question[];
}

function App({ questions }: AppProps) {
  const [quiz, setQuiz] = useState(-1);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const goToNextUnsolved = (index: number) => {
    let nextQ = questions[index];
    while (index < questions.length && nextQ.solved) {
      index++;
      nextQ = questions[index];
    }
    setQuiz(index);
  };

  const nextQuiz = () => {
    goToNextUnsolved(quiz + 1);
  };

  const onClickAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      questions[quiz].solved = true;
      setCorrectAnswers(correctAnswers + 1);
    }
    nextQuiz();
  };

  const restart = () => {
    goToNextUnsolved(0);
  };

  return (
    <>
      {quiz < 0 ? (
        <div>
          <h1>Oscar Quiz</h1>
          <div>
            <img src="images/oscar-vagabundo.jpeg" width="300px" style={{ marginBottom: '20px' }} />
          </div>
          <button onClick={nextQuiz} disabled={questions.length <= 0}>
            Empezar
          </button>
        </div>
      ) : (
        <>
          {quiz < questions.length ? (
            <div>
              <QuestionComponent question={questions[quiz]} onClickAnswer={onClickAnswer}></QuestionComponent>
            </div>
          ) : correctAnswers === questions.length ? (
            <div>
              <h2>Aqui tiene tu codigo makina: 123</h2>
            </div>
          ) : (
            <div>
              <h2>
                Respuestas correctas: {correctAnswers}/{questions.length}
              </h2>
              <p>
                Parece que has fallado algunas de las preguntas, puedes pulsar continuar para volver a intentar las
                preguntas que has fallado
              </p>
              <button onClick={restart}>Continuar</button>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default App;
