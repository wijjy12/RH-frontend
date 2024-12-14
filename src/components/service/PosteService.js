import axios from 'axios';

const POSTE_API_BASE_URL = "http://localhost:8086/postes";

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};

class PosteService {
    getAllPostes() {
        return axios.get(POSTE_API_BASE_URL, getAuthHeaders());
    }

    createPoste(poste) {
        return axios.post(POSTE_API_BASE_URL, poste, getAuthHeaders());
    }

    getOnePoste(id) {
        return axios.get(`${POSTE_API_BASE_URL}/${id}`, getAuthHeaders());
    }

    updatePoste(id, poste) {
        return axios.put(`${POSTE_API_BASE_URL}/${id}`, poste, getAuthHeaders());
    }

    deletePoste(id) {
        return axios.delete(`${POSTE_API_BASE_URL}/${id}`, getAuthHeaders());
    }
}

export default new PosteService();
