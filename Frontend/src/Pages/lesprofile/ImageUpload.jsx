import React, { useState ,useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';


function ImageUpload() {
    const [File, setFile] = useState();
  
    const handleFile = (event) => {
      setFile(event.target.files[0]); // Utilisez setFile au lieu de setSelectedFile
    };
    useEffect(()=>{
      axios.get('http://localhost:3001/')
      .then(res=>console.log(res))
      .catch(err=>console.log(err));

    })
  
    const handleUpload = async () => {
      const formData = new FormData();
      formData.append('image', File);
      axios.post('http://localhost:3001/upload', formData)
          .then(res => {
         if (res.data.status === "Success") { // Correction de la vérification de la clé "status"
       console.log("Succeeded"); // Correction de la faute de frappe dans le message
       } else {
      console.log("Failed");
    }
  })
  .catch(err => console.log(err));
    };
  
    return (
      <div className="inner-banner">
        <section className="w3l-breadcrumb">
          <div className="container">
            <div className="col-lg-12 ">
              <div className="row">
                <div className="col-lg-13 col-13">
                  <div className="custom-block-icon-wrap">
                    <input type="file" onChange={handleFile} />
                    <button onClick={handleUpload}>Envoyer</button> {/* Corrigez la faute de frappe dans le texte du bouton */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

export default ImageUpload;
