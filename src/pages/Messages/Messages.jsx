import { useNavigate } from "react-router-dom";
import { LogoSpinner } from "../../components/Spinner/Spinner";
import useGetMessages from "../../hooks/useGetMessages";
import { Helmet } from "react-helmet-async";
import { formatDate } from "../../utilities/formatDate";
import { FaRegEnvelope, FaRegEnvelopeOpen } from "react-icons/fa6";
import useMessageCount from "../../hooks/useMessageCount";

const Messages = () => {
	const { countRefetch } = useMessageCount();
	const { messages, msgRefetch, isMsgLoading } = useGetMessages();
	const navigate = useNavigate();

	const handleNavigation = (id) => {
		navigate(`/message/${id}`);
		countRefetch();
		msgRefetch();
	};

	if (isMsgLoading) return <LogoSpinner />;

	return (
		<section className="md:py-8 p-6 md:px-16">
			<Helmet>
				<title>Messages - Nazmul Hassan</title>
			</Helmet>
			<div className="flex justify-center h-[80vh] bg-transparent">
				<div className="bg-blueBG bg-center bg-cover rounded-lg shadow-lg shadow-blue-300 p-6 pt-4 max-w-lg w-full overflow-y-auto portfolio-scrollbar mt-6 flex flex-col gap-3">
					{messages?.map((message) => (
						<p
							key={message._id}
							onClick={() => handleNavigation(message._id)}
							className={`${
								message.views <= 0
									? "font-black animate-pulse"
									: null
							} cursor-pointer hover:text-blue-300 hover:animate-none transition-all duration-500`}
						>
							<h3 className="font-bold text-lg flex items-center justify-between gap-3 flex-wrap">
								<span>
									{message?.sender}{" "}
									{message.views <= 0 ? "(New)" : null}
								</span>
								{message.views <= 0 ? (
									<FaRegEnvelope />
								) : (
									<FaRegEnvelopeOpen />
								)}
							</h3>
							<hr />
							<h5 className="text-sm">
								{formatDate(message.date)}
							</h5>
						</p>
					))}
				</div>
			</div>
		</section>
	);
};

export default Messages;
