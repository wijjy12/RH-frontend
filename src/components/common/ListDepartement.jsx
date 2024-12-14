import React, { useState, useEffect } from 'react';
import DepartementService from '../service/DepartementService';
import { useNavigate } from 'react-router-dom';

const ListDepartement = ({ role }) => {
    const [departements, setDepartements] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        console.log('User role:', role); // Debugging log
        getDepartements();
    }, [role]);

    const getDepartements = () => {
        DepartementService.getAllDepartements().then((res) => {
            setDepartements(res.data);
        }).catch((error) => {
            console.error("There was an error fetching the departements!", error);
        });
    }

    const addDepartement = () => {
        navigate('/add-departement');
    };

    const updateDepartement = (id) => {
        navigate(`/edit-departement/${id}`);
    };

    const removeDepartement = (id) => {
        DepartementService.deleteDepartement(id)
            .then((response) => {
                getDepartements();
            })
            .catch((error) => {
                console.error("There was an error deleting the departement!", error);
            });
    };

    return (
        <div>
            <h2 className="text-center">Departments List</h2>
            {(role === 'ADMIN' || role === 'EMPLOYERH') && (
                <button className='btn btn-primary mb-2' onClick={addDepartement}>Add Department</button>
            )}
            <div className="row col-md-6 offset-md-3">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Department ID</th>
                            <th>Department Name</th>
                            <th>Description</th>
                            {(role === 'ADMIN' || role === 'EMPLOYERH') && <th>Actions</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {departements.map(departement => (
                            <tr key={departement.id}>
                                <td>{departement.id}</td>
                                <td>{departement.nom}</td>
                                <td>{departement.description}</td>
                                {(role === 'ADMIN' || role === 'EMPLOYERH') && (
                                    <td>
                                        <button className='btn btn-info' onClick={() => updateDepartement(departement.id)}>Update</button>
                                        <button className='btn btn-danger' onClick={() => removeDepartement(departement.id)}>Delete</button>
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

export default ListDepartement;
