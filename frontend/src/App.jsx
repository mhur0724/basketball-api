import './App.css';
import Players from './Pages/Players/Players.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from "./components/Layout";
import 'bootstrap/dist/css/bootstrap.min.css';
import Teams from './Pages/Teams/Teams';
import Team from './Pages/Team/Team';
import Index from './Pages/Index';
import FavoritePlayers from './Pages/favorite-players/FavoritePlayers';
import Login from './Pages/Login/Login';
import RegisterForm from './Pages/Register/Register'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Index/>}/>
          <Route path="/players" element={<Players/>}/>
          <Route path="/teams" element={<Teams/>}/>
          <Route path="/teams/:teamName" element={<Team/>}/>
          <Route path="/favorite-players" element={<FavoritePlayers/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<RegisterForm/>}/>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
