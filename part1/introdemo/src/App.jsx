import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const Hello = (props) => {
  console.log(props)
  return (
    <div>
      <p>Hello {props.name} you're {props.age} years old.</p>
    </div>
  )
}

function App() {
  const [count, setCount] = useState(0)
  console.log('Hello from Component')
  const now = new Date()
  const Name = "Peter"
  const age = 10

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
        <div>
          <p> Greetings</p>
          <Hello name="George" age={26 + 10} />
          <Hello name={Name} age={age} />
        </div>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
