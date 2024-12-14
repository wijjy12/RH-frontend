import axios from "axios";

class UserService {
    static BASE_URL = "http://localhost:8086";

    static async login(email, password) {
        try {
            const response = await axios.post(`${UserService.BASE_URL}/auth/login`, { email, password });
            const token = response.data.token;
            localStorage.setItem('token', token); // Store token for further use
            localStorage.setItem('role', response.data.role); // Store role
            localStorage.setItem('user', JSON.stringify(response.data)); // Store user data
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async registerCandidat(candidatData) {
        try {
            const response = await axios.post(`${UserService.BASE_URL}/candidats`, candidatData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async getAllUsers(token) {
        try {
            const response = await axios.get(`${UserService.BASE_URL}/admin/get-all-users`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async getYourProfile(token) {
        try {
            const response = await axios.get(`${UserService.BASE_URL}/adminuser/get-profile`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log('Profile data:', response.data); // Debugging log
            return response.data;
        } catch (err) {
            console.error('Error fetching profile:', err); // Debugging log
            throw err;
        }
    }

    static async getUserById(userId, token) {
        try {
            const response = await axios.get(`${UserService.BASE_URL}/admin/get-users/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async deleteUser(userId, token) {
        try {
            const response = await axios.delete(`${UserService.BASE_URL}/admin/delete/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async updateUser(userId, userData, token) {
        try {
            const response = await axios.put(`${UserService.BASE_URL}/admin/update/${userId}`, userData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    /**AUTHENTICATION CHECKER */
    static logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
    }

    static isAuthenticated() {
        const token = localStorage.getItem('token');
        return !!token;
    }

    static isAdmin() {
        const role = localStorage.getItem('role');
        return role === 'ADMIN';
    }

    static isEmploye() {
        const role = localStorage.getItem('role');
        return role === 'EMPLOYE';
    }

    static isEmployeRH() {
        const role = localStorage.getItem('role');
        return role === 'EMPLOYERH';
    }

    static isCandidat() {
        const role = localStorage.getItem('role');
        return role === 'CANDIDAT';
    }

    static adminOnly() {
        return this.isAuthenticated() && this.isAdmin();
    }
}

export default UserService;
