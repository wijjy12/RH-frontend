import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Header1 from './components/common/Header1';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import ListEmployee from './components/common/ListEmployee';
import EmployeComponent from './components/common/EmployeComponent';
import ListDepartement from './components/common/ListDepartement';
import DepartementComponent from './components/common/DepartementComponent';
import ListPoste from './components/common/ListPoste';
import PosteComponent from './components/common/PosteComponent';
import LoginPage from './components/auth/LoginPage';
import UserService from './components/service/UserService';
import ListConge from './components/common/ListConge';
import ListCandidat from './components/common/ListCandidat';
import ProfileList from './components/UsersPage/ProfileList';
import AddConge from './components/common/AddConge';
import CongesList from './components/common/CongesList';
import './App.css';
import Home from './components/common/Home';
import Labo from './components/Offres/Labo';
import Finance from './components/Offres/Finance';
import Vente from './components/Offres/Vente';
import Production from './components/Offres/Production';
import RegistrationPage from './components/auth/RegistrationPage';



function App() {
    const role = localStorage.getItem('role');
    return (
        <BrowserRouter>
            <div className="d-flex flex-column min-vh-100">
                <Header1 />
                <div className="flex-grow-1">
                    <Routes>
                    <Route path="/" element={<Home />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/production" element={<Production />} />
                        <Route path="/vente" element={<Vente />} />
                        <Route path="/labo" element={<Labo />} />
                        <Route path="/finance" element={<Finance />} />
                        <Route path="/register" element={<RegistrationPage />} />

    
                       
                        {UserService.isAdmin() && (
                            <>
                                <Route path="/profilePage" element={<ProfileList />} />
                                <Route path="/employes" element={<ListEmployee role={role}/>} />
                                <Route path="/add-employee" element={<EmployeComponent />} />
                                <Route path="/edit-employe/:id" element={<EmployeComponent />} />
                                <Route path="/departements" element={<ListDepartement role={role}/>} />
                                <Route path="/add-departement" element={<DepartementComponent />} />
                                <Route path="/edit-departement/:id" element={<DepartementComponent />} />
                                <Route path="/postes" element={<ListPoste role={role}/>} />
                                <Route path="/add-poste" element={<PosteComponent />} />
                                <Route path="/edit-poste/:id" element={<PosteComponent />} />
                                <Route path="/candidats" element={<ListCandidat />} />
                                <Route path="/demander-conge" element={<AddConge  />} />
                                <Route path="/conges" element={<CongesList  />} />
                            </>
                        )}
                        {UserService.isEmploye() && (
                            <>
                                <Route path="/profilePage" element={<ProfileList />} />
                                <Route path="/employes" element={<ListEmployee />} />
                                <Route path="/departements" element={<ListDepartement />} />
                                <Route path="/postes" element={<ListPoste />} />
                                <Route path="/demander-conge" element={<AddConge  />} />
                                <Route path="/conges" element={<CongesList  />} />
                            </>
                        )}
                        {UserService.isCandidat() && (
                            <>
                                <Route path="/postes" element={<ListPoste />} />
                                <Route path="/add-poste" element={<PosteComponent />} />
                                <Route path="/edit-poste/:id" element={<PosteComponent />} />
                            </>
                        )}
                        {UserService.isEmployeRH() && (
                             <>
                             <Route path="/profilePage" element={<ProfileList />} />
                             <Route path="/employes" element={<ListEmployee role={role}/>} />
                             <Route path="/add-employee" element={<EmployeComponent />} />
                             <Route path="/edit-employe/:id" element={<EmployeComponent />} />
                             <Route path="/departements" element={<ListDepartement role={role}/>} />
                             <Route path="/add-departement" element={<DepartementComponent />} />
                             <Route path="/edit-departement/:id" element={<DepartementComponent />} />
                             <Route path="/postes" element={<ListPoste role={role} />} />
                             <Route path="/add-poste" element={<PosteComponent />} />
                             <Route path="/edit-poste/:id" element={<PosteComponent />} />
                             <Route path="/candidats" element={<ListCandidat />} />
                             <Route path="/demander-conge" element={<AddConge  />} />
                             <Route path="/conges" element={<CongesList  />} />
                         </>
                        )}

                        {!UserService.isAuthenticated() && (
                            <>
                                <Route path="/home" element={<Home />} />
                            </>
                        )}
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
