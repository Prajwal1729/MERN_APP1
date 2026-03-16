import api from './api';

export const loginApi = async(email,password)=>{
    try{
        const response = await api.post('/admin/login',{email,password});
       // console.log(response);
        return response.data;

    }catch(error){
        console.error("Login failed",error);
        throw error;
    }
}