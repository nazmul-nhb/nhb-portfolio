import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useGetMessages = () => {
    const axiosSecure = useAxiosSecure();

    const { data: messages = [], isLoading: isMsgLoading, refetch: msgRefetch } = useQuery({
        queryKey: ['messages'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/email/messages`);
            return data;
        }
    });

    return { messages, isMsgLoading, msgRefetch };

};

export default useGetMessages;