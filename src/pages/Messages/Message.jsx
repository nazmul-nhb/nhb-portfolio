import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import useMessageCount from "../../hooks/useMessageCount";
import { useEffect } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { LogoSpinner } from '../../components/Spinner/Spinner';
import useGetMessages from '../../hooks/useGetMessages';
import { FaArrowLeft } from 'react-icons/fa6';
import { Helmet } from 'react-helmet-async';

const Message = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const { countRefetch } = useMessageCount();
    const { msgRefetch } = useGetMessages();
    const navigate = useNavigate();

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

    if (msgLoading) return <LogoSpinner />;

    return (
        <section className="md:py-8 p-6 md:px-16">
            <Helmet>
                <title>Message from {message?.sender} - Nazmul Hassan</title>
            </Helmet>
            <FaArrowLeft onClick={() => { navigate(-1) }} className='text-4xl cursor-pointer' />
            {message?.msg}
        </section>
    );
};

export default Message;