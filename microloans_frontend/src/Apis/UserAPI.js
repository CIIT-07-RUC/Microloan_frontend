import api from './AxiosMain.js';

export class UsersAPI {
	static async register(email, phone, password, confirmPassword) {
		console.log("email, phone, password, passwordConfirmation", email, phone, password, confirmPassword)
	  const response = await api.post('/users', { "emailAdress": email, "phoneNumber": phone, "password": password, "confirmPassword": confirmPassword });
	  return response.data;
	}
}