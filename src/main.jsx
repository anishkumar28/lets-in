import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, RouterProvider, Routes, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import Home from './components/Home/Home.jsx'
import Dashboard from './components/Dashboard/Dashboard.jsx'
import Navbar from './components/Navbar/Navbar.jsx'


  ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
  )
