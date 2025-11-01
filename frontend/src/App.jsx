import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Pages/Home.jsx";
import BoardSection from "./components/Pages/BoardSection.jsx";
import ContactsSection from "./components/Pages/ContactsSection.jsx";
import SettingsSection from "./components/Pages/SettingsSection.jsx";
import AccountSection from "./components/Pages/AccountsSection.jsx";
import AboutSection from "./components/Pages/AboutSection.jsx";
import SignUp from "./components/Pages/Auth/SignUp.jsx";
import LogIn from "./components/Pages/Auth/LogIn.jsx";
import Todo from "./components/Pages/ToDoSection.jsx";
import Notes from "./components/Pages/NotesSection.jsx";
import IsLoggedIn from "./components/FormComponents/IsLoggedIn.jsx";
import Loading from "./components/FormComponents/Loading/Loading.jsx";
import ErrorPage from "./components/FormComponents/ErrorPage.jsx";
import ProtectedRoute from "./Routes/ProtectedRoute.jsx";
import PublicRoute from "./Routes/PublicRoute.jsx";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loading />;

  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/signup"
        element={
          <PublicRoute>
            <SignUp />
          </PublicRoute>
        }
      />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <LogIn />
          </PublicRoute>
        }
      />

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <IsLoggedIn />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <BoardSection />
          </ProtectedRoute>
        }
      />
      <Route
        path="/todo"
        element={
          <ProtectedRoute>
            <Todo />
          </ProtectedRoute>
        }
      />
      <Route
        path="/notes"
        element={
          <ProtectedRoute>
            <Notes />
          </ProtectedRoute>
        }
      />
      <Route
        path="/about"
        element={
          <ProtectedRoute>
            <AboutSection />
          </ProtectedRoute>
        }
      />
      <Route
        path="/contacts"
        element={
          <ProtectedRoute>
            <ContactsSection />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <SettingsSection />
          </ProtectedRoute>
        }
      />
      <Route
        path="/accounts"
        element={
          <ProtectedRoute>
            <AccountSection />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
