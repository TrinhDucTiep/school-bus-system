import apiClient from "@/config/axiosClient";
import { useMutation, useQuery, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { NextRouter } from "next/router";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Cookies from 'js-cookie';

const login = async (data: ILoginData) => {
    const response = await apiClient.post<ICommonResponse<ILoginResponse>>('/api/v1/auth/login', data);
    return response.data;
};

const signup = async (data: ISignUpData) => {
    await apiClient.post('/api/v1/auth/signup', data);
}

export const useHandleLogin = (callback: AppRouterInstance) => {
    return useMutation(
        {
            mutationFn: (data: ILoginData) => login(data),
            onSuccess: (result) => {
                if (result.message) {
                    console.log("222222222222222222222", result);
                    // extract role from token
                    const accessToken = result.result.accessToken;
                    const refreshToken = result.result.refreshToken;

                    const decodedToken = jwtDecode(accessToken) as { [key: string]: any };
                    const role = decodedToken.role.toLowerCase();

                    // set to cookie
                    Cookies.set('accessToken', accessToken);
                    Cookies.set('refreshToken', refreshToken);

                    // redirect to role home page
                    toast.success(result.message);
                    callback.push(`/${role}`);
                } else {
                    toast.error(result.message);
                }
            },
            onError: (error: any) => {
                console.log("1111111111111111111", error);
                if (error.response && error.response.data && typeof error.response.data === 'object') {
                    const response: ICommonResponse<any> = error.response.data;
                    toast.error(error.response.data.message || 'An error occurred')
                } else {
                    // Handle any other errors
                    toast.error('An error occurred', error)
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
            },
            onError: (error: AxiosError) => {
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