import { useState } from 'react'



const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas", phone: "123 456 789" }])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    const contact = { name: newName, phone: newPhone }
    persons.some(i => i.name === newName) ?
      alert(`${newName} is already added to the phonebook`) : setPersons(persons.concat(contact))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newPhone} onChange={handlePhoneChange} />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>

      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(person => <div key={person.name}>{person.name} {person.phone}</div>)}
      </div>
    </div>
  )
}

export default App
