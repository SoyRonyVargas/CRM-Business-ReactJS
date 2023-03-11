import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'http://localhost:4000',
    headers: {
        'Apollo-Require-Preflight': 'true'
    }
})

export default axiosInstance