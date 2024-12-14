import axios from 'axios';

const DEPARTEMENT_API_BASE_URL = "http://localhost:8086/departements";

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};

class DepartementService {
    getAllDepartements() {
        return axios.get(DEPARTEMENT_API_BASE_URL, getAuthHeaders());
    }

    createDepartement(departement) {
        return axios.post(DEPARTEMENT_API_BASE_URL, departement, getAuthHeaders());
    }

    getOneDepartement(id) {
        return axios.get(`${DEPARTEMENT_API_BASE_URL}/${id}`, getAuthHeaders());
    }

    updateDepartement(id, departement) {
        return axios.put(`${DEPARTEMENT_API_BASE_URL}/${id}`, departement, getAuthHeaders());
    }

    deleteDepartement(id) {
        return axios.delete(`${DEPARTEMENT_API_BASE_URL}/${id}`, getAuthHeaders());
    }
}

export default new DepartementService();
