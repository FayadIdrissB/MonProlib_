import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Home from './Pages/home/home';
import RegisterP from './Pages/pro/register_pro/registerP'
import RegisterU from './Pages/user/register_utilisateur/registerU.jsx'
import HomePro from './Pages/pro/home_pro/homePro.jsx';
import LoginPro from './Pages/pro/login_pro/loginPro.jsx'
import LoginUtilisateur from './Pages/user/login_utilisateur/loginUtilisateur.jsx';
import WelcomePro from './Pages/pro/welcome_pro/welcomePro.jsx';
import WelcomeUser from './Pages/user/welcome_user/welcomeUser.jsx';

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
        <Route path="/welcomePro" element={<WelcomePro />} />
        <Route path="/welcomeUser" element={<WelcomeUser />} />
    </Routes>
  </Router>
  );
}

export default App;
