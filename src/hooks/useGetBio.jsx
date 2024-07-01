import { useQuery } from "@tanstack/react-query";
import useAxiosPortfolio from "./useAxiosPortfolio";

const useGetBio = () => {
    const axiosPortfolio = useAxiosPortfolio();

    const { data: bio = {}, isLoading: isBioLoading, refetch: refetchBio } = useQuery({
        queryKey: ['bio'],
        queryFn: async () => {
            const { data } = await axiosPortfolio(`/bio`);
            return data;
        }
    });

    return { bio, isBioLoading, refetchBio }

};

export default useGetBio;