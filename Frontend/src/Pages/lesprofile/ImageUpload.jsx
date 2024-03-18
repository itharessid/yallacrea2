import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

function ImageUpload() {
    const [file, setFile] = useState(null);
    const [data, setData] = useState([]);
    const fileInputRef = useRef(null);

    const handleFile = (event) => {
        setFile(event.target.files[0]);
    };

    useEffect(() => {
        axios.get('http://localhost:3001/')
            .then(res => {
                setData(res.data[0]);
            })
            .catch(err => console.log(err));
    }, []);

    const handleUpload = async () => {
        if (!file) {
            alert("Please select a file!");
            return;
        }

        const formData = new FormData();
        formData.append('image', file);

        axios.post('http://localhost:3001/upload', formData)
            .then(res => {
                if (res.data.status === "Success") {
                    alert("Image uploaded successfully!");
                } else {
                    alert("Failed to upload image!");
                }
            })
            .catch(err => console.log(err));
    };

    const handleClick = () => {
        // Trigger file input click when icon is clicked
        fileInputRef.current.click();
    };

    return (
        <div className="inner-banner">
            <section className="w3l-breadcrumb">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-7 d-flex justify-content-center align-items-center"> {/* Displaying image in the center */}
                        <div style={{ position: "relative", width: "300px", height: "300px", overflow: "hidden", borderRadius: "50%", display: "inline-block", border: "2px solid #8A2BE2" }}>
    <img src={"http://localhost:3001/images/" + data.image} alt="" style={{ maxWidth: "100%", height: "auto", borderRadius: "50%" }} />
</div>
<FontAwesomeIcon icon={faEdit} onClick={handleClick} style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(550%, 550%)", cursor: "pointer", zIndex: "1", backgroundColor: "#70218f", borderRadius: "50%", fontSize: "20px" }} />


                        </div>
                        <div className="col-lg-7">
                            <div className="custom-block-icon-wrap">
                                {/* Icon to trigger file input */}
                                {/* Hidden file input */}
                                <input type="file" ref={fileInputRef} style={{ display: "none" }} onChange={handleFile} />

                                <button onClick={handleUpload} style={{ marginTop: "5px", marginBottom: "5px" }}>Envoyer</button>
                                
                                
                            </div>
                            <div className="col-lg-5">
                        <div className="custom-block-info">
                            <div className="custom-block-top d-flex mb-1">
                                <small className="me-4">
                                    <a href="#">
                                        <i className="bi-play"></i>
                                        Play now
                                    </a>
                                </small>
                                <small>
                                    <i className="bi-clock-fill custom-icon"></i>
                                    50 Minutes
                                </small>
                                <small className="ms-auto">Episode <span className="badge">15</span></small>
                            </div>
                            <h2 className="mb-2">Modern Vintage</h2>
                            <p>What is Content Marketing? If you are wondering what content marketing is all about, this is the place to start.</p>
                            <p>You are not allowed to redistribute this template ZIP file on any other template collection website. Please contact TemplateMo for more information.</p>
                            <p>Pod Talk HTML CSS Template is made by Bootstrap v5.2.2 framework. You are allowed to modify and use this template for your business websites.</p>
                            <div className="profile-block profile-detail-block d-flex flex-wrap align-items-center mt-5">
                                <div className="d-flex mb-3 mb-lg-0 mb-md-0">
                                    <img src="src/assets/images/c1.jpg" className="profile-block-image img-fluid" alt=""/>
                                    <p>
                                        itsbahahaouas
                                        <img src="images/verified.png" className="verified-image img-fluid" alt=""/>
                                        <strong>Création de vidéos</strong>
                                    </p>
                                </div>
                                <ul className="social-icon ms-lg-auto ms-md-auto">
                                    <li className="social-icon-item">
                                        <a href="https://www.facebook.com/baha.haouas.9/" className="social-icon-link fa fa-facebook"></a>
                                    </li>
                                    <li className="social-icon-item">
                                        <a href="https://www.instagram.com/itsbahahaouas/" className="social-icon-link fa fa-instagram"></a>
                                    </li>
                                    <li className="social-icon-item">
                                        <a href="https://www.tiktok.com/@justbahahaouas?is_from_webapp=1&sender_device=pc" className="social-icon-link">
                                            <img src="src/assets/images/tiktok-16.png" alt="TikTok" />
                                        </a>
                                    </li>
                                </ul>
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
