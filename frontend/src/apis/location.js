import axios from 'axios'

export async function createAddress(address){
    try {
        const response = await axios.post(`${import.meta.env.BASE_URL}/api/address/save`, address, {
            Headers:{
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })

        return response;
    } catch (error) {
        console.log(error.message);
        return null;
    }
}

export async function updateAddress(address, id){
    try {
        const response = await axios.put(`${import.meta.env.BASE_URL}/api/address/update/${id}`, address, {
            Headers:{
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        return response;
    } catch (error) {
        console.log(error.message);
        return null;
    }
}

export async function deleteAddress(id){
    try {
        const response = await axios.delete(`${import.meta.env.BASE_URL}/api/address/delete/${id}`, {
            Headers:{
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        return response;
    } catch (error) {
        console.log(error);
        return null;
    }
}