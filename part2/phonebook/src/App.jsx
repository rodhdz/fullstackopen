import { useState } from 'react'



const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }])
  const [newName, setnewName] = useState('')

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setnewName(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    const Name = { name: newName }
    setPersons(persons.concat(Name))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>

      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(person => <div key={person.name}>{person.name}</div>)}
      </div>
    </div>
  )
}

export default App
