import { useState } from 'react'
import reactLogo from '../assets/react.svg'
// import { StaticSSR } from './StaticSSR'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const onClick = () => setCount((count) => count + 1)

  return <>    
      <section>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </section>

      <h1>Vite + React</h1>

      <div className="card">
        <button onClick={onClick}>count is {count}</button>
      </div>
   </>
}

export default App
