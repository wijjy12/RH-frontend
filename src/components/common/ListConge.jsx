import React, { useState, useEffect } from 'react';
import CongeService from '../service/CongeService';
import { useNavigate } from 'react-router-dom';

const ListConge = () => {
    const [conges, setConges] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getConges();
    }, []);

    const getConges = () => {
        CongeService.getAllDemandesConge().then((res) => {
            setConges(res.data);
        }).catch((error) => {
            console.error("There was an error fetching the conges!", error);
        });
    }

   

    

    return (
        <div>
            <h2 className="text-center">Congés List</h2>
            <div className="row col-md-8 offset-md-2">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Congé ID</th>
                            <th>Employé</th>
                            <th>Début de Congé</th>
                            <th>Fin de Congé</th>
                            <th>Raison</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            conges.map(
                                conge =>
                                    <tr key={conge.id}>
                                        <td>{conge.id}</td>
                                        <td>{conge.employe ? conge.employe.nom : 'N/A'}</td>
                                        <td>{conge.fromDate}</td>
                                        <td>{conge.toDate}</td>
                                        <td>{conge.raison}</td>
                                        <td>{conge.status}</td>
                                    </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListConge;
