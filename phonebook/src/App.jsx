import { useState, useEffect } from 'react'
import Filter from './components/Filter';
import AddForm from './components/AddForm';
import PersonList from './components/PersonList'
import Notification from './components/Notification';
import personService from './services/personService'

function App() {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [notification, setNotification] = useState({message: '', type: ''});
  useEffect(() => {
    personService.getAll()
      .then((data) => setPersons(data));
  }, [])
  const personsToShow = persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()));
  const handleError = (message) => {
    setNotification({
      message: message,
      type: 'error',
    })
    setTimeout(() => setNotification({}), 2000);
  }
  const handleNameChange = (e) => {
    setNewName(e.target.value);
  }
  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  }
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if(persons.some((person) => person.name === newName)) {
      if(window.confirm(`${newName} is already in  the phonebook, would you like to replace the old number with a new one?`)) {
        const editPerson = persons.find((person) => person.name === newName);
        const updatedPerson = {
          ...editPerson,
          number: newNumber,
        }
        personService.update(updatedPerson.id, updatedPerson)
          .then((data) => {
            setPersons(persons.map((person) => person.id !== updatedPerson.id ? person : data))
            setNewName('');
            setNewNumber('');
            setNotification({
              message: `Successfully updated ${updatedPerson.name}'s number to ${updatedPerson.number}`,
              type: 'completion'
            })
            setTimeout(() => setNotification({}), 5000);
          })
          .catch(() => handleError('Person has already been deleted from server'));
        return;
      } else {
        return;
      }
    }
    personService.addPerson({name: newName, number: newNumber})
      .then((data) => {
        setPersons(persons.concat(data))
        setNewName('');
        setNewNumber('');
        setNotification({
          message: `Successfully added ${data.name}`,
          type: 'completion'
        })
        setTimeout(() => setNotification({}), 5000);
      })
      .catch((err) => handleError(err.message));
  }
  const handleDelete = (id) => {
    personService.deletePerson(id)
      .then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      })
      .catch(() => handleError('Person has already been removedf from the server'));
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification {...notification} />
      <Filter filter={filter} handleChange={handleFilterChange} />
      <h2>Add a new</h2>
      <AddForm name={newName} number={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} handleSubmit={handleSubmit} />
      <h2>Numbers</h2>
      <PersonList personsToShow={personsToShow} handleDelete={handleDelete} />
    </div>
  )
}

export default App
