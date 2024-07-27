import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useMessageCount = () => {
    const axiosSecure = useAxiosSecure();
    const { user, userLoading } = useAuth();

    const { data: messageCount = 0, refetch: countRefetch } = useQuery({
        queryKey: ['messageCount'],
        enabled: !!user && !userLoading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/email/message-count`);
            return res.data?.messageCount;
        }
    });

    return { messageCount, countRefetch }
};

export default useMessageCount;