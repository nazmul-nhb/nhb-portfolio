import { useQuery } from "@tanstack/react-query";
import useAxiosPortfolio from "./useAxiosPortfolio";

const useGetProjects = () => {
    const axiosPortfolio = useAxiosPortfolio();

    const { data: projects = [], isLoading, refetch: refetchProjects } = useQuery({
        queryKey: ['projects'],
        queryFn: async () => {
            const { data } = await axiosPortfolio(`/projects`);
            return data;
        }
    });

    return { projects, isLoading, refetchProjects };

};

export default useGetProjects;