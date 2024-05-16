import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import './detail.css';
import { FaFacebook, FaInstagram, FaTiktok, FaLinkedin, FaYoutube, FaThumbsUp } from 'react-icons/fa';

function Detail() {
    const { id } = useParams();
    const [createur, setCreateur] = useState(null);
    const [videos, setVideos] = useState([]);
    const [likes, setLikes] = useState({});
    const [likedVideos, setLikedVideos] = useState({});
        const [commentText, setCommentText] = useState(''); // Define and initialize commentText state


    useEffect(() => {
        const fetchCreateurDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/createur/${id}`);
                setCreateur(response.data);
                fetchCreatorVideos(response.data.idCreateur);
            } catch (error) {
                console.error('Erreur lors de la récupération des détails du créateur :', error);
            }
        };

        const fetchCreatorVideos = async (idCreateur) => {
            try {
                const response = await axios.get(`http://localhost:3001/createur/videos/${idCreateur}`);
                const videosWithLikes = await Promise.all(response.data.map(async (video) => {
                    const likesResponse = await axios.get(`http://localhost:3001/video/${video.idVid}/like`);
                    const likes = likesResponse.data.likes;
                    return { ...video, likes };
                }));
                setVideos(videosWithLikes);
                response.data.forEach(video => fetchLikes(video.idVid));
            } catch (error) {
                console.error('Erreur lors de la récupération des vidéos du créateur :', error);
            }
        };

        const fetchLikes = async (idVid) => {
            try {
                const response = await axios.get(`http://localhost:3001/video/${idVid}/like`);
                setLikes(prevLikes => ({
                    ...prevLikes,
                    [idVid]: response.data.likes
                }));

                // Vérifiez si l'utilisateur a aimé cette vidéo précédemment et mettez à jour l'état en conséquence
                const liked = localStorage.getItem(`liked_${idVid}`);
                setLikedVideos(prevLikedVideos => ({
                    ...prevLikedVideos,
                    [idVid]: liked === 'true' ? true : false
                }));
            } catch (error) {
                console.error("Erreur lors de la récupération des likes :", error);
            }
        };

        if (id) {
            fetchCreateurDetails();
        }
    }, [id]);

    useEffect(() => {
        // Fonction pour récupérer les commentaires de chaque vidéo
        const fetchCommentsForAllVideos = () => {
            videos.forEach(video => fetchVideoComments(video.idVid));
        };
    
        fetchCommentsForAllVideos();
    }, [videos]);

    // Fonction pour gérer les clics sur le bouton de like
    const handleLike = async (videoId) => {
        try {
            const alreadyLiked = likedVideos[videoId];

            // Si la vidéo est déjà aimée, diminuez le nombre de likes et supprimez-la de la liste des vidéos aimées
            if (alreadyLiked) {
                const updatedLikes = (likes[videoId] || 0) - 1;
                const response = await axios.put(`http://localhost:3001/video/${videoId}/like`, { likes: updatedLikes });
                if (response.status === 200) {
                    setLikes((prevLikes) => ({
                        ...prevLikes,
                        [videoId]: updatedLikes >= 0 ? updatedLikes : 0,
                    }));
                    // Mettre à jour l'état pour indiquer que la vidéo n'est plus aimée
                    setLikedVideos((prevLikedVideos) => ({
                        ...prevLikedVideos,
                        [videoId]: false,
                    }));
                    // Supprimez la vidéo de la liste des vidéos aimées dans le stockage local
                    localStorage.setItem(`liked_${videoId}`, 'false');
                }
            } else {
                // Si la vidéo n'est pas déjà aimée, augmentez le nombre de likes et ajoutez-la à la liste des vidéos aimées
                const updatedLikes = (likes[videoId] || 0) + 1;
                const response = await axios.put(`http://localhost:3001/video/${videoId}/like`, { likes: updatedLikes });
                if (response.status === 200) {
                    setLikes((prevLikes) => ({
                        ...prevLikes,
                        [videoId]: updatedLikes,
                    }));
                    // Mettre à jour l'état pour indiquer que la vidéo est aimée
                    setLikedVideos((prevLikedVideos) => ({
                        ...prevLikedVideos,
                        [videoId]: true,
                    }));
                    // Enregistrez la vidéo dans la liste des vidéos aimées dans le stockage local
                    localStorage.setItem(`liked_${videoId}`, 'true');
                }
            }
        } catch (error) {
            console.error("Erreur lors de la mise à jour des likes :", error);
        }
    };
    const fetchVideoComments = async (idVid) => {
        try {
            const response = await axios.get(`http://localhost:3001/video/commentaire/${idVid}/${createur.idCreateur}`);
            const comments = response.data;
            setVideos(prevVideos => prevVideos.map(video => {
                if (video.idVid === idVid) {
                    return { ...video, comments: comments };
                }
                return video;
            }));
        } catch (error) {
            console.error("Erreur lors de la récupération des commentaires de la vidéo :", error);
        }
    };
    const handleCommentSubmit = async (e, videoId) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:3001/video/commentaire/${videoId}/${createur.idCreateur}`, { textComment: commentText });
            if (response.status === 200) {
                // Rafraîchir les commentaires après l'ajout réussi
                fetchVideoComments(videoId);
                // Effacer le champ de texte du commentaire après l'ajout
                setCommentText('');
            }
        } catch (error) {
            console.error("Erreur lors de l'ajout du commentaire :", error);
        }
    };
    const deleteComment = async (commentId, videoId) => {
        try {
            const response = await axios.delete(`http://localhost:3001/video/commentaire/${videoId}/${commentId}/${createur.idCreateur}`);
            if (response.status === 200) {
                // Mettez à jour les commentaires après la suppression
                fetchVideoComments(videoId);
            }
        } catch (error) {
            console.error("Erreur lors de la suppression du commentaire :", error);
        }
    };
    

    if (!createur) {
        return <div>Chargement...</div>;
    }

    return (
        <div>
            <header id="site-header" className="fixed-top">
                <div className="container">
                    <nav className="navbar navbar-expand-lg stroke">
                        <h1>
                            <Link className="navbar-brand" to="/">
                                <img className="img-fluid" src="src/assets/images/yallalogo.png" alt="" style={{ maxWidth: '100px' }} />
                            </Link>
                        </h1>
                        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                            <ul className="navbar-nav ml-lg-auto">
                                <li className="nav-item active">
                                    <Link className="nav-link" to="/">Accueil <span className="sr-only">(current)</span></Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/apropos">À propos</Link>
                                </li>
                                <li className="nav-item dropdown">
                                    <Dropdown>
                                        <Dropdown.Toggle id="navbarDropdown">
                                            Formations
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item as={Link} to="/Accelerer">Cours Accéléré</Dropdown.Item>
                                            <Dropdown.Item as={Link} to="/complet">Cours Complet</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/createur">Créateurs</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/contact">Contact</Link>
                                </li>
                                <div className="search-right">
                                    <a href="/" className="btn button-style">Sortir</a>
                                    <div id="search" className="pop-overlay">
                                        <div className="popup">
                                            <h4 className="search-pop-text-w3 text-white text-center mb-4">Recherchez ici votre cours en ligne</h4>
                                            <form action="#error" method="GET" className="search-box">
                                                <div className="input-search">
                                                    <span className="fa fa-search mr-2" aria-hidden="true"></span>
                                                    <input type="search" placeholder="Entrer un mot-clé" name="search" required="required" autoFocus />
                                                </div>
                                                <button type="submit" className="btn button-style">Recherche</button>
                                            </form>
                                        </div>
                                        <a className="close" href="#close">×</a>
                                    </div>
                                </div>
                            </ul>
                        </div>
                    </nav>
                </div>
            </header>
            <br />

            <div className="inner-banner">
                <section className="w3l-breadcrumb">
                    <div className="container">
                        <h4 className="inner-text-title font-weight-bold mb-sm-3 mb-2">Détail du créateur</h4>
                        <ul className="breadcrumbs-custom-path">
                            <br />
                            <li><a href="/">Accueil</a></li>
                            <li className="active"><span className="fa fa-chevron-right mx-2" aria-hidden="true"></span>Détail du créateur</li>
                        </ul>
                    </div>
                </section>
            </div>

            <div className="inner-banner">
                <section className="w3l-breadcrumb">
                    <div className="row justify-content-center">
                        <div className="col-lg-10 col-12">
                            <div className="row">
                                <div className="col-lg-3 col-12">
                                    <div className="custom-block-icon-wrap">
                                        <div className="custom-block-image-wrap custom-block-image-detail-page">
                                            <img src={`/photo/${createur.image}`} className="custom-block-image img-fluid" alt="" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-9 col-12">
                                    <div className="custom-block-info">
                                        <div className="custom-block-top d-flex mb-1"></div>
                                        <h2 className="mb-2">{createur.nom}</h2>
                                        <br />
                                        <h2 className="mb-2">{createur.prenom}</h2>
                                        <div style={{ textAlign: "left" }}>
                                            <p>{createur.description}</p>
                                            <p><strong>Email:</strong> {createur.email}</p>
                                            <p><strong>Adresse:</strong> {createur.adresse}</p>
                                            <p><strong>Domaine:</strong> {createur.domaine}</p>
                                            <div>
                                                <p><strong>Nombre de followers:</strong> {createur.nbFollowers}</p>
                                            </div>
                                            <ul className="social-icon ms-lg-auto ms-md-auto">
                                                {createur.lienFace && (
                                                    <li className="social-icon-item">
                                                        <a href={createur.lienFace} className="social-icon-link"><FaFacebook /></a>
                                                    </li>
                                                )}
                                                {createur.lienInsta && (
                                                    <li className="social-icon-item">
                                                        <a href={createur.lienInsta} className="social-icon-link"><FaInstagram /></a>
                                                    </li>
                                                )}
                                                {createur.lienTik && (
                                                    <li className="social-icon-item">
                                                        <a href={createur.lienTik} className="social-icon-link"><FaTiktok /></a>
                                                    </li>
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="video-section">
                                    <div className="videos">
                                        {videos.map(video => (
                                            <div key={video.idVid} className="video-card">
                                                <div className="video-details">
                                                    <h3>{video.titre}</h3>
                                                    <p>{video.description}</p>
                                                </div>
                                                <video src={`http://localhost:3001/videos/${video.video}`} controls />
                                                <p className="likes-count">
                                                    <FaThumbsUp onClick={() => handleLike(video.idVid)} style={{ cursor: 'pointer', color: likedVideos[video.idVid] ? '#70218f' : 'grey' }} /> {likes[video.idVid] || 0}
                                                </p>
                                                <div className="comments-section" style={{ textAlign: "left" }}>
                                                    <form onSubmit={(e) => handleCommentSubmit(e, video.idVid)}>
                                                        <input type="text" value={commentText} onChange={(e) => setCommentText(e.target.value)} placeholder="Écrire un commentaire..." />
                                                        <button type="submit" style={{color: "white"}}>Commenter</button>
                                                    </form>
                                                    {/* Afficher les commentaires existants */}
                                                    <ul>
                                                        {video.comments && video.comments.map(comment => (
                                                            <li key={comment.idComment}>
                                                                {comment.textComment}
                                                                {/* Affichez le bouton de suppression uniquement pour les commentaires de l'utilisateur actuel */}
                                                                {comment.idCrea === createur.idCreateur && (
                                                                <button onClick={() => deleteComment(comment.idComment, video.idVid)} style={{ marginLeft: "160px",marginTop: "10px",color: "white" }}>Supprimer</button>)}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <footer className="w3l-footer-22 position-relative mt-5 pt-5">
                <div className="footer-sub">
                    <div className="container">
                        <div className="text-txt">
                            <div className="row sub-columns align-items-center">
                                <div className="col-lg-4 col-md-4 col-sm-12 sub-one-left">
                                    <img src="src/assets/images/nourch.jpg" className="footer-image img-fluid" alt="Footer Image" style={{ maxWidth: '200px' }} />
                                    <p>Dans notre école dynamique et novatrice, nous visons à développer les compétences clés pour créer des contenus exceptionnels, riches en inspiration</p>
                                    <div className="columns-2">
                                        <ul className="social">
                                            <li><a href="https://www.facebook.com/profile.php?id=100095263917513&amp;mibextid=LQQJ4d"><FaFacebook /></a></li>
                                            <li><a href="https://instagram.com/yalla_digital_academy?igshid=MzRlODBiNWFlZA=="><FaInstagram /></a></li>
                                            <li><a href="https://www.tiktok.com/@yalla.digital.academy?_t=8ekU1rsalE6&_r=1"><FaTiktok /></a></li>
                                            <li><a href="https://www.linkedin.com/company/yalla-digital-academy/posts/?feedView=all"><FaLinkedin /></a></li>
                                            <li><a href="https://www.youtube.com/@YallaDigitalAcademy"><FaYoutube /></a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-12">
                                    <div className="row">
                                        <div className="col-lg-6 col-md col-sm-6 sub-two-right">
                                            <h6>Liens rapides</h6>
                                            <ul>
                                                <li><a href="/"><span className="fa fa-angle-double-right mr-2"></span>Accueil</a></li>
                                                <li><a href="apropos"><span className="fa fa-angle-double-right mr-2"></span>À propos</a></li>
                                                <li><a href="createur"><span className="fa fa-angle-double-right mr-2"></span>Créateurs</a></li>
                                                <li><a href="contact"><span className="fa fa-angle-double-right mr-2"></span>Contact</a></li>
                                            </ul>
                                        </div>
                                        <div className="col-lg-6 col-md col-sm-6 sub-one-left">
                                            <h6>Contact</h6>
                                            <div className="column2">
                                                <div className="href1"><span className="fa fa-envelope-o" aria-hidden="true"></span><a href="mailto:info@example.com">Yalladigitalacademy@gmail.com</a></div>
                                                <div className="href2"><span className="fa fa-phone" aria-hidden="true"></span><a href="tel:+216 56 340 161">+216 56 340 161</a></div>
                                                <p className="contact-para"><span className="fa fa-map-marker" aria-hidden="true"></span><a href="https://maps.app.goo.gl/MGR32vQN53BYYnSC9"> ZI Chotrana II 2083 Cité El Ghazala</a></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="copyright-footer text-center">
                    <div className="container">
                        <div className="columns">
                            <p> <a href="https://w3layouts.com/" target="_blank"> </a></p>
                            <p> <a href="https://w3layouts.com/" target="_blank"> </a></p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Detail;
