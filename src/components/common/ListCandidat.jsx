import React, { useEffect, useState } from 'react';
import CandidatService from '../service/CandidatService';
import { useNavigate } from 'react-router-dom';

const ListCandidat = () => {
  const [candidats, setCandidats] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllCandidats();
  }, []);
  
  const getAllCandidats = () => {
    CandidatService.getAllCandidats().then((response) => {
      setCandidats(response.data);
    }).catch(error => {
      console.error(error);
    });
  }

  const deleteCandidat = (id) => {
    CandidatService.deleteCandidat(id).then((response) => {
      getAllCandidats(); // Refresh the list after deletion
    }).catch(error => {
      console.error(error);
    });
  };

  const viewCv = (id) => {
    window.open(`http://localhost:8086/candidats/cv/${id}`, '_blank');
  };

  return (
    <div className='container'>
      <h2>Liste des Candidats</h2>
      <table className='table table-striped table-bordered'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Adresse</th>
            <th>Email</th>
            <th>Numéro de téléphone</th>
            <th>Diplôme</th>
            <th>Expérience</th>
            <th>Domaine d'Expérience</th>
            <th>Date de Création</th>
            <th>Actions</th>
            <th>CV</th>
          </tr>
        </thead>
        <tbody>
          {candidats.map(candidat => (
            <tr key={candidat.id}>
              <td>{candidat.id}</td>
              <td>{candidat.nom}</td>
              <td>{candidat.prenom}</td>
              <td>{candidat.adresse}</td>
              <td>{candidat.email}</td>
              <td>{candidat.numeroTelephone}</td>
              <td>{candidat.diplome}</td>
              <td>{candidat.experience}</td>
              <td>{candidat.domaineExperience}</td>
              <td>{candidat.dateCreation}</td>
              <td>
                <button className='btn btn-danger' onClick={() => deleteCandidat(candidat.id)}>Delete</button>
              </td>
              <td>
                <button className='btn btn-primary' onClick={() => viewCv(candidat.id)}>View CV</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListCandidat;
