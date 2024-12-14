import React, { useState, useEffect } from 'react';
import UserService from '../service/UserService';

function ProfilePage() {
    const [profileInfo, setProfileInfo] = useState({});
    const [employeInfo, setEmployeeInfo] = useState(null);
    const [candidatInfo, setCandidatInfo] = useState(null);
    const [employeRHInfo, setEmployeRHInfo] = useState(null);
    const [adminInfo, setAdminInfo] = useState(null);

    useEffect(() => {
        fetchProfileInfo();
    }, []);

    const fetchProfileInfo = async () => {
        try {
            const token = localStorage.getItem('token'); 
            const response = await UserService.getYourProfile(token);
            console.log('Profile response:', response);
            setProfileInfo(response.ourUsers);

            // Log the entire response
            console.log('Entire response:', response);

            // Log specific entity info based on role
            switch(response.ourUsers.role) {
                case "EMPLOYE":
                    console.log('Employee info in response:', response.employe);
                    setEmployeeInfo(response.employe);
                    break;
                case "CANDIDAT":
                    console.log('Candidat info in response:', response.candidat);
                    setCandidatInfo(response.candidat);
                    break;
                case "EMPLOYERH":
                    console.log('EmployeRH info in response:', response.employe); // Use employe for EMPLOYERH role
                    setEmployeRHInfo(response.employe);
                    break;
                case "ADMIN":
                    console.log('Admin info in response:', response.admin);
                    setAdminInfo(response.admin);
                    break;
                default:
                    console.log('No matching role found');
                    break;
            }
        } catch (error) {
            console.error('Error fetching profile information:', error);
        }
    };

    console.log('Employee Info:', employeInfo); // Log the employee info

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-body">
                    <h2 className="card-title">Profile Information</h2>

                    {employeInfo && (
                        <div>
                            <p className="card-text"><strong>Nom:</strong> {employeInfo.nom}</p>
                            <p className="card-text"><strong>Prénom:</strong> {employeInfo.prenom}</p>
                            <p className="card-text"><strong>Email:</strong> {employeInfo.email}</p>
                            <p className="card-text"><strong>Adresse:</strong> {employeInfo.adresse}</p>
                            <p className="card-text"><strong>Numéro de téléphone:</strong> {employeInfo.numDeTelephone}</p>
                            <p className="card-text"><strong>Salaire:</strong> {employeInfo.salaire}</p>
                            <p className="card-text"><strong>Date d'embauche:</strong> {employeInfo.dateEmbauche}</p>
                            <p className="card-text"><strong>Département:</strong> {employeInfo.departement?.nom}</p>
                            <p className="card-text"><strong>Poste:</strong> {employeInfo.poste?.titre}</p>
                        </div>
                    )}

                    {candidatInfo && (
                        <div>
                            <p className="card-text"><strong>Nom:</strong> {candidatInfo.nom}</p>
                            <p className="card-text"><strong>Prénom:</strong> {candidatInfo.prenom}</p>
                            <p className="card-text"><strong>Adresse:</strong> {candidatInfo.adresse}</p>
                            <p className="card-text"><strong>Email:</strong> {candidatInfo.email}</p>
                            <p className="card-text"><strong>Numéro de téléphone:</strong> {candidatInfo.numeroTelephone}</p>
                        </div>
                    )}

                    {employeRHInfo && (
                        <div>
                            <p className="card-text"><strong>Nom:</strong> {employeRHInfo.nom}</p>
                            <p className="card-text"><strong>Prénom:</strong> {employeRHInfo.prenom}</p>
                            <p className="card-text"><strong>Email:</strong> {employeRHInfo.email}</p>
                            <p className="card-text"><strong>Adresse:</strong> {employeRHInfo.adresse}</p>
                            <p className="card-text"><strong>Numéro de téléphone:</strong> {employeRHInfo.numDeTelephone}</p>
                            <p className="card-text"><strong>Salaire:</strong> {employeRHInfo.salaire}</p>
                            <p className="card-text"><strong>Date d'embauche:</strong> {employeRHInfo.dateEmbauche}</p>
                            <p className="card-text"><strong>Département:</strong> {employeRHInfo.departement?.nom}</p>
                            <p className="card-text"><strong>Poste:</strong> {employeRHInfo.poste?.titre}</p>
                        </div>
                    )}

                    {adminInfo && (
                        <div>
                            <p className="card-text"><strong>Nom:</strong> {adminInfo.nom}</p>
                            <p className="card-text"><strong>Prénom:</strong> {adminInfo.prenom}</p>
                            <p className="card-text"><strong>Email:</strong> {adminInfo.email}</p>
                            <p className="card-text"><strong>Numéro de téléphone:</strong> {adminInfo.numeroTelephone}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
