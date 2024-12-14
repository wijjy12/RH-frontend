import axios from 'axios';

const CANDIDAT_API_BASE_URL = "http://localhost:8086/candidats";

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};

class CandidatService {
    getAllCandidats() {
        return axios.get(CANDIDAT_API_BASE_URL, getAuthHeaders());
    }

    deleteCandidat(candidatId) {
        return axios.delete(`${CANDIDAT_API_BASE_URL}/candidats/delete/${id}`, getAuthHeaders());
    }

    getCv(id) {
        return axios.get(`${CANDIDAT_API_BASE_URL}/candidats/cv/${id}`, { responseType: 'blob' },getAuthHeaders());
    }


}

export default new CandidatService();
