import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Pages/Home.jsx";
import BoardSection from "./components/Pages/BoardSection.jsx";
import ContactsSection from "./components/Pages/ContactsSection.jsx";
import SettingsSection from "./components/Pages/SettingsSection.jsx";
import AccountSection from "./components/Pages/AccountsSection.jsx";
import AboutSection from "./components/Pages/AboutSection.jsx";
import SignUp from "./components/Pages/SignUp.jsx";
import LogIn from "./components/Pages/LogIn.jsx";
import Logout from './components/Pages/Logout.jsx';
import Todo from './components/FormComponents/ToDo.jsx';
import Notes from './components/FormComponents/Notes.jsx';
import IsLoggedIn from "./components/isLoggedIn.jsx";
import Loading from "./components/Loading/Loading.jsx";
import ErrorPage from "./components/Pages/ErrorPage.jsx";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Option 1: Use timer (simulate load)
    const timer = setTimeout(() => setLoading(false), 2000);

    // Option 2 (recommended): Wait until all assets are loaded
    // window.addEventListener("load", () => setLoading(false));

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />; // ✅ show your preloader
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<IsLoggedIn />} />
        <Route path="/dashboard" element={<BoardSection />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/login" element={<LogIn />} />
        <Route path='/todo' element={<Todo />} />
        <Route path='/notes' element={<Notes />} />
        <Route path="/about" element={<AboutSection />} />
        <Route path="/contacts" element={<ContactsSection />} />
        <Route path="/settings" element={<SettingsSection />} />
        <Route path="/accounts" element={<AccountSection />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
