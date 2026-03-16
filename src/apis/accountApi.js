import api from './api';

export const accountApi = async(email,password)=>{
     try{
        const response = await api.post('/admin/createaccount',{email,password});
        console.log(response);
        return response.data;
     }catch(error){
        console.log(error);
        throw error;
     }
}