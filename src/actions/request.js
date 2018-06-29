import axios from 'axios';

//dev
//export const API_URL = 'http://127.0.0.1:8000';
//production
export const API_URL = 'http://verify.encuestasbc.org';


export const request = axios.create({
	baseURL 		: API_URL,
	responseType 	: 'json'
});

export const api = () => {

	let token = localStorage.getItem('session_token_nimblin');

	token = JSON.parse(token);

	let AuthorizationToken = token.token_type+" "+token.access_token;

	return axios.create({
		baseURL 		: API_URL,
		responseType 	: 'json',
		headers 		: {'Authorization': AuthorizationToken }
	});

}