import { NavLink } from "react-router-dom";
import { LogoSpinner } from "../../components/Spinner/Spinner";
import useGetMessages from "../../hooks/useGetMessages";
import { Helmet } from "react-helmet-async";

const Messages = () => {
    const { messages, isMsgLoading } = useGetMessages();

    if (isMsgLoading) return <LogoSpinner />;

    return (
        <section className="md:py-8 p-6 md:px-16">
            <Helmet>
                <title>Messages - Nazmul Hassan</title>
            </Helmet>
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