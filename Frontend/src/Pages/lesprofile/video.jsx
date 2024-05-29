import React, { useState, useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';
import './video.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
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
  const idCrea = localStorage.getItem('userId');
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [videoToDelete, setVideoToDelete] = useState(null);
  const [blurBackground, setBlurBackground] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [likes, setLikes] = useState({});
  const [comments, setComments] = useState({});
  const [repliesDisplayed, setRepliesDisplayed] = useState({});

  useEffect(() => {
    const fetchCreatorVideos = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/createur/videos/${idCrea}`);
        setVideos(response.data);
        response.data.forEach(video => {
          fetchLikes(video.idVid);
          fetchComments(video.idVid);
        });
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
      setLikes(prevLikes => ({ ...prevLikes, [idVid]: response.data.likes }));
    } catch (error) {
      console.error("Erreur lors de la récupération des likes :", error);
    }
  };

  const fetchComments = async (idVid) => {
    try {
      const response = await axios.get(`http://localhost:3001/video/commentaire/${idVid}/${idCrea}`);
      setComments(prevComments => ({ ...prevComments, [idVid]: response.data }));
    } catch (error) {
      console.error("Erreur lors de la récupération des commentaires :", error);
    }
  };

  const handleAddComment = async (idVid, textComment) => {
    try {
      const response = await axios.post(`http://localhost:3001/video/commentaire/${idVid}/${idCrea}`, { textComment });
      fetchComments(idVid);
    } catch (error) {
      console.error("Erreur lors de l'ajout du commentaire :", error);
    }
  };

  const handleDeleteComment = async (idVid, idComment) => {
    try {
      await axios.delete(`http://localhost:3001/video/commentaire/${idVid}/${idComment}/${idCrea}`);
      fetchComments(idVid);
    } catch (error) {
      console.error("Erreur lors de la suppression du commentaire :", error);
    }
  };

  const handleAddReply = async (idVid, parentId, replyText) => {
    try {
      const response = await axios.post(`http://localhost:3001/video/commentaire/${idVid}/${idCrea}`, { textComment: replyText, idRepondre: parentId });
      fetchComments(idVid);
    } catch (error) {
      console.error("Erreur lors de l'ajout de la réponse au commentaire :", error);
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
      fetchCreatorVideos();
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

  const handleShowReplies = (commentId) => {
    setRepliesDisplayed(prevState => ({ ...prevState, [commentId]: !prevState[commentId] }));
  };

  const filteredVideo = searchTerm
    ? videos.filter((video) => video.titre.toLowerCase().includes(searchTerm.toLowerCase()))
    : videos;

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
                        <div className="like-container">
                          <FontAwesomeIcon
                            icon={faThumbsUp}
                            onClick={(event) => handleLikeClick(video.idVid, event)}
                            style={{ color: likes[video.idVid] ? '#70218f' : 'gray' }}
                          />
                          <span>{likes[video.idVid] || 0}</span>
                        </div>
                      </div>
                      <div className="comments-section">
                        {comments[video.idVid] && comments[video.idVid].map((comment) => (
                          <div key={comment.idComment} className="comment" style={{ textAlign: 'left' }}>
                            <p style={{ color: 'black' }}>{comment.textComment}</p>
                            <button onClick={() => setShowReplyForm(comment.idComment)} style={{ color: 'white', marginRight: '10px' }}>Répondre</button>
                            <button onClick={() => handleDeleteComment(video.idVid, comment.idComment)} style={{ color: 'white' }}>Supprimer</button>
                            {showReplyForm === comment.idComment && (
                              <form onSubmit={(e) => { e.preventDefault(); handleAddReply(video.idVid, comment.idComment, e.target.elements.replyText.value); setShowReplyForm(null); }}>
                                <textarea name="replyText" placeholder="Votre réponse..." required></textarea>
                                <button type="submit" style={{ color: 'white' }}>Ajouter la réponse</button>
                              </form>
                            )}
                            {comment.replies && comment.replies.length > 0 && (
                              <>
                                <button onClick={() => handleShowReplies(comment.idComment)} style={{ color: 'white', marginTop: '10px' }}>{repliesDisplayed[comment.idComment] ? 'Masquer les réponses' : 'Afficher les réponses'}</button>
                                {repliesDisplayed[comment.idComment] && (
                                  <div className="replies" style={{ textAlign: 'left' }}>
                                    {comment.replies.map((reply) => (
                                      <div key={reply.idComment} className="reply" style={{ display: 'flex', alignItems: 'center' }}>
                                        <p style={{ color: 'grey', marginRight: '50px',marginTop: '10px'}}>{reply.textComment}</p>
                                        <button onClick={() => handleDeleteComment(video.idVid, reply.idComment)} style={{ color: 'white',marginRight: '25px' }}>Supprimer</button>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </>
                            )}
                          </div>
                        ))}

                        <form style={{ marginTop: '15px', textAlign: 'left' }} onSubmit={(e) => { e.preventDefault(); handleAddComment(video.idVid, e.target.elements.commentText.value); e.target.reset(); }}>
                          <textarea name="commentText" placeholder="Votre commentaire..." required style={{ height: '30px', resize: 'vertical' }}></textarea>
                          <button type="submit" style={{ color: 'white' }}>Ajouter le commentaire</button>
                        </form>

                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
        </div>
      </section>
    </div>
  </section>
      <ConfirmationDialog
        showDeleteConfirmation={showDeleteConfirmation}
        handleConfirmDelete={handleConfirmDelete}
        handleCancelDelete={handleCancelDelete}
        videoToDelete={videoToDelete}
      />
    </div>
  );
}

export default Video;
