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
  const [videos, setVideos] = useState([]);
  const [showReplyForm, setShowReplyForm] = useState(null);
  const idCrea = localStorage.getItem('userId'); // Récupère l'ID du créateur depuis le stockage local
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [videoToDelete, setVideoToDelete] = useState(null);
  const [blurBackground, setBlurBackground] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [likes, setLikes] = useState({});
  const [comments, setComments] = useState({});
  const [selectedComment, setSelectedComment] = useState(null); // État pour stocker l'ID du commentaire sélectionné


  useEffect(() => {
    const fetchCreatorVideos = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/createur/videos/${idCrea}`);
        setVideos(response.data);
        // Récupérer le nombre de likes pour chaque vidéo
        response.data.forEach(video => fetchLikes(video.idVid));
        // Récupérer les commentaires pour chaque vidéo
        response.data.forEach(video => fetchComments(video.idVid, idCrea));
      } catch (error) {
        console.error("Erreur lors de la récupération des vidéos du créateur :", error);
      }
    };
    if (idCrea) {
      fetchCreatorVideos();
    }
  }, [idCrea]);

  const fetchLikes = async (idVid) => {
    try {
      const response = await axios.get(`http://localhost:3001/video/${idVid}/like`);
      setLikes(prevLikes => ({
        ...prevLikes,
        [idVid]: response.data.likes
      }));
    } catch (error) {
      console.error("Erreur lors de la récupération des likes :", error);
    }
  };

