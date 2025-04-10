import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Pages/home/home";
import HomePro from "./Pages/pro/home_pro/homePro.jsx";
import RegisterPro from "./Pages/pro/register_pro/registerPro";
import RegisterUser from "./Pages/user/register_user/registerUser.jsx";
import Login from "./Pages/login/login.jsx";
import WelcomePro from "./Pages/pro/welcome_pro/welcomePro.jsx";
import WelcomeUser from "./Pages/user/welcome_user/welcomeUser.jsx";
import CalendarPro from "./Pages/pro/calendar_pro/calendarPro";
import AnnoncePro from "./Pages/pro/annonce_pro/annoncePro.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register_pro" element={<RegisterPro />} />
        <Route path="/register_user" element={<RegisterUser />} />
        <Route path="/home_pro" element={<HomePro />} />
        <Route path="/calendar_pro" element={<CalendarPro />} />
        <Route path="/annonce_pro" element={<AnnoncePro />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/welcome_pro/:id" element={<WelcomePro />} />
        <Route path="/welcome_user/:id" element={<WelcomeUser />} />
      </Routes>
    </Router>
  );
}

export default App;
