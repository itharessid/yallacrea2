import { useState } from 'react'
import About from './Pages/About/apropos';
import Home from './Pages/Home/acceuil';
import Contact from './Pages/Contact/contact';
import Formation from './Pages/Formation/formation';
import Createur  from './Pages/Createur/createur';
import Acceler from'./Pages/Accelere/accelere';
import Complet  from './Pages/CourComplet/complet.jsx'

import Sidbar from './Pages/Admin/Sidbar/Adminsidbar.jsx';
import Dashbord from './Pages/Admin/dashbord';
import Bienvenue from './Pages/Admin/Bienvenue/bienvenue';
import Etudiants from './Pages/Admin/Etudiantes/etudiant';
import Calendrier from './Pages/Admin/calendrier/calendrier';
import Event from './Pages/Admin/evenementes/evenements';



import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Home />} />
        <Route path="/apropos" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/createur" element ={<Createur/>} />
        <Route path="/formation" element={<Formation/>} />
        <Route path="/Accelerer" element={< Acceler />} />
         <Route path="/complet" element={< Complet />} />





        <Route path="/sidbar" element={<Sidbar />} />
        <Route path="/dashbord" element={<Dashbord />} />
        <Route path="/bienvenue" element={<Bienvenue/>} />
        <Route path="/etudiants" element={<Etudiants/>} /> 
        <Route path="/calendrier" element={<Calendrier />} />
        <Route path="/Event" element={<Event/>} />
        
    </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