// Mettez à jour fetchComments pour inclure la récupération des réponses
const fetchComments = async (idVid, idCrea) => {
  try {
    const response = await axios.get(`http://localhost:3001/video/commentaire/${idVid}/${idCrea}`);
    // Mettez à jour la structure des commentaires pour inclure les réponses
    const updatedComments = response.data.map(comment => ({
      ...comment,
      reponse: '', // Ajoutez une propriété pour stocker la réponse
      replies: [] // Ajoutez un tableau pour stocker les réponses à ce commentaire
    }));
    setComments(prevComments => ({
      ...prevComments,
      [idVid]: updatedComments
    }));
  } catch (error) {
    console.error("Erreur lors de la récupération des commentaires :", error);
  }
};
  
  const handleAddComment = async (idVid, textComment) => {
    try {
      const idCrea = localStorage.getItem('userId'); // Récupère l'ID du créateur depuis le stockage local
      const response = await axios.post(`http://localhost:3001/video/commentaire/${idVid}/${idCrea}`, { textComment });
      // Rafraîchir les commentaires après l'ajout
      fetchComments(idVid);
    } catch (error) {
      console.error("Erreur lors de l'ajout du commentaire :", error);
    }
  };
  const handleDeleteComment = async (idVid, idComment) => {
    try {
      await axios.delete(`http://localhost:3001/video/commentaire/${idVid}/${idComment}/${idCrea}`); // Ajoutez idCrea si nécessaire
      // Mettre à jour les commentaires après suppression
      const updatedComments = comments[idVid].filter(comment => comment.idComment !== idComment);
      setComments(prevComments => ({
        ...prevComments,
        [idVid]: updatedComments
      }));
    } catch (error) {
      console.error("Erreur lors de la suppression du commentaire :", error);
    }
  };
  

  const handleLikeClick = async (idVid, event) => {
    if (event.detail === 2) {
      // Double clique
      const updatedLikes = (likes[idVid] || 0) - 2;
      setLikes(prevLikes => ({
        ...prevLikes,
        [idVid]: updatedLikes >= 0 ? updatedLikes : 0
      }));
      try {
        await axios.put(`http://localhost:3001/video/${idVid}/like`, { likes: updatedLikes });
      } catch (error) {
        console.error("Erreur lors de l'envoi du nombre de likes au backend :", error);
      }
      // Changer la couleur de l'icône en gris après un double-clic
      event.currentTarget.style.color = 'gray';
    } else {
      // Clic simple
      const updatedLikes = (likes[idVid] || 0) + 1;
      setLikes(prevLikes => ({
        ...prevLikes,
        [idVid]: updatedLikes
      }));
      try {
        await axios.put(`http://localhost:3001/video/${idVid}/like`, { likes: updatedLikes });
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

  // Fonction pour vérifier si un mot contient une syllabe spécifique
  const containsSyllable = (word, syllable) => {
    // Divise le mot en syllabes
    const syllables = word.split('-'); // Adapter cette logique selon la structure des mots dans votre cas
    // Vérifie si l'une des syllabes correspond à la syllabe spécifiée
    return syllables.some(s => s.includes(syllable));
  };
  const filteredVideo = searchTerm
    ? videos.filter((video) => containsSyllable(video.titre.toLowerCase(), searchTerm.toLowerCase()))
    : videos;
    
    const handleReplyComment = async (idVid, idParent, replyText) => {
      try {
        const idCrea = localStorage.getItem('userId');
        const response = await axios.post(`http://localhost:3001/video/commentaire/${idVid}/${idCrea}`, { textComment: replyText, idParent });
        fetchComments(idVid, idCrea); // Rafraîchir les commentaires après l'ajout de la réponse
      } catch (error) {
        console.error("Erreur lors de l'ajout de la réponse au commentaire :", error);
      }
    };
    
// Frontend (React)

// Dans la fonction handleAddReply
const handleAddReply = async (idVid, parentId, replyText) => { // Renommez idParent en parentId
  try {
    const idCrea = localStorage.getItem('userId');
    const response = await axios.post(`http://localhost:3001/video/commentaire/${idVid}/${idCrea}`, { textComment: replyText, idRepondre: parentId }); // Utilisez idRepondre pour spécifier le commentaire parent
    fetchComments(idVid, idCrea); // Rafraîchir les commentaires après l'ajout de la réponse
  } catch (error) {
    console.error("Erreur lors de l'ajout de la réponse au commentaire :", error);
  }
};
// Fonction pour afficher les réponses d'un commentaire lorsqu'il est sélectionné
const handleShowReplies = (idComment) => {
  // Mettre à jour l'état avec l'ID du commentaire sélectionné
  setSelectedComment(idComment);
  // Récupérer les réponses du commentaire sélectionné
  fetchReplies(video.idVid, idComment);
};

// Fonction pour masquer les réponses et réinitialiser l'état
const handleHideReplies = () => {
  // Réinitialiser l'état pour masquer les réponses
  setSelectedComment(null);
  // Réinitialiser les réponses
  setReplies([]);
};

// Dans la section où vous affichez les commentaires
{comments[videos.idVid] &&
  comments[videos.idVid].map((comment) => (
    <div key={comment.idComment} className="comment-item">
      <div className="comment-content">{comment.textComment}</div>
      <div className="comment-actions">
        {/* Bouton pour afficher les réponses */}
        <button
          onClick={() => handleShowReplies(comment.idComment)}
          className="show-replies-button"
        >
          Afficher les réponses
        </button>
      </div>
      {/* Afficher les réponses si le commentaire est sélectionné */}
      {selectedComment === comment.idComment && (
        <div className="replies-container">
          {replies.map((reply) => (
            <div key={reply.idComment} className="reply-item">
              <div className="reply-content">{reply.textComment}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  ))}


    
    
    

  return (
    <div>
      <header id="site-header" className="fixed-top">
        <div className="container">
          <nav className="navbar navbar-expand-lg stroke">
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-lg-auto">
                <li className="nav-item active">
                  <a className="nav-link" href="/">Acceuil <span className="sr-only">(current)</span></a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="apropos">Apropos</a>
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
                  <Link to={`/profiluser/${idCrea}`} className="nav-link">Mon Profil</Link> {/* Utilisez Link */}
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/afvideo">Vidéos</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="contact">Contact</a>
                </li>
                <div className="search-right">
                  <a href="/" className="btn button-style">Sortir</a>

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
                            <source src={`http://localhost:3001/videos/${video.video}`} type="video/mp4" />
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
                            {comments[video.idVid] &&
  comments[video.idVid].map((comment) => (
    <div key={comment.idComment} className="comment-item">
      <div className="comment-content">{comment.textComment}</div>
      <div className="comment-actions">
        <button
          onClick={() => handleDeleteComment(video.idVid, comment.idComment)}
          className="delete-button"
        >
          Supprimer
        </button>
        <button
  onClick={() => setShowReplyForm(comment.idComment)}
  className="reply-button"
  style={{ color: 'white' }}
>
  Répondre
</button>

      </div>
      {showReplyForm === comment.idComment && (
  <form
    onSubmit={(e) => {
      e.preventDefault();
      handleAddReply(
        video.idVid,
        comment.idComment,
        e.target.replyText.value
      );
      setShowReplyForm(null);
      e.target.reset();
    }}
    className="reply-form comment-reply"
  >
    {/* Add a hidden field for the parent comment ID */}
    <input type="hidden" name="parentId" value={comment.idComment} />
    <input type="text" name="replyText" placeholder="Votre réponse..." />
    <button type="submit">Répondre</button>
  </form>
)}


    </div>
  ))}
</div>
{/* Ajouter un formulaire pour ajouter un nouveau commentaire */}
            <form onSubmit={(e) => {
              e.preventDefault();
              handleAddComment(video.idVid, e.target.textComment.value);
              e.target.reset();
            }}>
              <input type="text" name="textComment" placeholder="Ajouter un commentaire..." />
              <button type="submit" style={{color:'white'}}>Ajouter</button>
            </form>
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