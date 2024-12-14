import React, { useState, useEffect } from 'react';
import CongeService from '../service/CongeService';

const CongesList = ({ userId }) => {
    const [conges, setConges] = useState([]);

    useEffect(() => {
        const fetchConges = async () => {
            try {
                const response = await CongeService.getDemandesCongeByEmploye(userId);
                setConges(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des congés', error);
            }
        };

        fetchConges();
    }, [userId]);

    const handleApprove = async (id) => {
        try {
            await CongeService.approveConge(id);
            setConges(conges.map(conge => conge.id === id ? { ...conge, approuve: true } : conge));
        } catch (error) {
            console.error('Erreur lors de l\'approbation du congé', error);
        }
    };

    const handleReject = async (id) => {
        try {
            await CongeService.rejectConge(id);
            setConges(conges.map(conge => conge.id === id ? { ...conge, approuve: false } : conge));
        } catch (error) {
            console.error('Erreur lors du rejet du congé', error);
        }
    };

    return (
        <div>
            <h2>Liste des Congés</h2>
            <ul>
                {conges.map(conge => (
                    <li key={conge.id}>
                        {conge.fromDate} - {conge.toDate} : {conge.raison} ({conge.approuve ? 'Approuvé' : 'Non approuvé'})
                        <button onClick={() => handleApprove(conge.id)}>Approuver</button>
                        <button onClick={() => handleReject(conge.id)}>Rejeter</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CongesList;
