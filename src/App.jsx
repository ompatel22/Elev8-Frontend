import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <h1 className='text-7xl'>Elev8</h1>
    <p className='text-'>Welcome To Elev8 where developers can grow all togeather and help each other elevate.</p>
    </>
  )
}

export default App
