import { Route, Routes } from 'react-router-dom'
import Home from './components/Pages/Home.jsx'
import BoardSection from './components/Pages/BoardSection.jsx'
import ContactsSection from './components/Pages/ContactsSection.jsx'
import SettingsSection from './components/Pages/SettingsSection.jsx'
import AccountSection from './components/Pages/AccountsSection.jsx'
import SignUp from './components/Pages/SignUp.jsx'
import LogIn from './components/Pages/LogIn.jsx'
import IsLoggedIn from './components/isLoggedIn.jsx'


function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<IsLoggedIn />} />
      <Route path='dashboard' exact element={<BoardSection/>}/>
        <Route path='/signup' exact element={<SignUp/>}/>
        <Route path='/login' exact element={<LogIn/>}/>
        <Route path='/contacts' exact element={<ContactsSection/>}/>
        <Route path='/settings' exact element={<SettingsSection />}/>
        <Route path='/accounts' exact element={<AccountSection/>}/>
    </Routes>
    
    </>
    
  )
}

export default App

