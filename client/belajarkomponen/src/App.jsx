import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './assets/components/header'
import Button from './assets/components/button'
import Card from './assets/components/card'
function App() {
  const [count, setCount] = useState(0)

const fromChild = (data) => {
  console.log(data);
}

  return (
    <>
    <Header viteLogo={viteLogo} reactLogo={reactLogo} fromChild={fromChild}/>
      <h1>Vite + React</h1>
      <Card count={count} setCount={setCount}/>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
