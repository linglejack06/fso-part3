import { useState, useEffect } from 'react';
import Note from './components/Note';
import Notification from './components/Notification';
import Footer from './components/Footer';
import noteService from './services/notes';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('a new note...');
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  useEffect(() => {
    noteService.getAll()
      .then((initialData) => setNotes(initialData));
  }, []) //empty array causes this effect to only be ran along with first render
  const notesToShow = showAll ? notes : notes.filter((note) => note.important);
  const addNote = (e) => {
    e.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random < 0.5,
    }
    noteService.create(noteObject)
      .then((data) => {
        setNotes(notes.concat(data));
        setNewNote('');
      });
  }
  const handleNoteChange = (e) => {
    setNewNote(e.target.value);
  }
  const toggleImportanceOf = (id) => {
    const note = notes.find((note) => note.id === id)
    const changedNote = {
      ...note,
      important: !note.important
    }
    noteService.update(id, changedNote)
      .then((data) => setNotes(notes.map(note => note.id !== id ? note : data)))
      .catch(() => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        );
        setTimeout(() => setErrorMessage(null), 5000);
        setNotes(notes.filter((note) => note.id !== id));
      })
  }
  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <button onClick={() => setShowAll(!showAll)}>
        show {showAll ? 'important' : 'all'}
      </button>
      <ul>
        {notesToShow.map((note) => (
          <Note note={note} toggleImportance={() => toggleImportanceOf(note.id)} key={note.id} />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange}/>
        <button type='submit'>save</button>
      </form>
      <Footer />
    </div>
  )
}

export default App;
