import { NavLink } from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner";
import useGetMessages from "../../hooks/useGetMessages";

const Messages = () => {
    const { messages, isMsgLoading } = useGetMessages();

    if (isMsgLoading) return <Spinner />;

    return (
        <section className="md:py-8 p-6 md:px-16">
            {
                messages?.map(message => <NavLink key={message._id}
                    className="cursor-pointer block"
                    to={`/message/${message._id}`}
                >
                    {message?.sender}
                </NavLink>
                )
            }
        </section>
    );
};

export default Messages;