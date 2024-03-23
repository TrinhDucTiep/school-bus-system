import apiClient from "@/config/axiosClient";
import { useMutation, useQuery, UseMutationOptions } from "@tanstack/react-query";
import { toast } from "react-toastify";

const login = async (data: ILoginData) => {
    const response = await apiClient.post<ICommonResponse<ILoginResponse>>('/api/v1/auth/login', data);
    return response.data;
};

const signup = async (data: ISignUpData) => {
    await apiClient.post('/api/v1/auth/signup', data);
}

export const useHandleLogin = () => {
    return useMutation(
        {
            mutationFn: (data: ILoginData) => login(data),
            onSuccess: (result) => {
                if (result.message) {
                    toast.success(result.message);
                } else {
                    toast.error(result.message);
                }
            }
        }
    )
};

export const useHandlerSignup = () => {
    return useMutation(
        {
            mutationFn: (data: ISignUpData) => signup(data),
            onSuccess: (result) => {
                toast.success("Signup successfully! Please login to continue!");
            }
        }
    )
}