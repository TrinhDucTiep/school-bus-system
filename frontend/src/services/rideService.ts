import apiClient from "@/config/axiosClient";
import { queryClient } from "@/providers/TanstackProvider";
import { useMutation, useQuery, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

// add ride
export const addRide = async (data: IAddRideRequest) => {
    const response = await apiClient.post('/api/v1/admin/ride', data);
    return response.data;
}
export const useAddRide = (callback: any) => {
    return useMutation(
        {
            mutationFn: (data: IAddRideRequest) => addRide(data),
            onSuccess: (result) => {
                callback();
                queryClient.invalidateQueries({ queryKey: ['rideList'] });
                toast.success(result.message);
            },
            onError: (error: any) => {
                if (error.response && error.response.data && typeof error.response.data === 'object') {
                    const response: ICommonResponse<any> = error.response.data;
                    toast.error(error.response.data.message || 'An error occurred')
                } else {
                    // Handle any other errors
                    toast.error('An error occurred')
                }
            }
        }
    )
};