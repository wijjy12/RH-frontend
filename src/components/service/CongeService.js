import axios from 'axios';

const CONGE_API_BASE_URL = "http://localhost:8086/conges";

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};

class CongeService {
    getAllDemandesConge() {
        return axios.get(`${CONGE_API_BASE_URL}/all`, getAuthHeaders());
    }

    demanderConge(conge) {
        return axios.post(`${CONGE_API_BASE_URL}/demande`, conge, getAuthHeaders());
    }

    getDemandesCongeByEmploye(employeId) {
        return axios.get(`${CONGE_API_BASE_URL}/employe/${employeId}`, getAuthHeaders());
    }

    getCongesApprouvesPourPeriode(employeId, fromDate, toDate) {
        return axios.get(`${CONGE_API_BASE_URL}/${employeId}/approuves`, {
            ...getAuthHeaders(),
            params: {
                fromDate: fromDate,
                toDate: toDate
            }
        });
    }

    getCongesNonApprouvesPourPeriode(employeId, fromDate, toDate) {
        return axios.get(`${CONGE_API_BASE_URL}/${employeId}/non-approuves`, {
            ...getAuthHeaders(),
            params: {
                fromDate: fromDate,
                toDate: toDate
            }
        });
    }

    getCongesNonApprouvesPourEmploye(employeId) {
        return axios.get(`${CONGE_API_BASE_URL}/non-approuves/${employeId}`, getAuthHeaders());
    }

    approveConge(id) {
        return axios.put(`${CONGE_API_BASE_URL}/${id}/approve`, {}, getAuthHeaders());
    }

    rejectConge(id) {
        return axios.put(`${CONGE_API_BASE_URL}/${id}/reject`, {}, getAuthHeaders());
    }
}

export default new CongeService();
