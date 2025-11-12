import fs from 'node:fs';

const text = fs.readFileSync('data/preguntas.tsv', 'utf8');

const lines = text.split(/\r?\n/);

const preguntas = { questions: [] };

for (const line of lines) {
  const columns = line.split('\t');

  preguntas.questions.push({
    question: columns[0],
    'image-path': `images/${columns[5] ?? 'oscar-troglodita.png'}`,
    'correct-answer': columns[1],
    'incorrect-answer-1': columns[2],
    'incorrect-answer-2': columns[3],
    'incorrect-answer-3': columns[4],
  });
}

fs.writeFileSync('data/question-list.json', JSON.stringify(preguntas, null, 2));
