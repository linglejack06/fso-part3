const express = require('express');

const app = express();

app.use(express.json());
let notes = [
  {
    id: 1,
    content: 'HTML is easy',
    important: true,
  },
  {
    id: 2,
    content: 'Browser can execute only JavaScript',
    important: false,
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    important: true,
  },
];
app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>');
});
app.get('/api/notes', (req, res) => {
  res.json(notes);
});
app.get('/api/notes/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const note = notes.find((n) => n.id === id);
  if (note) {
    res.json(note);
  } else {
    res.status(404).end();
  }
});
app.delete('/api/notes/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  notes = notes.filter((n) => n.id !== id);
  res.status(204).end();
});
const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map((n) => n.id))
    : 0;
  return maxId + 1;
};
app.post('/api/notes', (req, res) => {
  const { body } = req;
  if (!body.content) {
    return res.status(400).json({
      error: 'content missing',
    });
  }
  const note = {
    content: body.content,
    important: body.important || false,
    id: generateId(),
  };
  notes = notes.concat(note);
  return res.json(note);
});
const PORT = 3001;
app.listen(PORT, () => {
  console.log('server running on port', PORT);
});
