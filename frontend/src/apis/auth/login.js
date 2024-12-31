import axios from 'axios'

export const login = async (data)=>{
    try {
        const response = await axios.post(`${process.env.BASE_URL}/api/auth/login`, data);
        localStorage.setItem('token', response.data.token);
        return response.data
    } catch (error) {
        console.log(error.message);
    }
}