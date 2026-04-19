import api from "./api";

export const sendOTP = async(email)=>{
    try{
      const response = await api.post('/sendOTP',{email});
      console.log(response,"loginotp");
      return response.data;

    }catch(error){
        console.log(error);
        throw error;
    }
}

export const verifyOTP = async(email,otp)=>{
    try{
        const response = await api.post('/verifyOTP',{email,otp});
        console.log(response,"verifyotp");
        return response.data;
    }catch(error){
        console.log(error);
        throw error;
    }
}