import api from './AxiosMain.js';

export class UsersAPI {
	static async register(email, phone, password, confirmPassword, isInvestor) {
	  const response = await api.post('/users', { "emailAdress": email, "phoneNumber": phone, "password": password, "confirmPassword": confirmPassword, "isinvesstor":isInvestor });
	  return response.data;
	}

	static async login(email, password) {
	  const response = await api.post('/users/login', { "emailAdress": email, "password": password});
	  return response.data;
	}

	static async allUsers() {
		const response = await api.get('/users/all-users');
		return response.data;
	}

	static async getUserById(id) {
		const response = await api.get('/users/' + id);
		return response.data;
	}
}