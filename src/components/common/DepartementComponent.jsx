import React, { useState, useEffect } from 'react';
import DepartementService from '../service/DepartementService';
import { useNavigate, useParams } from 'react-router-dom';

const DepartementComponent = () => {
    const [nom, setNom] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    const [errors, setErrors] = useState({
        nom: '',
        description: '',
    });

    useEffect(() => {
        if (id) {
            DepartementService.getOneDepartement(id)
                .then((response) => {
                    setNom(response.data.nom);
                    setDescription(response.data.description);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [id]);

    const saveOrUpdateDepartement = (e) => {
        e.preventDefault();
        if (validateForm()) {
            const departement = {
                nom,
                description,
            };

            if (id) {
                DepartementService.updateDepartement(id, departement)
                    .then((response) => {
                        navigate('/departements');
                    })
                    .catch((error) => {
                        console.error('There was an error!', error);
                    });
            } else {
                DepartementService.createDepartement(departement)
                    .then((response) => {
                        navigate('/departements');
                    })
                    .catch((error) => {
                        console.error('There was an error!', error);
                    });
            }
        }
    };

    const validateForm = () => {
        let valid = true;
        const errorsCopy = { ...errors };

        if (nom.trim()) {
            errorsCopy.nom = '';
        } else {
            errorsCopy.nom = 'Nom is required';
            valid = false;
        }

        if (description.trim()) {
            errorsCopy.description = '';
        } else {
            errorsCopy.description = 'Description is required';
            valid = false;
        }

        setErrors(errorsCopy);
        return valid;
    };

    const pageTitle = () => {
        if (id) {
            return <h2 className='text-center'>Update Departement</h2>;
        } else {
            return <h2 className='text-center'>Add Departement</h2>;
        }
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
                                <label className='form-label'>Nom :</label>
                                <input
                                    type='text'
                                    placeholder='Enter Departement name'
                                    name='nom'
                                    value={nom}
                                    className={`form-control ${errors.nom ? 'is-invalid' : ''}`}
                                    onChange={(e) => setNom(e.target.value)}
                                />
                                {errors.nom && <div className="invalid-feedback">{errors.nom}</div>}
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Description :</label>
                                <input
                                    type='text'
                                    placeholder='Enter Departement description'
                                    name='description'
                                    value={description}
                                    className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                                {errors.description && <div className="invalid-feedback">{errors.description}</div>}
                            </div>
                            <button className='btn btn-success' onClick={saveOrUpdateDepartement}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DepartementComponent;
