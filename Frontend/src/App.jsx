import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css'

import PreInscriptionEtud from './Pages/Admin/PreInscriptions/preInscriptionEtud.jsx';
import PreInscriptionCrea from './Pages/Admin/PreInscriptions/preInscriptionsCrea.jsx';
import About from './Pages/About/apropos';
import Partencop from './Pages/About/partencop.jsx';

import Home from './Pages/Home/acceuil';
import Expcomp from './Pages/Home/expertComp.jsx';
import Contact from './Pages/Contact/contact';
import Formation from './Pages/Formation/formation';
import Createur  from './Pages/Createur/createur';
import Crea from './Pages/Createur/crea.jsx'
import Acceler from'./Pages/Accelere/accelere';
import Complet  from './Pages/CourComplet/complet.jsx';
import Video from './Pages/lesprofile/video.jsx';

import Sidbar from './Pages/Admin/Sidbar/Adminsidbar.jsx';
import Dashbord from './Pages/Admin/dashbord';
import Bienvenue from './Pages/Admin/Bienvenue/bienvenue';
import Etudiants from './Pages/Admin/Etudiantes/etudiant';
import Calendrier from './Pages/Admin/calendrier/calendrier';
import Event from './Pages/Admin/evenementes/event.jsx';

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
 import ProfilePartenaire from './Pages/Admin/Partenaire/profilparte.jsx';
 import Nvexpert from './Pages/Admin/Experts/nvexpert.jsx';
 import Profilexperts from './Pages/Admin/Experts/profilexperts.jsx';
 import Emplois from './Pages/emploi/emplois.jsx';
import Nvemplois from './Pages/Admin/emploidutemps/nvemplois.jsx';
import Preseneteil from './Pages/emploi/preseneteil.jsx';
import Enligne from './Pages/emploi/enligne.jsx';
import EditEmplois from'./Pages/Admin/emploidutemps/editemplois.jsx';
import Domaines from './Pages/Admin/Domaines/domaines.jsx';
import NDomaine from './Pages/Admin/Domaines/NDomaine.jsx';
import Emploiup from './Pages/Admin/emploidutemps/emploiup.jsx';
import EventCompt from './Pages/About/eventcompt.jsx';
import UploadVideo from './Pages/lesprofile/uplodvideo.jsx';
import UpdateVideo from './Pages/lesprofile/updateVideo.jsx';
import Certif from './Pages/Admin/Certification/certif.jsx';






function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/" element={<Expcomp />} />
        <Route path="/apropos" element={<About />} />
        <Route path="/apropos" element={<Partencop />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/createur" element ={< Createur/>} />
        <Route path="/crea" element ={< Crea />} />
        <Route path="/detail" element ={<Detail/>} />
        <Route path="/formation" element={<Formation/>} />
        <Route path="/Accelerer" element={< Acceler />} />
        <Route path="/complet" element={< Complet />} />
        <Route path="/gprofil" element={< Gprofile/>} />
        <Route path="/profiluser" element={< Profiluser/>} />
        <Route path="/IMG" element={<ImageUpload />} />
        <Route path="/video/:id/like" element={<Videouser />}/>
        <Route path="/video/:id/commentaire" element={<Videouser/>}/>
        <Route path="/afvideo" element={<Video />}/>
        <Route path="/emploi" element={<Emplois/>}/>
        <Route path="/pres" element={<Preseneteil/>}/>
        <Route path="/enligne" element={<Enligne/>}/>
        

        
      
        <Route path="/sidbar" element={<Sidbar />} />
        <Route path="/preinscri" element={< PreInscri/>} />
        <Route path="/preinscriEtud" element={<PreInscriEtud/>} />
        <Route path="/connexion" element={<Connexion/>} />




        <Route path="/dashbord" element={<Dashbord />} />
        <Route path="/bienvenue" element={<Bienvenue/>} />
        <Route path="/etudiants" element={<Etudiants/>} /> 
        <Route path="/createures" element={<Createures/>} /> 

        <Route path="/nouveauEtud" element={<NouveauEtud/>} />  
        <Route path="/nouveauCrea" element={<NouveauCrea/>} />  
        <Route path="/login" element={<Login/>} /> 
        <Route path="/calendrier" element={<Calendrier/>} /> 
        <Route path="/evenements" element={<Evenements/>} /> 
        <Route path="/ProfilEtud/:id" element={<ProfileEtud/>} /> 
        <Route path="/ProfilCrea/:id" element={<ProfileCrea/>} /> 
        <Route path="/nouveauEvent" element={<NouveauEvent/>} /> 
        <Route path="/expert" element={<Experts />}/>
        <Route path="/Nvexpert" element={<Nvexpert />}/>
        <Route path="/profilexp/:id"  element={<Profilexperts />}/>
        <Route path="/profilpart/:id" element={<ProfilePartenaire/>}/>
        <Route path="/partenaire" element={<Partenaire/>}/> 
        <Route path="/Nvpartenaire" element={<Nouveaupartenaire/>} /> 
        <Route path="/domaines" element={<Domaines/>} /> 
        <Route path="/NDomaine" element={<NDomaine/>} /> 
        <Route path="/uploadE" element={<Emploiup/>} /> 

        <Route path="/nvemplois" element={<Nvemplois/>} /> 
        <Route path="/editemplois/:id" element={<EditEmplois/>} /> 

        <Route path="/preInscriptionEtud" element={<PreInscriptionEtud/>} /> 
        <Route path="/preInscriptionCrea" element={<PreInscriptionCrea/>} /> 
        <Route path="/event/:id" element={<Event/>}/>
        <Route path="/apropos" element={<EventCompt/>}/>
        <Route path="/upload" element={<UploadVideo/>}/>
        <Route path="/updateVideo/:id" element={<UpdateVideo/>}/>
        <Route path="/certif" element={<Certif/>}/>
         </Routes>
         </BrowserRouter>
         </>
  )
}

export default App
