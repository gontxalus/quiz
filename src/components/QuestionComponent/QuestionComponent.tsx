import './QuestionComponent.css';
import type { Question } from '../../models/Question';

interface QuestionProps {
  question: Question;
  onClickAnswer: (isCorrect: boolean) => void;
}

function QuestionComponent({ question, onClickAnswer }: QuestionProps) {
  const answers = [
    { a: question.correctAnswer, isCorrect: true },
    { a: question.incorrectAnswer1, isCorrect: false },
    { a: question.incorrectAnswer2, isCorrect: false },
    { a: question.incorrectAnswer3, isCorrect: false },
  ];

  answers.sort(() => Math.random() - 0.5);

  const onClickAnswerButton = (button: EventTarget, isCorrect: boolean) => {
    (button as HTMLButtonElement).classList.add(isCorrect ? 'correct' : 'incorrect');
    setTimeout(() => {
      onClickAnswer(isCorrect);
    }, 500);
  };

  return (
    <>
      <div>
        <img src={question.imagePath} alt="" width="300px" />
        <h3>{question.question}</h3>
        <div className="answers">
          {answers.map((answer) => (
            <button key={answer.a} onClick={(e) => onClickAnswerButton(e.target, answer.isCorrect)}>
              {answer.a}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

export default QuestionComponent;
