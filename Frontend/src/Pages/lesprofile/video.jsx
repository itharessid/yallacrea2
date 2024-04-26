import React, { useState, useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';
import './video.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEye, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
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
  const [likes, setLikes] = useState({});
  const [comments, setComments] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/video');
      setVideo(response.data);
      setVideoData(response.data);
      response.data.forEach(async (video) => {
        await fetchLikes(video.idVid);
        await fetchComments(video.idVid);
      });
    } catch (error) {
      console.error("Erreur lors de la récupération des vidéos :", error);
    }
  };

  const fetchLikes = async (videoId) => {
    try {
      const response = await axios.get(`http://localhost:3001/video/${videoId}/like`);
      setLikes(prevLikes => ({
        ...prevLikes,
        [videoId]: response.data.likes
      }));
    } catch (error) {
      console.error("Erreur lors de la récupération des likes :", error);
    }
  };
  
  const fetchComments = async (videoId) => {
    try {
      const response = await axios.get(`http://localhost:3001/video/commentaire/${videoId}`);
      setComments(prevComments => ({
        ...prevComments,
        [videoId]: response.data
      }));
    } catch (error) {
      console.error("Erreur lors de la récupération des commentaires :", error);
    }
  };

  const addComment = async (videoId, textComment, dateComment) => {
    try {
      await axios.post(`http://localhost:3001/video/commentaire`, {
        textComment,
        dateComment,
        idVideo: videoId
      });
      fetchComments(videoId);
    } catch (error) {
      console.error("Erreur lors de l'ajout du commentaire :", error);
    }
  };
  const handleDeleteComment = async (videoId, commentId) => {
    try {
      await axios.delete(`http://localhost:3001/video/commentaire/${videoId}/${commentId}`);
      // Mettre à jour les commentaires après suppression
      const updatedComments = comments[videoId].filter(comment => comment.idComment !== commentId);
      setComments(prevComments => ({
        ...prevComments,
        [videoId]: updatedComments
      }));
    } catch (error) {
      console.error("Erreur lors de la suppression du commentaire :", error);
    }
  };
  

  const handleLikeClick = async (videoId, event) => {
    if (event.detail === 2) {
      // Double clique
      const updatedLikes = (likes[videoId] || 0) - 2;
      setLikes(prevLikes => ({
        ...prevLikes,
        [videoId]: updatedLikes >= 0 ? updatedLikes : 0
      }));
      try {
        await axios.put(`http://localhost:3001/video/${videoId}/like`, { likes: updatedLikes });
      } catch (error) {
        console.error("Erreur lors de l'envoi du nombre de likes au backend :", error);
      }
      // Changer la couleur de l'icône en gris après un double-clic
      event.currentTarget.style.color = 'gray';
    } else {
      // Clic simple
      const updatedLikes = (likes[videoId] || 0) + 1;
      setLikes(prevLikes => ({
        ...prevLikes,
        [videoId]: updatedLikes
      }));
      try {
        await axios.put(`http://localhost:3001/video/${videoId}/like`, { likes: updatedLikes });
      } catch (error) {
        console.error("Erreur lors de l'envoi du nombre de likes au backend :", error);
      }
    }
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
      fetchData();
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
                  <a className="nav-link" href="/afvideo">Vidéos</a>
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
                <input
                  type="text"
                  placeholder="Rechercher des vidéos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
                  <button className="search-button">
                    <Link to="/upload" className="white-text">Ajouter une nouvelle vidéo</Link>
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
                              <button className="white-text">Modifier</button>
                            </Link>
                            <button onClick={() => handleDeleteClick(video)} className="white-text">Supprimer</button>
                          </div>
                          <div className="interaction-container">
                            {/* Conteneur pour les likes */}
                            <div className="like-container">
                              <FontAwesomeIcon 
                                icon={faThumbsUp} 
                                onClick={(event) => handleLikeClick(video.idVid, event)} 
                                style={{ color: likes[video.idVid] ? '#70218f' : 'gray' }} 
                              />
                              <span>{likes[video.idVid] || 0}</span>
                            </div>
                            
                            {/* Conteneur pour les commentaires */}
                            <div className="comment-container">
            {comments[video.idVid] && comments[video.idVid].map(comment => (
              <div key={comment.idComment} className="comment-item">
                <div>{comment.textComment}</div>
                <button onClick={() => handleDeleteComment(video.idVid, comment.idComment)} className="delete-button">Supprimer</button>
              </div>
            ))}
            <form onSubmit={(e) => {
              e.preventDefault();
              const textComment = e.target.elements.comment.value;
              const dateComment = new Date().toISOString();
              addComment(video.idVid, textComment, dateComment);
              e.target.reset();
            }}>
              <input type="text" name="comment" placeholder="Ajouter un commentaire" />
              <button type="submit" className="white-text">Ajouter</button>
            </form>
          </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
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
