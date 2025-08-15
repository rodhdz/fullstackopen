import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'

const Filter = ({ filter, handleFilterChange }) => {
  return (
    <div>
      filter shown <input value={filter} onChange={handleFilterChange} />
    </div>
  )
}

const PersonForm = ({ addName, newName, newPhone, handleNameChange, handlePhoneChange }) => {
  return (
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
  )
}

const Persons = ({ filteredPersons }) => {
  return (
    <div>
      {filteredPersons.map(
        person => <div key={person.id}>{person.name} {person.number}</div>
      )}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filter, setNewFilter] = useState('')
  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then(response => setPersons(response.data))
  }, [])

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    const contact = { name: newName, number: newPhone, id: persons.length + 1 }
    persons.some(i => i.name === newName) ?
      alert(`${newName} is already added to the phonebook`) : setPersons(persons.concat(contact))
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <h3>add a new</h3>
      <PersonForm addName={addName}
        newName={newName}
        newPhone={newPhone}
        handleNameChange={handleNameChange}
        handlePhoneChange={handlePhoneChange}
      />

      <h3>Numbers</h3>
      <Persons filteredPersons={filteredPersons} />
    </div>
  )
}

export default App
