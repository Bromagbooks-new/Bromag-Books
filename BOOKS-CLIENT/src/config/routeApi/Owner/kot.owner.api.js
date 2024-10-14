
import { restaurantOwnerAxiosInstance } from "@/config/apiInterceptor"
const url1 = "api/v1/kot"

const GetKotUniqueIdAPI = async (data) => {
    try {
        console.log('data:', data)
        const response = await restaurantOwnerAxiosInstance.post(`${url1}/get-kot-unique-id`, data);
        return response;
    } catch(error) {
        console.error("error in GetKotUniqueIdAPI :", error);
        throw error;
    }
    
}


const CreateNewKotAPI = async (data) => {
    try {
        const response = await restaurantOwnerAxiosInstance.post(`${url1}/create-new-kot`, data);
        return response;
    } catch(error) {
        console.error("error in CreateNewKotAPI :", error);
        throw error;
    }
}

export {
    GetKotUniqueIdAPI,
    CreateNewKotAPI
}