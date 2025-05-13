import './App.css';
import Players from './Pages/Players.jsx';
import Player from './Pages/Player.jsx';
import EditPlayer from './Pages/EditPlayer.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddPlayer from './Pages/AddPlayer.jsx';
import Layout from "./components/Layout";
import 'bootstrap/dist/css/bootstrap.min.css';
import Teams from './Pages/Teams/Teams';
import Team from './Pages/Team/Team';
import Index from './Pages/Index';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Index/>}/>
          <Route path="/players" element={<Players/>} exact/>
          <Route path="/teams" element={<Teams/>} exact/>
          <Route path="/teams/:teamId" element={<Team/>} exact/>
          <Route path="/add" element={<AddPlayer/>} exact/>
          <Route path="/:playerId" element={<Player/>} />
          <Route path="/:playerId/edit" element={<EditPlayer/>} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
