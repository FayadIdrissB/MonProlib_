import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Home from './Pages/home/home';
import HomePro from './Pages/pro/home_pro/homePro.jsx';
import RegisterPro from './Pages/pro/register_pro/registerPro'
import RegisterUser from './Pages/user/register_user/registerUser.jsx'
import LoginPro from './Pages/pro/login_pro/loginPro.jsx'
import LoginUser from './Pages/user/login_user/loginUser.jsx';
import WelcomePro from './Pages/pro/welcome_pro/welcomePro.jsx';
import WelcomeUser from './Pages/user/welcome_user/welcomeUser.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register_pro" element={<RegisterPro />} />
        <Route path="/register_user" element={<RegisterUser />} />
        <Route path="/home_pro" element={<HomePro />} />
        <Route path="/Login_pro" element={<LoginPro />} />
        <Route path="/Login_user" element={<LoginUser />} />
        <Route path="/welcome_pro" element={<WelcomePro />} />
        <Route path="/welcome_user" element={<WelcomeUser />} />
    </Routes>
  </Router>
  );
}

export default App;
