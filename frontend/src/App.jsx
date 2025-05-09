import './App.css';
import Players from './Pages/Players.jsx';
import Player from './Pages/Player.jsx';
import EditPlayer from './Pages/EditPlayer.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddPlayer from './Pages/AddPlayer.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/players' element={<Players/>} exact/>
        <Route path='/players/add' element={<AddPlayer/>} exact/>
        <Route path="/players/:playerId" element={<Player/>} />
        <Route path="/players/:playerId/edit" element={<EditPlayer/>} />
      </Routes>
    </Router>
  )
}

export default App
