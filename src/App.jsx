import { Route, Routes } from 'react-router-dom'
import Home from './components/Home/Home.jsx'
import Dashboard from './components/Dashboard/Dashboard.jsx'
import ModalPopup from './ModalPopup.jsx'
import FormNavbar from './components/FormNavbar/FormNavbar.jsx'
import ListContainer from './components/ListContainer/ListContainer.jsx'
import Sidebar from './components/Sidebar/Sidebar.jsx'
import Settings from './components/Settings/Settings.jsx'

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='dashboard' element={<ListContainer />} >
        <Route path='board' element={<Dashboard/>} />
        <Route path='setting' element={<Settings />} />
      </Route>
  
    </Routes>
    </>
    
  )
}

export default App

