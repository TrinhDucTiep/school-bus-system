import apiMap from "@/config/axiosApiMap";
import { queryClient } from "@/providers/TanstackProvider";
import { useMutation, useQuery, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import qs from 'qs';

// autocomplete
const getAutoComplete = async (params: IAutoCompleteParams) => {
    if (params.text === '' || params.text === null || params.text === undefined) {
        return {
            features: [],
            type: ''
        };
    }

    const response = await apiMap.get<IAutoCompleteGetResponse>('/geocode/autocomplete', {
        params,
        paramsSerializer: params => qs.stringify(params, { allowDots: true })
    });
    return response.data;
}
export const useGetAutoComplete = (params: IAutoCompleteParams) => {
    return useQuery<IAutoCompleteGetResponse, AxiosError>({
        queryKey: ['autoComplete', params],
        queryFn: () => getAutoComplete(params)
    });
};

// search
const getSearch = async (params: ISearchParams) => {
    const response = await apiMap.get<ISearchGetResponse>('/geocode/search', {
        params,
        paramsSerializer: params => qs.stringify(params, { allowDots: true })
    });
    return response.data;
}
export const useGetSearch = (params: ISearchParams) => {
    return useQuery<ISearchGetResponse, AxiosError>({
        queryKey: ['search', params],
        queryFn: () => getSearch(params)
    });
};
