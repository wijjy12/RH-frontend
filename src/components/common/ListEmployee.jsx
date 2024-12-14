import React, { useEffect, useState } from 'react';
import { deleteEmploye, getAllEmployes } from '../service/EmployeService';
import { useNavigate } from 'react-router-dom';

const ListEmployee = ({ role }) => {
  const [employes, setEmployes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('User role:', role); // Debugging log
    listEmployes(); 
  }, []);
  
  const listEmployes = () => {
    getAllEmployes().then((response) => {
      setEmployes(response.data);
    }).catch(error => {
      console.error(error);
    });
  };

  const addEmployee = () => {
    navigate('/add-employee');
  };

  const updateEmploye = (id) => {
    navigate(`/edit-employe/${id}`);
  };

  const removeEmploye = (id) => {
    deleteEmploye(id).then((response) => {
      listEmployes();
    }).catch(error => {
      console.error(error);
    });
  };

  return (
    <div className='container'>
      <h2>Liste des Employés</h2>
      {(role === 'ADMIN' || role === 'EMPLOYERH')  && (
        <button className='btn btn-primary mb-2' onClick={addEmployee}>Add Employee</button>
      )}
      <table className='table table-striped table-bordered'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Email</th>
            <th>Adresse</th>
            <th>Numéro de téléphone</th>
            <th>Salaire</th>
            <th>Département</th>
            <th>Date d'embauche</th>
            <th>Poste</th>
            <th>Status</th>
            {(role === 'ADMIN' || role === 'EMPLOYERH')  && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {employes.map(employe => (
            <tr key={employe.id}>
              <td>{employe.id}</td>
              <td>{employe.nom}</td>
              <td>{employe.prenom}</td>
              <td>{employe.email}</td>
              <td>{employe.adresse}</td>
              <td>{employe.numDeTelephone}</td>
              <td>{employe.salaire}</td>
              <td>{employe.departement ? employe.departement.nom : 'N/A'}</td>
              <td>{employe.dateEmbauche}</td>
              <td>{employe.poste ? employe.poste.titre : 'N/A'}</td>
              <td>{employe.status}</td>
              {(role === 'ADMIN' || role === 'EMPLOYERH') && (
                <td>
                  <button className='btn btn-info' onClick={() => updateEmploye(employe.id)}>Update</button>
                  <button className='btn btn-danger' onClick={() => removeEmploye(employe.id)}>Delete</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListEmployee;
