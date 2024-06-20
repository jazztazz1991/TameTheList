import axios from 'axios';

const baseUrl = 'http://localhost:3001';
// const baseUrl = 'https://tame-the-list.onrender.com';

const instance = axios.create({
    baseURL: baseUrl,
    timeout: 15000
})


export default instance;