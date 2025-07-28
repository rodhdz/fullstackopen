import { useState } from 'react'

const Header = ({ text }) => {
  return <h1>{text}</h1>
}

const HandleClick = (props) => {
  console.log('clicked')
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  return (
    <div>
      <Header text='give feedback' />
      <button onClick={() => setGood(good + 1)}> good </button>
      <button onClick={() => setNeutral(neutral + 1)}> neutral </button>
      <button onClick={() => setBad(bad + 1)}> bad </button>
      <Header text='statistics' />
      <div> good {good}</div>
      <div> neutral {neutral} </div>
      <div> bad {bad} </div>
    </div>
  )
}

export default App
