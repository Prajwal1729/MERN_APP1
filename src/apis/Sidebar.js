import api from './api';

export const leftMenu = async() =>{
   try{
    const response = await api.get('/admin/menu');
    //console.log(response,"menudata")
    return response.data;

   }catch(error){
     console.log(error);
     throw error;
   }
}