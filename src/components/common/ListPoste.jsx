import React, { useState, useEffect } from 'react';
import PosteService from '../service/PosteService';
import { useNavigate } from 'react-router-dom';

const ListPoste = ({ role }) => {
    const [postes, setPostes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        console.log('User role:', role); // Debugging log
        getPostes();
    }, [role]);

    const getPostes = () => {
        PosteService.getAllPostes().then((res) => {
            setPostes(res.data);
        }).catch((error) => {
            console.error("There was an error fetching the postes!", error);
        });
    }

    const addPostes = () => {
        navigate('/add-poste');
    };

    const updatePoste = (id) => {
        navigate(`/edit-poste/${id}`);
    };

    const removePoste = (id) => {
        PosteService.deletePoste(id)
            .then((response) => {
                getPostes();
            })
            .catch((error) => {
                console.error("There was an error deleting the poste!", error);
            });
    };

    return (
        <div>
            <h2 className="text-center">Postes List</h2>
            {(role === 'ADMIN' || role === 'EMPLOYERH') && (
                <button className='btn btn-primary mb-2' onClick={addPostes}>Add Poste</button>
            )}
            <div className="row col-md-8 offset-md-2">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Poste ID</th>
                            <th>Poste Titre</th>
                            <th>Description</th>
                            <th>Salaire</th>
                            <th>Département</th>
                            {(role === 'ADMIN' || role === 'EMPLOYERH') && <th>Actions</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {postes.map(poste => (
                            <tr key={poste.id}>
                                <td>{poste.id}</td>
                                <td>{poste.titre}</td>
                                <td>{poste.description}</td>
                                <td>{poste.salaire}</td>
                                <td>{poste.departement ? poste.departement.nom : 'N/A'}</td>
                                {(role === 'ADMIN' || role === 'EMPLOYERH') && (
                                    <td>
                                        <button className='btn btn-info' onClick={() => updatePoste(poste.id)}>Update</button>
                                        <button className='btn btn-danger' onClick={() => removePoste(poste.id)}>Delete</button>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListPoste;
