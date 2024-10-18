import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import useMessageCount from "../../hooks/useMessageCount";
import { useEffect } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { LogoSpinner } from "../../components/Spinner/Spinner";
import useGetMessages from "../../hooks/useGetMessages";
import { FaArrowLeft } from "react-icons/fa6";
import { Helmet } from "react-helmet-async";
import { formatDate } from "../../utilities/formatDate";

const Message = () => {
	const { id } = useParams();
	const axiosSecure = useAxiosSecure();
	const { countRefetch } = useMessageCount();
	const { msgRefetch } = useGetMessages();
	const navigate = useNavigate();

	const { data: message = {}, isLoading: msgLoading } = useQuery({
		queryKey: ["message", id],
		queryFn: async () => {
			const { data } = await axiosSecure.get(`/email/messages/${id}`);
			return data;
		},
	});

	useEffect(() => {
		countRefetch();
		msgRefetch();
	}, [countRefetch, msgRefetch]);

	if (msgLoading) return <LogoSpinner />;

	const { sender, email, msg, views, date } = message;

	return (
		<section className="md:py-8 p-6 md:px-16">
			<Helmet>
				<title>Message from {message?.sender} - Nazmul Hassan</title>
			</Helmet>
			<div className="flex justify-center h-[80vh] bg-transparent">
				<div className="bg-blueBG bg-center bg-cover rounded-lg shadow-lg shadow-blue-300 p-6 pt-0 max-w-lg w-full overflow-y-auto portfolio-scrollbar mt-6 relative">
					<h2
						onClick={() => {
							navigate(-1);
						}}
						className=" cursor-pointer text-xl font-semibold mb-2 flex items-center flex-wrap gap-2 sticky top-0 bg-nhb/5 backdrop-filter backdrop-blur-sm z-10 p-2 -mx-6 rounded-t-lg hover:text-blue-300 transition-all duration-500"
					>
						<FaArrowLeft className="text-lg md:text-xl" />
						<span>Message from: {sender}</span>
					</h2>
					<p className="text-sm mb-2">
						You opened this message {views} times!
					</p>
					<p className="text-sm mb-2">
						Email:{" "}
						<a
							className="hover:text-blue-300 transition-all duration-500"
							href={`mailto: ${email}`}
						>
							{email}
						</a>
					</p>
					<p className="text-sm mb-4">{formatDate(date)}</p>
					<div className="border-l-8 border-blue-400 pl-4">
						<p className="">
							{msg.split("\n").map((line, index) => (
								<span key={index}>
									{line}
									<br />
								</span>
							))}
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Message;
