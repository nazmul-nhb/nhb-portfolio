import { useQuery } from "@tanstack/react-query";
import useAxiosPortfolio from "./useAxiosPortfolio";

const useGetProjects = () => {
    const axiosPortfolio = useAxiosPortfolio();

    const { data: projects = [], isFetching, refetch: refetchProjects } = useQuery({
        queryKey: ['projects'],
        queryFn: async () => {
            const { data } = await axiosPortfolio(`/projects`);
            return data;
        }
    });

    return { projects, isFetching, refetchProjects };

};

export default useGetProjects;