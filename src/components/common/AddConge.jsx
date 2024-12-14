import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CongeService from '../service/CongeService';

const AddConge = ({ userId }) => {
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [raison, setRaison] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const conge = {
            employe: { id: userId },
            fromDate,
            toDate,
            raison,
            approuve: false,
            status: 'PENDING'
        };

        try {
            await CongeService.demanderConge(conge);
            alert('Demande de congé créée avec succès');
            navigate('/conges'); // Redirection vers la liste des congés
        } catch (error) {
            console.error('Erreur lors de la création de la demande de congé', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Début de congé:</label>
                <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} required />
            </div>
            <div>
                <label>Fin de congé:</label>
                <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} required />
            </div>
            <div>
                <label>Raison:</label>
                <textarea value={raison} onChange={(e) => setRaison(e.target.value)} required />
            </div>
            <button type="submit">Demander Congé</button>
        </form>
    );
};

export default AddConge;
