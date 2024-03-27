import apiClient from "@/config/axiosClient";
import { queryClient } from "@/providers/TanstackProvider";
import { useMutation, useQuery, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

const getListEmployee = async (params: IGetListEmployeeParams) => {
    const response = await apiClient.get<ICommonResponse<Page<IEmployeeTable>>>('/api/v1/admin/employee/pagination', { params });
    return response.data;
}
export const useGetListEmployee = (params: IGetListEmployeeParams) => {
    return useQuery<ICommonResponse<Page<IEmployeeTable>>, AxiosError>({
        queryKey: ['employeeList', params],
        queryFn: () => getListEmployee(params)
    });
};

const addEmployee = async (data: IAddEmployee) => {
    const response = await apiClient.post('/api/v1/admin/employee', data);
    return response.data;
}
export const useAddEmployee = () => {
    return useMutation(
        {
            mutationFn: (data: IAddEmployee) => addEmployee(data),
            onSuccess: (result) => {
                queryClient.invalidateQueries({ queryKey: ['employeeList'] });
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

const updateEmployee = async (data: IEmployee) => {
    const response = await apiClient.put('/api/v1/admin/employee', data);
    return response.data;
}
export const useUpdateEmployee = () => {
    return useMutation(
        {
            mutationFn: (data: IEmployee) => updateEmployee(data),
            onSuccess: (result) => {
                queryClient.invalidateQueries({ queryKey: ['employeeList'] });
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

const deleteEmployee = async (id: number) => {
    const response = await apiClient.delete<ICommonResponse<any>>(`/api/v1/admin/employee/${id}`);
    return response.data;
}
export const useDeleteEmployee = () => {
    return useMutation(
        {
            mutationFn: (id: number) => deleteEmployee(id),
            onSuccess: (result) => {
                queryClient.invalidateQueries({ queryKey: ['employeeList'] });
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