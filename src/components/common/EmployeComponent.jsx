import React, { useState, useEffect } from 'react';
import { createEmploye, getOneEmploye, updateEmploye } from '../service/EmployeService';
import DepartementService from '../service/DepartementService';
import PosteService from '../service/PosteService';
import { useNavigate, useParams } from 'react-router-dom';

const EmployeeComponent = () => {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [adresse, setAdresse] = useState('');
  const [numDeTelephone, setNumDeTelephone] = useState('');
  const [nomDutilisateur, setNomDutilisateur] = useState('');
  const [salaire, setSalaire] = useState('');
  const [departement, setDepartement] = useState('');
  const [dateEmbauche, setDateEmbauche] = useState('');
  const [poste, setPoste] = useState('');
  const [status, setStatus] = useState('');
  const [departements, setDepartements] = useState([]);
  const [postes, setPostes] = useState([]);
  const [filteredPostes, setFilteredPostes] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const [errors, setErrors] = useState({
    nom: '',
    prenom: '',
    email: '',
    motDePasse: '',
    adresse: '',
    numDeTelephone: '',
    nomDutilisateur: '',
    salaire: '',
    departement: '',
    dateEmbauche: '',
    poste: '',
    status: '',
  });

  useEffect(() => {
    DepartementService.getAllDepartements().then((res) => {
      setDepartements(res.data);
    }).catch((error) => {
      console.error('There was an error fetching the departements!', error);
    });

    PosteService.getAllPostes().then((res) => {
      setPostes(res.data);
    }).catch((error) => {
      console.error('There was an error fetching the postes!', error);
    });
  }, []);

  useEffect(() => {
    if (id) {
      getOneEmploye(id).then((response) => {
        setNom(response.data.nom);
        setPrenom(response.data.prenom);
        setEmail(response.data.email);
        setMotDePasse(response.data.motDePasse);
        setNomDutilisateur(response.data.nomDutilisateur);
        setAdresse(response.data.adresse);
        setNumDeTelephone(response.data.numDeTelephone);
        setSalaire(response.data.salaire);
        setDepartement(response.data.departement.nom);
        setDateEmbauche(response.data.dateEmbauche ? new Date(response.data.dateEmbauche).toISOString().split('T')[0] : '');
        setPoste(response.data.poste.titre);
        setStatus(response.data.status);
      }).catch(error => {
        console.error(error);
      });
    }
  }, [id]);

  useEffect(() => {
    if (departement) {
      const filtered = postes.filter(post => post.departement.nom === departement);
      setFilteredPostes(filtered);
    } else {
      setFilteredPostes([]);
    }
  }, [departement, postes]);

  useEffect(() => {
    if (poste) {
      const selectedPoste = postes.find(post => post.titre === poste);
      if (selectedPoste) {
        setSalaire(selectedPoste.salaire); // Assuming 'salaire' is a property of the 'post' object
      }
    }
  }, [poste, postes]);

  const saveOrUpdateEmploye = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const employe = {
        nom,
        prenom,
        email,
        motDePasse,
        adresse,
        nomDutilisateur,
        numDeTelephone,
        salaire,
        departement: { nom: departement },
        dateEmbauche,
        poste: { titre: poste },
        status,
      };
      console.log(employe);

      if (id) {
        updateEmploye(id, employe).then((response) => {
          console.log(response.data);
          navigate('/employes');
        }).catch(error => {
          console.error(error);
        });
      } else {
        createEmploye(employe).then((response) => {
          navigate('/employes');
        }).catch((error) => {
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
    if (prenom.trim()) {
      errorsCopy.prenom = '';
    } else {
      errorsCopy.prenom = 'Prenom is required';
      valid = false;
    }
    if (email.trim()) {
      errorsCopy.email = '';
    } else {
      errorsCopy.email = 'Email is required';
      valid = false;
    }
    if (nomDutilisateur.trim()) {
      errorsCopy.nomDutilisateur = '';
    } else {
      errorsCopy.nomDutilisateur = 'Username is required';
      valid = false;
    }
    if (motDePasse.trim()) {
      errorsCopy.motDePasse = '';
    } else {
      errorsCopy.motDePasse = 'MotDePasse is required';
      valid = false;
    }
    if (adresse.trim()) {
      errorsCopy.adresse = '';
    } else {
      errorsCopy.adresse = 'Adresse is required';
      valid = false;
    }
    if (numDeTelephone.trim()) {
      errorsCopy.numDeTelephone = '';
    } else {
      errorsCopy.numDeTelephone = 'Number phone is required';
      valid = false;
    }
    
    if (salaire.toString().trim()) {
      errorsCopy.salaire = '';
    } else {
      errorsCopy.salaire = 'Salaire is required';
      valid = false;
    }
    if (departement.trim()) {
      errorsCopy.departement = '';
    } else {
      errorsCopy.departement = 'Departement is required';
      valid = false;
    }
    if (dateEmbauche.trim()) {
      errorsCopy.dateEmbauche = '';
    } else {
      errorsCopy.dateEmbauche = 'Hire date is required';
      valid = false;
    }
    if (poste.trim()) {
      errorsCopy.poste = '';
    } else {
      errorsCopy.poste = 'Poste is required';
      valid = false;
    }
    if (status.trim()) {
      errorsCopy.status = '';
    } else {
      errorsCopy.status = 'Status is required';
      valid = false;
    }

    setErrors(errorsCopy);
    return valid;
  };

  const pageTitle = () => {
    if (id) {
      return <h2 className='text-center'>Update Employee</h2>;
    } else {
      return <h2 className='text-center'>Add Employee</h2>;
    }
  };

  return (
    <div className='container'>
      <br /><br />
      <div className='row'>
        <div className='card col-md-6 offset-md-3 offset-md-3'>
          {pageTitle()}
          <div className='card-body'>
            <form>
              <div className='form-group mb-2'>
                <label className='form-label'>Last Name :</label>
                <input
                  type='text'
                  placeholder='Enter employee last name'
                  name='nom'
                  value={nom}
                  className={`form-control ${errors.nom ? 'is-invalid' : ''}`}
                  onChange={(e) => setNom(e.target.value)}
                />
                {errors.nom && <div className="invalid-feedback">{errors.nom}</div>}
              </div>
              <div className='form-group mb-2'>
                <label className='form-label'>First Name :</label>
                <input
                  type='text'
                  placeholder='Enter employee first name'
                  name='prenom'
                  value={prenom}
                  className={`form-control ${errors.prenom ? 'is-invalid' : ''}`}
                  onChange={(e) => setPrenom(e.target.value)}
                />
                {errors.prenom && <div className="invalid-feedback">{errors.prenom}</div>}
              </div>
              <div className='form-group mb-2'>
                <label className='form-label'>Email :</label>
                <input
                  type='text'
                  placeholder='Enter employee email'
                  name='email'
                  value={email}
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>
              <div className='form-group mb-2'>
                <label className='form-label'>Password :</label>
                <input
                  type='password'
                  placeholder='Enter employee password'
                  name='motDePasse'
                  value={motDePasse}
                  className={`form-control ${errors.motDePasse ? 'is-invalid' : ''}`}
                  onChange={(e) => setMotDePasse(e.target.value)}
                />
                {errors.motDePasse && <div className="invalid-feedback">{errors.motDePasse}</div>}
              </div>
              <div className='form-group mb-2'>
                <label className='form-label'>Address :</label>
                <input
                  type='text'
                  placeholder='Enter employee address'
                  name='adresse'
                  value={adresse}
                  className={`form-control ${errors.adresse ? 'is-invalid' : ''}`}
                  onChange={(e) => setAdresse(e.target.value)}
                />
                {errors.adresse && <div className="invalid-feedback">{errors.adresse}</div>}
              </div>
              <div className='form-group mb-2'>
                <label className='form-label'>Phone Number :</label>
                <input
                  type='text'
                  placeholder='Enter employee phone number'
                  name='numDeTelephone'
                  value={numDeTelephone}
                  className={`form-control ${errors.numDeTelephone ? 'is-invalid' : ''}`}
                  onChange={(e) => setNumDeTelephone(e.target.value)}
                />
                {errors.numDeTelephone && <div className="invalid-feedback">{errors.numDeTelephone}</div>}
              </div>
              <div className='form-group mb-2'>
                <label className='form-label'>Salary :</label>
                <input
                  type='text'
                  placeholder='Enter employee salary'
                  name='salaire'
                  value={salaire}
                  readOnly
                  className={`form-control ${errors.salaire ? 'is-invalid' : ''}`}
                />
                {errors.salaire && <div className="invalid-feedback">{errors.salaire}</div>}
              </div>
              <div className='form-group mb-2'>
                <label className='form-label'>Department :</label>
                <select
                  className={`form-control ${errors.departement ? 'is-invalid' : ''}`}
                  value={departement}
                  onChange={(e) => setDepartement(e.target.value)}
                >
                  <option value=''>Select Department</option>
                  {departements.map((dep) => (
                    <option key={dep.id} value={dep.nom}>
                      {dep.nom}
                    </option>
                  ))}
                </select>
                {errors.departement && <div className="invalid-feedback">{errors.departement}</div>}
              </div>
              <div className='form-group mb-2'>
                <label className='form-label'>Username :</label>
                <input
                  type='text'
                  placeholder='Enter username'
                  name='nomDutilisateur'
                  value={nomDutilisateur}
                  className={`form-control ${errors.nomDutilisateur ? 'is-invalid' : ''}`}
                  onChange={(e) => setNomDutilisateur(e.target.value)}
                />
                {errors.nomDutilisateur && <div className="invalid-feedback">{errors.nomDutilisateur}</div>}
              </div>
              <div className='form-group mb-2'>
                <label className='form-label'>Date of Hire :</label>
                <input
                  type='date'
                  name='dateEmbauche'
                  value={dateEmbauche}
                  className={`form-control ${errors.dateEmbauche ? 'is-invalid' : ''}`}
                  onChange={(e) => setDateEmbauche(e.target.value)}
                />
                {errors.dateEmbauche && <div className="invalid-feedback">{errors.dateEmbauche}</div>}
              </div>
              <div className='form-group mb-2'>
                <label className='form-label'>Position :</label>
                <select
                  className={`form-control ${errors.poste ? 'is-invalid' : ''}`}
                  value={poste}
                  onChange={(e) => setPoste(e.target.value)}
                >
                  <option value=''>Select Position</option>
                  {filteredPostes.map((post) => (
                    <option key={post.id} value={post.titre}>
                      {post.titre}
                    </option>
                  ))}
                </select>
                {errors.poste && <div className="invalid-feedback">{errors.poste}</div>}
              </div>
              <div className='form-group mb-2'>
                <label className='form-label'>Status :</label>
                <input
                  type='text'
                  placeholder='Enter employee status'
                  name='status'
                  value={status}
                  className={`form-control ${errors.status ? 'is-invalid' : ''}`}
                  onChange={(e) => setStatus(e.target.value)}
                />
                {errors.status && <div className="invalid-feedback">{errors.status}</div>}
              </div>
              <button className='btn btn-success' onClick={saveOrUpdateEmploye}>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeComponent;
