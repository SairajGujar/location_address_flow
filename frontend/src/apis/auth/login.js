import axios from 'axios'

export const login = async (data)=>{
    try {
        const response = await axios.post(`${process.env.BASE_URL}/api/auth/login`, data);
        return response.data
    } catch (error) {
        console.log(error.message);
    }
}