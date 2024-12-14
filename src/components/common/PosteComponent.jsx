import React, { useState, useEffect } from 'react';
import PosteService from '../service/PosteService';
import DepartementService from '../service/DepartementService';
import { useNavigate, useParams } from 'react-router-dom';

const PosteComponent = () => {
    const [titre, setTitre] = useState('');
    const [description, setDescription] = useState('');
    const [salaire, setSalaire] = useState('');
    const [departements, setDepartements] = useState([]);
    const [selectedDepartement, setSelectedDepartement] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    const [errors, setErrors] = useState({
        titre: '',
        description: '',
        salaire: '',
        departement: '',
    });

    useEffect(() => {
        DepartementService.getAllDepartements().then((res) => {
            setDepartements(res.data);
        }).catch((error) => {
            console.error('There was an error fetching the departements!', error);
        });
    }, []);

    useEffect(() => {
        if (id) {
            PosteService.getOnePoste(id).then((response) => {
                setTitre(response.data.titre);
                setDescription(response.data.description);
                setSalaire(response.data.salaire);
                setSelectedDepartement(response.data.departement.nom);
            }).catch((error) => {
                console.error(error);
            });
        }
    }, [id]);

    const saveOrUpdatePoste = (e) => {
        e.preventDefault();
        if (validateForm()) {
            const poste = { titre, description, salaire, departement: { nom: selectedDepartement } };

            if (id) {
                PosteService.updatePoste(id, poste).then(() => {
                    navigate('/postes');
                }).catch((error) => {
                    console.error('There was an error!', error);
                });
            } else {
                PosteService.createPoste(poste).then(() => {
                    navigate('/postes');
                }).catch((error) => {
                    console.error('There was an error!', error);
                });
            }
        }
    };

    const validateForm = () => {
        let valid = true;
        const errorsCopy = { ...errors };

        if (titre.trim()) {
            errorsCopy.titre = '';
        } else {
            errorsCopy.titre = 'Titre is required';
            valid = false;
        }
        if (description.trim()) {
            errorsCopy.description = '';
        } else {
            errorsCopy.description = 'Description is required';
            valid = false;
        }
        if (salaire.trim()) {
            errorsCopy.salaire = '';
        } else {
            errorsCopy.salaire = 'Salaire is required';
            valid = false;
        }
        if (selectedDepartement.trim()) {
            errorsCopy.departement = '';
        } else {
            errorsCopy.departement = 'Département is required';
            valid = false;
        }

        setErrors(errorsCopy);
        return valid;
    };

    const pageTitle = () => {
        return <h2 className='text-center'>{id ? 'Update Poste' : 'Add Poste'}</h2>;
    };

    return (
        <div className='container'>
            <br /> <br />
            <div className='row'>
                <div className='card col-md-6 offset-md-3'>
                    {pageTitle()}
                    <div className='card-body'>
                        <form>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Titre :</label>
                                <input
                                    type='text'
                                    placeholder='Enter Poste titre'
                                    name='titre'
                                    value={titre}
                                    className={`form-control ${errors.titre ? 'is-invalid' : ''}`}
                                    onChange={(e) => setTitre(e.target.value)}
                                />
                                {errors.titre && <div className="invalid-feedback">{errors.titre}</div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Description :</label>
                                <input
                                    type='text'
                                    placeholder='Enter Poste description'
                                    name='description'
                                    value={description}
                                    className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                                {errors.description && <div className="invalid-feedback">{errors.description}</div>}
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Salaire :</label>
                                <input
                                    type='text'
                                    placeholder='Enter Poste salaire'
                                    name='salaire'
                                    value={salaire}
                                    className={`form-control ${errors.salaire ? 'is-invalid' : ''}`}
                                    onChange={(e) => setSalaire(e.target.value)}
                                />
                                {errors.salaire && <div className="invalid-feedback">{errors.salaire}</div>}
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Département :</label>
                                <select
                                    className={`form-control ${errors.departement ? 'is-invalid' : ''}`}
                                    value={selectedDepartement}
                                    onChange={(e) => setSelectedDepartement(e.target.value)}
                                >
                                    <option value=''>Select Département</option>
                                    {departements.map((departement) => (
                                        <option key={departement.id} value={departement.nom}>
                                            {departement.nom}
                                        </option>
                                    ))}
                                </select>
                                {errors.departement && <div className="invalid-feedback">{errors.departement}</div>}
                            </div>
                            <button className='btn btn-success' onClick={saveOrUpdatePoste}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PosteComponent;
