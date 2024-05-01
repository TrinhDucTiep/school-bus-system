import apiClient from "@/config/axiosClient";
import { queryClient } from "@/providers/TanstackProvider";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

const getListManipulatePickupPoint = async () => {
    const response = await apiClient.get<ICommonResponse<IManipulatePickupPointOutput>>('/api/v1/employee/pickup-point/manipulate');
    return response.data;
}
export const useGetListManipulatePickupPoint = () => {
    return useQuery<ICommonResponse<IManipulatePickupPointOutput>, AxiosError>({
        queryKey: ['manipulatePickupPoint'],
        queryFn: () => getListManipulatePickupPoint()
    });
};

// update bus
const updateEmployeeBus = async (data: IEmployeeUpdateBusRequest) => {
    const response = await apiClient.put('/api/v1/employee/bus', data);
    return response.data;
}
export const useUpdateEmployeeBus = (callback: any) => {
    return useMutation(
        {
            mutationFn: (data: IEmployeeUpdateBusRequest) => updateEmployeeBus(data),
            onSuccess: (result) => {
                callback();
                queryClient.invalidateQueries({ queryKey: ['manipulatePickupPoint'] });
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

// update ride
const updateEmployeeRide = async (data: IEmployeeUpdateBusRequest) => {
    const response = await apiClient.put('/api/v1/employee/ride', data);
    return response.data;
}
export const useUpdateEmployeeRide = (callback: any) => {
    return useMutation(
        {
            mutationFn: (data: IEmployeeUpdateBusRequest) => updateEmployeeRide(data),
            onSuccess: (result) => {
                callback();
                queryClient.invalidateQueries({ queryKey: ['manipulatePickupPoint'] });
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

// update ride pickup point
const updateEmployeeRidePickupPoint = async (data: IEmployeeUpdateRidePickupPointRequest) => {
    const response = await apiClient.put('/api/v1/employee/ride-pickup-point', data);
    return response.data;
}
export const useUpdateEmployeeRidePickupPoint = (callback: any) => {
    return useMutation(
        {
            mutationFn: (data: IEmployeeUpdateRidePickupPointRequest) => updateEmployeeRidePickupPoint(data),
            onSuccess: (result) => {
                callback();
                queryClient.invalidateQueries({ queryKey: ['manipulatePickupPoint'] });
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

// update student pickup point
const updateEmployeeStudentPickupPoint = async (data: IEmployeeUpdateStudentPickupPointRequest) => {
    const response = await apiClient.put('/api/v1/employee/student-pickup-point', data);
    return response.data;
}
export const useUpdateEmployeeStudentPickupPoint = (callback: any) => {
    return useMutation(
        {
            mutationFn: (data: IEmployeeUpdateStudentPickupPointRequest) => updateEmployeeStudentPickupPoint(data),
            onSuccess: (result) => {
                callback();
                queryClient.invalidateQueries({ queryKey: ['manipulatePickupPoint'] });
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