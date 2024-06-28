import { useQuery } from "@tanstack/react-query";
import useAxiosPortfolio from "./useAxiosPortfolio";

const useGetSkills = () => {
    const axiosPortfolio = useAxiosPortfolio();

    const { data: skills = [], isLoading, refetch: refetchSkills } = useQuery({
        queryKey: ['skills'],
        queryFn: async () => {
            const { data } = await axiosPortfolio(`/skills`);
            return data;
        }
    });

    return { skills, isLoading, refetchSkills }

};

export default useGetSkills;