import { useState, useEffect } from "react"
import axios from "axios"

import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import personService from "./services/persons"
import Notification from "./components/Notification"

function App() {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filter, setFilter] = useState("")
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [isError, setIsError] = useState(false)
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const addNewPerson = (event) => {
    event.preventDefault()
    const person = persons.find(person => person.name === newName)
    if (person) {
      if (confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {

        const updatedPerson = {
          ...person,
          number: newNumber
        }
        personService.update(person.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id === returnedPerson.id ? returnedPerson : person))
          })
      }
    }

    else {
      const person = {
        name: newName,
        number: newNumber,
      }
      personService.create(person)
        .then((returnedNote) => {
          setPersons(persons.concat(returnedNote))
          setIsError(false)
          setNotificationMessage(`Added ${person.name}`)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000);
          setNewName("")
          setNewNumber("")
        })
    }

  }

  const deletePerson = (id) => {

    const personToDelete = persons.find(person => person.id === id)
    if (confirm(`Delete ${personToDelete.name} `)) {
      personService.deletePerson(id)
        .then(response => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          setIsError(true)
          setNotificationMessage(`Information of ${personToDelete.name} has already been removed from server`)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000);
        })
    }

  }

  const personToShow = filter ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())) : persons

  useEffect(() => {
    personService.getAll()
      .then((initialPersons) => {
        setPersons(initialPersons)
      })

  }, [])
  return (
    <>
      <div>
        <h2>Phonebook</h2>
        <Notification message={notificationMessage} className={isError ? "error" : "success"} />
        <Filter filter={filter} onChange={handleFilterChange} />

        <h3>add a new</h3>

        <PersonForm onSubmit={addNewPerson} onNameChange={handleNameChange} onNumberChange={handleNumberChange} newName={newName} newNumber={newNumber} />

        <h1>Numbers</h1>
        <Persons personToShow={personToShow} onClick={deletePerson} />
      </div>
    </>
  )
}

export default App
