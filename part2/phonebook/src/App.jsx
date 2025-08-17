import { useState } from 'react'
import { useEffect } from 'react'
import personService from './services/phones.js'

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

const Person = ({ person, deleteName }) => {
  return (
    <div>
      {person.name} {person.number} { }
      <button onClick={deleteName}>delete</button>
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
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
  }

  const deleteNameOf = (id) => {
    const person = persons.find(i => i.id === id)
    confirm(`Delete ${person.name}`) ?
      personService.delPerson(id)
        .then(person => setPersons(persons.filter(p => p.id !== id)))
      : {}
  }

  const updatePhone = (contact) => {
    const person = persons.find(i => i.name === contact.name)
    const changedPerson = { ...person, number: contact.number }
    confirm(`${contact.name} is already added to the phonebook, 
        replace the old number with a new one?`)
      ? personService
        .update(changedPerson)
        .then(data => setPersons(persons.map(p => p.id === data.id ? changedPerson : p)))
      : {}
    setNewName('')
    setNewPhone('')
  }


  const addName = (event) => {
    event.preventDefault()
    const contact = { name: newName, number: newPhone }
    persons.some(i => i.name === newName) ? updatePhone(contact)
      : personService
        .create(contact)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewPhone('')
        });
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
      <div>
        {filteredPersons.map(p => (
          <Person
            key={p.id}
            person={p}
            deleteName={() => deleteNameOf(p.id)}
          />
        ))}
      </div>
    </div>
  )
}

export default App
