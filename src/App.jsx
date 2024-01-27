import { Route, Routes } from 'react-router-dom'
import Home from './components/Home/Home.jsx'
import Dashboard from './components/Dashboard/Dashboard.jsx'

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/dashboard' element={<Dashboard />} />
    </Routes>
    </>
    
  )
}

export default App

