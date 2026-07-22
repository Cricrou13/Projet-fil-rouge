import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <h1>Plateforme de Réservation</h1>
      <p>Bienvenue sur mon projet fil rouge.</p>
      <button onClick={() => setCount(count + 1)}>
        Compteur : {count}
      </button>
    </div>
  )
}

export default App