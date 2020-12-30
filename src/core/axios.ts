import axios from 'axios';
import environment from './environment';


const api = axios.create({
    baseURL: environment.API_BASE
});

api.defaults.withCredentials = true;

export default api;