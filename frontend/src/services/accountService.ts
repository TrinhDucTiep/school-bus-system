import apiClient from "@/config/axiosClient";
import { queryClient } from "@/providers/TanstackProvider";
import { useMutation, useQuery, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

const getListParent = async (params: IGetListParentParams) => {
    const response = await apiClient.get<ICommonResponse<Page<IParent>>>('/api/v1/admin/account/pagination', { params });
    return response.data;
}
export const useGetListParent = (params: IGetListParentParams) => {
    return useQuery<ICommonResponse<Page<IParent>>, AxiosError>({
        queryKey: ['parentList', params],
        queryFn: () => getListParent(params)
    });
};

const addParent = async (data: IParent) => {
    const response = await apiClient.post('/api/v1/admin/account', data);
    return response.data;
}
export const useAddParent = () => {
    return useMutation(
        {
            mutationFn: (data: IParent) => addParent(data),
            onSuccess: (result) => {
                queryClient.invalidateQueries({ queryKey: ['parentList'] });
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

const updateParent = async (data: IParent) => {
    const response = await apiClient.put('/api/v1/admin/account', data);
    return response.data;
}
export const useUpdateParent = () => {
    return useMutation(
        {
            mutationFn: (data: IParent) => updateParent(data),
            onSuccess: (result) => {
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

const deleteParent = async (id: number) => {
    const response = await apiClient.delete(`/api/v1/admin/account`, { data: { id } });
    return response.data;
}
export const useDeleteBus = () => {
    return useMutation(
        {
            mutationFn: (id: number) => deleteParent(id),
            onSuccess: (result) => {
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