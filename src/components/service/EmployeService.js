import axios from 'axios';

const REST_API_BASE_URL = 'http://localhost:8086/employes';

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};

export const getAllEmployes = () => axios.get(REST_API_BASE_URL, getAuthHeaders());

export const createEmploye = (employe) => axios.post(REST_API_BASE_URL, employe, getAuthHeaders());

export const getOneEmploye = (id) => axios.get(`${REST_API_BASE_URL}/${id}`, getAuthHeaders());

export const updateEmploye = (id, employe) => axios.put(`${REST_API_BASE_URL}/${id}`, employe, getAuthHeaders());

export const deleteEmploye = (id) => axios.delete(`${REST_API_BASE_URL}/${id}`, getAuthHeaders());
