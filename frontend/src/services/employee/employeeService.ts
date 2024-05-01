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