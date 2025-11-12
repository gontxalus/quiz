import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

import type { Question } from './models/Question.ts';
import questionListJson from './assets/question-list.json';

const questions: Question[] = [];

if (questionListJson?.questions && Array.isArray(questionListJson?.questions)) {
  for (const questionJson of questionListJson.questions) {
    const question = questionJson.question;
    const imagePath = questionJson['image-path'];
    const correctAnswer = questionJson['correct-answer'];
    const incorrectAnswer1 = questionJson['incorrect-answer-1'];
    const incorrectAnswer2 = questionJson['incorrect-answer-2'];
    const incorrectAnswer3 = questionJson['incorrect-answer-3'];

    if (question && imagePath && correctAnswer && incorrectAnswer1 && incorrectAnswer2 && incorrectAnswer3) {
      questions.push({
        question,
        imagePath,
        correctAnswer,
        incorrectAnswer1,
        incorrectAnswer2,
        incorrectAnswer3,
        solved: false,
      });
    }
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App questions={questions} />
  </StrictMode>
);
