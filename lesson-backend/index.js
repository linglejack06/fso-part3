/* eslint-disable consistent-return */
// required first to ensure all modules have access to dotenv
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Note = require('./models/note');

const app = express();
const requestLogger = (req, res, next) => {
  console.log('Method:', req.method);
  console.log('Path:  ', req.path);
  console.log('Body:  ', req.body);
  console.log('---');
  next();
};
app.use(express.static('build'));
app.use(cors());
app.use(express.json());
app.use(requestLogger);

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
app.get('/api/notes', (req, res) => {
  Note.find({}).then((storedNotes) => {
    res.json(storedNotes);
  });
});
app.get('/api/notes/:id', (req, res, next) => {
  Note.findById(req.params.id)
    .then((note) => {
      if (note) {
        res.json(note);
      } else {
        res.status(400).end();
      }
    })
    .catch((error) => next(error));
});
app.delete('/api/notes/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  notes = notes.filter((n) => n.id !== id);
  res.status(204).end();
});
app.post('/api/notes', (req, res) => {
  const { body } = req;
  if (!body.content) {
    return res.status(400).json({
      error: 'content missing',
    });
  }
  const note = new Note({
    content: body.content,
    important: body.important || false,
  });
  note.save().then((savedNote) => res.json(savedNote));
});
const unknownEndPoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};
app.use(unknownEndPoint);
const errorHandler = (error, req, res, next) => {
  console.error(error.message);
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'incorrectly formatted id' });
  }
  // passed forward to default express error handler
  next(error);
};
// must be used as last middleware
app.use(errorHandler);
const { PORT } = process.env;
app.listen(PORT, () => {
  console.log('server running on port', PORT);
});
