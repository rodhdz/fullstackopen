import { useState } from 'react'

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const Random = () => {
  const max = 8
  const randomInt = Math.floor(Math.random() * max)
  console.log('random ' + randomInt)
  return randomInt
}

const Voting = (voted, selected) => {
  const copy = [...voted]
  copy[selected] += 1
  console.log(copy)
  return copy
}

const MostVoted = (voted) => {
  const largest = Math.max(...voted)
  console.log(largest)
  return voted.indexOf(largest)
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [voted, setVoted] = useState(Array(anecdotes.length).fill(0))

  return (
    <>
      <div>
        <h1>Anecdote of the day</h1>
        {anecdotes[selected]}
      </div>
      <div>has {voted[selected]} votes</div>
      <div>
        <Button onClick={() => setVoted(() => Voting(voted, selected))} text="vote" />
        <Button onClick={() => setSelected(Random)} text="next vote" />
      </div>
      <div>
        <h1>Anecdote with most votes</h1>
        <div>{anecdotes[MostVoted(voted)]}</div>
        <div>has {voted[MostVoted(voted)]} votes</div>
      </div>
    </>
  )
}

export default App
