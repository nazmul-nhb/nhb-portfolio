import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import useMessageCount from "../../hooks/useMessageCount";
import { useEffect } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Spinner from '../../components/Spinner/Spinner';
import useGetMessages from '../../hooks/useGetMessages';

const Message = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const { countRefetch } = useMessageCount();
    const { msgRefetch } = useGetMessages();

    const { data: message = {}, isLoading: msgLoading } = useQuery({
        queryKey: ['message', id],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/email/messages/${id}`);
            return data;
        }
    });

    useEffect(() => {
        countRefetch();
        msgRefetch();
    }, [countRefetch, msgRefetch]);

    if (msgLoading) return <Spinner />;

    return (
        <section className="md:py-8 p-6 md:px-16">
            {message?.msg}
        </section>
    );
};

export default Message;