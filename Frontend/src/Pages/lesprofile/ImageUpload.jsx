import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';


function ImageUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageSrc, setImageSrc] = useState('src/assets/images/c1.jpg'); // Source de l'image initiale

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleImageUpload = async () => {
    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await axios.post('http://votre-serveur-url/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setImageSrc(response.data.imageUrl);
    } catch (error) {
      console.error('Erreur lors du téléchargement de l\'image :', error);
    }
  };

  const handleAddText = () => {
    // Gérer l'ajout de texte à l'image
    // Ceci est une fonction de substitution, vous pouvez implémenter votre propre logique ici
  };

  return (
    <div className="inner-banner">
      <section className="w3l-breadcrumb">
    <div className="container">
   <div className="row justify-content-center">
   <div className="col-lg-12 ">
    <div className="row">
    <div className="col-lg-3 col-13">
      <div className="custom-block-icon-wrap">
        <div className="custom-block-image-wrap custom-block-image-detail-page">
          <img src={imageSrc} className="custom-block-image img-fluid" alt=""/>
        </div>
        <div>
        <input type="file" onChange={handleFileChange} />
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={handleAddText}>
              <FontAwesomeIcon icon={faEdit} /> {/* Icône d'édition */}
            </button>        </div>
        </div>
      </div>
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
