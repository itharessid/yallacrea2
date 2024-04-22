import React, { useState, useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';
import './video.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEye, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function ConfirmationDialog({ showDeleteConfirmation, handleConfirmDelete, handleCancelDelete, videoToDelete }) {
  return (
    showDeleteConfirmation && (
      <div className="cardconfirmation-dialog">
        <div className="card-body confirmation-dialog-content">
          <p>Êtes-vous sûr de vouloir supprimer {videoToDelete.titre}?</p>
          <div className="confirmation-buttons">
            <button onClick={handleConfirmDelete} className="confirm-button">
              Oui
            </button>
            <button onClick={handleCancelDelete} className="cancel-button">
              Non
            </button>
          </div>
        </div>
      </div>
    )
  );
}

function Video() {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [videoToDelete, setVideoToDelete] = useState(null);
  const [video, setVideo] = useState([]);
  const [videoData, setVideoData] = useState([]);
  const [blurBackground, setBlurBackground] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [likes, setLikes] = useState({}); // État pour stocker le nombre de "J'aime" pour chaque vidéo
  const [comments, setComments] = useState({}); // État pour stocker les commentaires pour chaque vidéo

  useEffect(() => {
    fetchData(); // Appeler la fonction fetchData pour récupérer les données vidéo initiales
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/video');
      setVideo(response.data);
      setVideoData(response.data); // Mettre à jour videoData avec les données récupérées

      // Récupérer les commentaires pour chaque vidéo
      const commentsData = {};
      await Promise.all(
        response.data.map(async (video) => {
          const commentsResponse = await axios.get(`http://localhost:3001/video/${video.idVid}/comments`);
          commentsData[video.idVid] = commentsResponse.data;
        })
      );
      setComments(commentsData);
    } catch (error) {
      console.error("Erreur lors de la récupération des vidéos :", error);
    }
  };

  // Gérer le clic sur le bouton "J'aime"
  const handleLikeClick = (videoId) => {
    setLikes(prevLikes => ({
      ...prevLikes,
      [videoId]: (prevLikes[videoId] || 0) + 1
    }));
  };

  const handleDeleteClick = (video) => {
    setVideoToDelete(video);
    setShowDeleteConfirmation(true);
    setBlurBackground(true);
  };

  const handleCancelDelete = () => {
    setVideoToDelete(null);
    setShowDeleteConfirmation(false);
    setBlurBackground(false);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/video/${videoToDelete.idVid}`);
      setShowDeleteConfirmation(false);
      setVideoToDelete(null);
      setBlurBackground(false);
      fetchData(); // Actualiser la liste des vidéos après la suppression
    } catch (error) {
      console.error("Erreur lors de la suppression de la vidéo :", error);
    }
  };


  const filteredVideo = searchTerm
    ? video.filter((video) => video.titre.toLowerCase() === searchTerm.toLowerCase())

    : video;

  return (
    <div>
      <header id="site-header" className="fixed-top">
      <div className={`container ${blurBackground ? 'blur-background' : ''}`} style={{ display: 'flex', flexWrap: 'wrap' }}>
          <nav className="navbar navbar-expand-lg stroke">
            <h1>
              <a className="navbar-brand" href="index.html">
                <img className="img-fluid" src="src/assets/images/yallalogo.png" alt="" style={{ maxWidth: '100px' }} />
              </a>
            </h1>

            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-lg-auto">
                <li className="nav-item active">
                  <a className="nav-link" href="/">Accueil <span className="sr-only">(current)</span></a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="apropos">A propos</a>
                </li>
                <li className="nav-item dropdown">
                  <Dropdown>
                    <Dropdown.Toggle id="navbarDropdown">
                      Formation
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item href="/Accelerer">Cours Accéléré</Dropdown.Item>
                      <Dropdown.Item href="/complet">Cours Complet</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="createur">Créateur</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/profiluser">Mon Profil</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/video">Vidéos</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="contact">Contact</a>
                </li>
                <div className="search-right">
                  <a href="preInscri" className="btn button-style">S'inscrire</a>
                </div>
              </ul>
            </div>
          </nav>
        </div>
      </header>

      <section className="w3l-breadcrumb">
      <div className="container">
        <div className="col-xl-3 mb-20">
            <div className="card-box-Etud height-100-p widget-style1">
              <div className="d-flex flex-wrap align-items-center">
                <div className="widget-data">
                  <div className="weight-600 font-14 text-purple text-center text-nowrap">Vidéos</div>
                  <div className="h6 mb-0 text-center">{filteredVideo.length}</div> 
                </div>
                <img src="src/assets/images/video.png" alt="" style={{ marginLeft: '40px' }} />
              </div>
            </div>
          </div>
          <div className="container-fluid">
            <section className="card-section d-flex justify-content-center align-items-center">
              <div className="container">
              {/* Barre de recherche */}
              <input
                type="text"
                placeholder="Rechercher des vidéos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input" // Ajout de la classe CSS personnalisée
              />
                  <button className="search-button">
                    <Link to="/upload">Ajouter une nouvelle vidéo</Link>
                  </button>
                  <section className="w3l-teams-32-main py-5">
            <div className="teams-32 py-md-4">
                <div className={`container ${blurBackground ? 'blur-background' : ''}`} style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {filteredVideo.map(video => (
                        <div key={video.idVid} style={{ flexBasis: '33%', padding: '10px' }}>
                            <div className="heading">{video.titre}</div>
                            <video controls className="cardv-video">
                              <source src={`http://localhost:3001/video/${video.video}`} type="video/mp4" />
                            </video>
                            <div className="description">
                                {video.description}<br />
                                {formatDate(video.date)}
                            </div>
                            <div className="button-container">
                              <Link to={`/updateVideo/${video.idVid}`}>
                                <button>Modifier</button>
                              </Link>
                              <button onClick={() => handleDeleteClick(video)}>Supprimer</button>
                            </div>
                            <div className="like-icon-container" onClick={() => handleLikeClick(video.idVid)}>
                              <FontAwesomeIcon icon={faThumbsUp} />
                                <span>{likes[video.idVid] || 0}</span> {/* Afficher le nombre de "J'aime" */}
                            </div>
                            <div className="comments-container">
                              <h4>Commentaires</h4>
                              {comments[video.idVid] && comments[video.idVid].map(comment => (
                                <div key={comment.id} className="comment">
                                  <p>{comment.content}</p>
                                  <p>Par: {comment.author}</p>
                                </div>
                              ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* Affichage du dialogue de confirmation de suppression */}
            <ConfirmationDialog
                showDeleteConfirmation={showDeleteConfirmation}
                handleConfirmDelete={handleConfirmDelete}
                handleCancelDelete={handleCancelDelete}
                videoToDelete={videoToDelete}
            />
        </section>
              </div>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Video;
