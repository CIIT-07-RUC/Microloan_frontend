import api from './axios';
export class UsersAPI {
	static async register(email, phone, password, passwordConfirmation) {
	  const response = await api.post('/users', { email, phone, password, passwordConfirmation });
	  return response.data;
	}
}