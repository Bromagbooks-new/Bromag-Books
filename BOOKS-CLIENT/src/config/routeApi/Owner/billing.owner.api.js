
import { restaurantOwnerAxiosInstance } from "@/config/apiInterceptor"
const url1 = "api/v1/billing";

const UpdateBillWithCompleteStatusAPI = async (data) => {
    try {
        const response = await restaurantOwnerAxiosInstance.put(`${url1}/update-bill-with-complete-status`, data);
        return response;
    } catch(error) {
        console.error("error in GetKotUniqueIdAPI :", error);
        throw error;
    }
    
}

const UpdateBillWithHoldStatusAPI = async (data) => {
    try {
        const response = await restaurantOwnerAxiosInstance.put(`${url1}/update-bill-with-hold-status`, data);
        return response;
    } catch(error) {
        console.error("error in UpdateBillWithHoldStatusAPI :", error);
        throw error;
    }
}

const DeleteOrderBillAPI = async (billId) => {
    try {
        const response = await restaurantOwnerAxiosInstance.delete(`${url1}/delete-order-bill/${billId}`);
        return response;
    } catch(error) {
        console.error("error in DeleteOrderBillAPI :", error);
        throw error;
    }
}

export {
    UpdateBillWithCompleteStatusAPI,
    UpdateBillWithHoldStatusAPI,
    DeleteOrderBillAPI
}