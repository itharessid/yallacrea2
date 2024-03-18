import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import './imageuplod.css'

function ImageUpload() {
    const [file, setFile] = useState(null);
    const [data, setData] = useState([]);
    const [formData, setFormData] = useState({ name: '', description: '' });
    const [profileData, setProfileData] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const fileInputRef = useRef(null);

    const handleFile = (event) => {
        setFile(event.target.files[0]);
    };

    const handleFormChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        setProfileData(formData);
        setShowModal(false);
    };

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

    useEffect(() => {
        axios.get('http://localhost:3001/')
            .then(res => {
                setData(res.data[0]);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <div className="inner-banner">
            <section className="w3l-breadcrumb">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-7 d-flex justify-content-center align-items-center">
                            <div style={{ position: "relative", width: "300px", height: "300px", overflow: "hidden", borderRadius: "50%", display: "inline-block", border: "8px solid #70218f" }}>
                                <img src={"http://localhost:3001/images/" + data.image} alt="" style={{ maxWidth: "100%", height: "auto", borderRadius: "50%" }} />
                            </div>
                            <FontAwesomeIcon icon={faPlus} onClick={handleClick} style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(450%, 450%)", cursor: "pointer", zIndex: "1", backgroundColor: "#70218f", borderRadius: "50%", fontSize: "26px" }} />
                        </div>
                        <div className="col-lg-7">
                            <div className="custom-block-icon-wrap">
                                <input type="file" ref={fileInputRef} style={{ display: "none" }} onChange={handleFile} />
                                <button onClick={handleUpload} style={{ marginTop: "5px", marginBottom: "5px" }}>Envoyer</button>
                            </div>
                        </div>
                        <div className="col-lg-5 d-flex justify-content-end align-items-end">
                            <div className="additional-button-div" style={{ position: "absolute", bottom: "0", right: "0" }}>
                                <button style={{ marginTop: "5px", marginBottom: "5px" }} onClick={() => setShowModal(true)}>Modifier le profile</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {showModal && (
                <div className="modale">
                    <div className="modal-contente">
                        <span className="close" onClick={() => setShowModal(false)}>&times;</span>
                        <form onSubmit={handleFormSubmit}>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <textarea id="description" name="description" value={formData.description} onChange={handleFormChange} />
                            </div>
                            <div className="form-group">
                    <label htmlFor="bio">Biographie</label>
                  <textarea id="bio" name="bio" value={formData.bio} onChange={handleFormChange} />
                        </div>
                        <div className="form-group">
              <label htmlFor="genre">Genre</label>
                      <div>
        <label>
            <input type="checkbox" name="genre" value="male" checked={formData.genre === 'male'} onChange={handleFormChange} />
            Male
        </label>
    </div>
    <div>
        <label>
            <input type="checkbox" name="genre" value="female" checked={formData.genre === 'female'} onChange={handleFormChange} />
            Female
        </label>
    </div>
    <div>
        <label>
            <input type="checkbox" name="genre" value="other" checked={formData.genre === 'other'} onChange={handleFormChange} />
            Other
        </label>
    </div>
    </div>
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ImageUpload;
