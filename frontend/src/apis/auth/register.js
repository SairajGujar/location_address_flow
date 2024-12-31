import axios from "axios";


export const register = async (data) => {
    try {
        const response = await axios.post(`${process.env.BASE_URL}/api/auth/register`, data);
        return response.data
    } catch (error) {
        console.log(error.message);
    }
}