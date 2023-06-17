const PersonList = ({ personsToShow, handleDelete }) => (
  <div>
    {personsToShow.map((person) => (
      <div key={person.id}>
        <p>{person.name} {person.number}</p>
        <button onClick={() => handleDelete(person.id)}>Delete</button>
      </div>
    ))}
  </div>
)

export default PersonList