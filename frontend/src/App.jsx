import { useEffect, useState } from 'react'
import './App.css';
import PlayersList from './components/PlayersList.jsx';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    try {
      fetch('http:localhost:3000/players')
      .then((response) => response.text())
      .then(data => console.log(data))
      .catch(err => console.log(err));
    } catch(err) {
      console.log(err);
    }
  }, [])
  return (
    <>
    <PlayersList></PlayersList>
    </>
  )
}

export default App
