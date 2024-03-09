import { Route, Routes } from 'react-router-dom'
import Home from './components/Home/Home.jsx'
import Sidebar from './components/Sidebar/Sidebar.jsx'
import BoardSection from './components/Pages/BoardSection.jsx'
import ContactsSection from './components/Pages/ContactsSection.jsx'
import SettingsSection from './components/Pages/SettingsSection.jsx'
import AccountSection from './components/Pages/AccountsSection.jsx'


function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='dashboard' exact element={<BoardSection/>}/>
        <Route path='/contacts' exact element={<ContactsSection/>}/>
        <Route path='/settings' exact element={<SettingsSection />}/>
        <Route path='/accounts' exact element={<AccountSection/>}/>
    </Routes>
    </>
    
  )
}

export default App

