import axios from 'axios';

export const api = axios.create({
	baseURL: process.env.FRONT_END_URL,
});
