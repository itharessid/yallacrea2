import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css'

import About from './Pages/About/apropos';
import Home from './Pages/Home/acceuil';
import Contact from './Pages/Contact/contact';
import Formation from './Pages/Formation/formation';
import Createur  from './Pages/Createur/createur';
import Acceler from'./Pages/Accelere/accelere';
import Complet  from './Pages/CourComplet/complet.jsx';

import Sidbar from './Pages/Admin/Sidbar/Adminsidbar.jsx';
import Dashbord from './Pages/Admin/dashbord';
import Bienvenue from './Pages/Admin/Bienvenue/bienvenue';
import Etudiants from './Pages/Admin/Etudiantes/etudiant';
import Calendrier from './Pages/Admin/calendrier/calendrier';
import Event from './Pages/Admin/evenementes/evenements';
import Detail from './Pages/detailcrea/detail.jsx';




import Createures from './Pages/Admin/Createures/createures.jsx';
import NouveauEtud from './Pages/Admin/Etudiantes/nouveauEtud.jsx';
import NouveauCrea from './Pages/Admin/Createures/nouveauCrea.jsx';
import Login from './Pages/Admin/ExtraPages/login.jsx';
import Evenements from './Pages/Admin/evenementes/evenements';
import ProfileEtud from './Pages/Admin/Etudiantes/profilEtud.jsx';
import ProfileCrea from './Pages/Admin/Createures/profilCrea.jsx';
import PreInscri from './Pages/Formulaire/preInscri.jsx';
import PreInscriEtud from './Pages/Formulaire/preInscriEtud.jsx';
import Connexion from './Pages/Formulaire/connexion.jsx';
import NouveauEvent from './Pages/Admin/evenementes/nouveauEvent.jsx';
import Gprofile from './Pages/lesprofile/gprofile.jsx';
import Profiluser from './Pages/lesprofile/profileuser.jsx';
import ImageUpload from './Pages/lesprofile/ImageUpload.jsx';
import Videouser from './Pages/lesprofile/videouser.jsx';
 import Partenaire from './Pages/Admin/Partenaire/partenaire.jsx';
 import Experts from './Pages/Admin/Experts/experts.jsx';
 import Nouveaupartenaire from './Pages/Admin/Partenaire/nouveaupartenaire.jsx';
 import Nvexpert from './Pages/Admin/Experts/nvexpert.jsx';
 import Profilexperts from './Pages/Admin/Experts/profilexperts.jsx';



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
        <Route path="/detail" element ={<Detail/>} />
        <Route path="/formation" element={<Formation/>} />
        <Route path="/Accelerer" element={< Acceler />} />
        <Route path="/complet" element={< Complet />} />
        <Route path="/gprofil" element={< Gprofile/>} />
        <Route path="/profiluser" element={< Profiluser/>} />
        <Route path="/IMG" element={<ImageUpload />} />
        <Route path="/video" element={<Videouser />}/>



        





        <Route path="/sidbar" element={<Sidbar />} />
        <Route path="/preinscri" element={< PreInscri/>} />
        <Route path="/preinscriEtud" element={<PreInscriEtud/>} />
        <Route path="/connexion" element={<Connexion/>} />



        <Route path="/dashbord" element={<Dashbord />} />
        <Route path="/bienvenue" element={<Bienvenue/>} />
        <Route path="/etudiants" element={<Etudiants/>} /> 
        <Route path="/Event" element={<Event/>} />
        <Route path="/createures" element={<Createures/>} />      
        <Route path="/nouveauEtud" element={<NouveauEtud/>} />  
        <Route path="/nouveauCrea" element={<NouveauCrea/>} />  
        <Route path="/login" element={<Login/>} /> 
        <Route path="/calendrier" element={<Calendrier/>} /> 
        <Route path="/evenements" element={<Evenements/>} /> 
        <Route path="/ProfilEtud/:id" element={<ProfileEtud/>} /> 
        <Route path="/ProfilCrea" element={<ProfileCrea/>} /> 
        <Route path="/nouveauEvent" element={<NouveauEvent/>} /> 
        <Route path="/expert" element={<Experts />}/>
        <Route path="/Nvexpert" element={<Nvexpert />}/>
        <Route path="/profilexp/:id"  element={<Profilexperts />}/>

        <Route path="/partenaire" element={<Partenaire/>}/> 
        <Route path="/Nvpartenaire" element={<Nouveaupartenaire/>} /> 





    </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
