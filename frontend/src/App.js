import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Home from './Pages/home/home';
import RegisterP from './Pages/pro/register_pro/registerP'
import RegisterU from './Pages/utilisateur/register_utilisateur/registerU'
import HomePro from './Pages/pro/home_pro/homePro.jsx';
import LoginPro from './Pages/pro/login_pro/loginPro.jsx'
import LoginUtilisateur from './Pages/utilisateur/login_utilisateur/loginUtilisateur.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register_pro" element={<RegisterP />} />
        <Route path="/register_utilisateur" element={<RegisterU />} />
        <Route path="/homePro" element={<HomePro />} />
        <Route path="/Login_pro" element={<LoginPro />} />
        <Route path="/Login_utilisateur" element={<LoginUtilisateur />} />
    </Routes>
  </Router>
  );
}

export default App;
