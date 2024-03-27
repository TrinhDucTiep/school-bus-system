import apiClient from "@/config/axiosClient";
import { queryClient } from "@/providers/TanstackProvider";
import { useMutation, useQuery, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

const getListParent = async (params: IGetListParentParams) => {
    const response = await apiClient.get<ICommonResponse<Page<IParent>>>('/api/v1/admin/account/parent/pagination', { params });
    return response.data;
}
export const useGetListParent = (params: IGetListParentParams) => {
    return useQuery<ICommonResponse<Page<IParent>>, AxiosError>({
        queryKey: ['parentList', params],
        queryFn: () => getListParent(params)
    });
};

const addParent = async (data: IParentAdd) => {
    const response = await apiClient.post('/api/v1/admin/account/parent', data);
    return response.data;
}
export const useAddParent = () => {
    return useMutation(
        {
            mutationFn: (data: IParentAdd) => addParent(data),
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
    const response = await apiClient.put('/api/v1/admin/account/parent', data);
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
    const response = await apiClient.delete(`/api/v1/admin/account/parent`, { data: { id } });
    return response.data;
}
export const useDeleteParent = () => {
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


//student 

const getListStudent = async (params: IGetListStudentParams) => {
    const response = await apiClient.get<ICommonResponse<Page<IStudent>>>('/api/v1/admin/account/student/pagination', { params });
    return response.data;
}
export const useGetListStudent = (params: IGetListStudentParams) => {
    return useQuery<ICommonResponse<Page<IStudent>>, AxiosError>({
        queryKey: ['studentList', params],
        queryFn: () => getListStudent(params)
    });
};

const addStudent = async (data: IStudent) => {
    const response = await apiClient.post('/api/v1/admin/account/student', data);
    return response.data;
}
export const useAddStudent = () => {
    return useMutation(
        {
            mutationFn: (data: IStudent) => addStudent(data),
            onSuccess: (result) => {
                queryClient.invalidateQueries({ queryKey: ['studentList'] });
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

const updateStudent = async (data: IStudent) => {
    const response = await apiClient.put('/api/v1/admin/student/parent', data);
    return response.data;
}
export const useUpdateStudent = () => {
    return useMutation(
        {
            mutationFn: (data: IStudent) => updateStudent(data),
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

const deleteStudent = async (id: number) => {
    const response = await apiClient.delete(`/api/v1/admin/student/parent`, { data: { id } });
    return response.data;
}
export const useDeleteStudent = () => {
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