import apiClient from "@/config/axiosClient";
import { queryClient } from "@/providers/TanstackProvider";
import { useMutation, useQuery, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

const getListBus = async (params: IGetListBusParams) => {
    const response = await apiClient.get<ICommonResponse<Page<IBusTable>>>('/api/v1/admin/bus/pagination', { params });
    return response.data;
}
export const useGetListBus = (params: IGetListBusParams) => {
    return useQuery<ICommonResponse<Page<IBusTable>>, AxiosError>({
        queryKey: ['busList', params],
        queryFn: () => getListBus(params)
    });
};

const addBus = async (data: IBus) => {
    const response = await apiClient.post('/api/v1/admin/bus', data);
    return response.data;
}
export const useAddBus = (callback: any) => {
    return useMutation(
        {
            mutationFn: (data: IBus) => addBus(data),
            onSuccess: (result) => {
                callback();
                queryClient.invalidateQueries({ queryKey: ['busList'] });
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

const updateBus = async (data: IBus) => {
    const response = await apiClient.put('/api/v1/admin/bus', data);
    return response.data;
}
export const useUpdateBus = (callback: any) => {
    return useMutation(
        {
            mutationFn: (data: IBus) => updateBus(data),
            onSuccess: (result) => {
                callback();
                queryClient.invalidateQueries({ queryKey: ['busList'] });
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

const deleteBus = async (id: number) => {
    const response = await apiClient.delete(`/api/v1/admin/bus`, { data: { id } });
    return response.data;
}
export const useDeleteBus = (callback: any) => {
    return useMutation(
        {
            mutationFn: (id: number) => deleteBus(id),
            onSuccess: (result) => {
                callback();
                queryClient.invalidateQueries({ queryKey: ['busList'] });
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
}