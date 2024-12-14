import React, { useState } from 'react';
import Swal from 'sweetalert2';
import UserService from '../service/UserService';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function RegistrationPage() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        adresse: '',
        email: '',
        numeroTelephone: '',
        motDePasse: '',
        diplome: '',
        experience: '',
        domaineExperience: '',
        cv: null,
        dateCreation: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, cv: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSubmit = new FormData();
        for (const key in formData) {
            formDataToSubmit.append(key, formData[key]);
        }

        try {
            await UserService.registerCandidat(formDataToSubmit); // No token needed
            setFormData({
                nom: '',
                prenom: '',
                adresse: '',
                email: '',
                numeroTelephone: '',
                motDePasse: '',
                diplome: '',
                experience: '',
                domaineExperience: '',
                cv: null,
                dateCreation: '',
            });

            // Show success notification using SweetAlert2
            Swal.fire({
                icon: 'success',
                title: 'User has been registered successfully!',
                timer: 3000, // Display toast for 3 seconds
                timerProgressBar: true,
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer);
                    toast.addEventListener('mouseleave', Swal.resumeTimer);
                }
            });

            navigate('/admin/user-management');
        } catch (error) {
            console.error('Error registering user:', error);
            Swal.fire({
                icon: 'error',
                title: 'Registration Error',
                text: 'An error occurred while registering the user',
            });
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center fw-bold">Postuler</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="nom" className="form-label">Nom:</label>
                    <input type="text" className="form-control" id="nom" name="nom" value={formData.nom} onChange={handleInputChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="prenom" className="form-label">Prénom:</label>
                    <input type="text" className="form-control" id="prenom" name="prenom" value={formData.prenom} onChange={handleInputChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="adresse" className="form-label">Adresse:</label>
                    <input type="text" className="form-control" id="adresse" name="adresse" value={formData.adresse} onChange={handleInputChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleInputChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="numeroTelephone" className="form-label">Numéro de Téléphone:</label>
                    <input type="text" className="form-control" id="numeroTelephone" name="numeroTelephone" value={formData.numeroTelephone} onChange={handleInputChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="motDePasse" className="form-label">Mot de Passe:</label>
                    <input type="password" className="form-control" id="motDePasse" name="motDePasse" value={formData.motDePasse} onChange={handleInputChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="diplome" className="form-label">Diplôme:</label>
                    <input type="text" className="form-control" id="diplome" name="diplome" value={formData.diplome} onChange={handleInputChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="experience" className="form-label">Expérience:</label>
                    <input type="number" className="form-control" id="experience" name="experience" value={formData.experience} onChange={handleInputChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="domaineExperience" className="form-label">Domaine d'Expérience:</label>
                    <input type="text" className="form-control" id="domaineExperience" name="domaineExperience" value={formData.domaineExperience} onChange={handleInputChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="cv" className="form-label">CV:</label>
                    <input type="file" className="form-control" id="cv" name="cv" onChange={handleFileChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="dateCreation" className="form-label">Date de Création:</label>
                    <input type="date" className="form-control" id="dateCreation" name="dateCreation" value={formData.dateCreation} onChange={handleInputChange} required />
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        </div>
    );
}

export default RegistrationPage;
