import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { LogoSpinner } from "../../components/Spinner/Spinner";
import { FaArrowLeft } from "react-icons/fa6";
import { Helmet } from "react-helmet-async";
import { formatDate } from "../../utilities/formatDate";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";

const Message = () => {
	const { id } = useParams();
	const axiosSecure = useAxiosSecure();
	const navigate = useNavigate();

	const { data: message = {}, isLoading: msgLoading } = useQuery({
		queryKey: ["message", id],
		queryFn: async () => {
			const { data } = await axiosSecure.get(`/email/messages/${id}`);
			return data;
		},
	});

	if (msgLoading) return <LogoSpinner />;

	const { sender, email, msg, views, date } = message;

	// Delete A Message
	const handleDeleteMessage = () => {
		Swal.fire({
			title: "Are You Sure?",
			text: `Delete Message from ${sender}?`,
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#ff0000",
			cancelButtonColor: "#2a7947",
			confirmButtonText: "Yes, Delete It!",
			color: "#fff",
			background: "#05030efc",
		}).then((result) => {
			if (result.isConfirmed) {
				Swal.fire({
					title: "Deleting Message...",
					text: "Please, wait a moment!",
					icon: "info",
					color: "#fff",
					background: "#05030efc",
					allowOutsideClick: false,
					didOpen: () => {
						Swal.showLoading();
					},
				});
				axiosSecure
					.delete(`/email/messages/${id}`)
					.then((res) => {
						if (res.data.deletedCount > 0) {
							Swal.fire({
								title: "Message Deleted!",
								text: `Deleted Message from ${sender}!`,
								icon: "success",
								color: "#fff",
								background: "#05030efc",
							});
							navigate(-1);
						}
					})
					.catch((error) => {
						Swal.fire({
							title: "Error!",
							text: error?.message,
							icon: "error",
							confirmButtonText: "Close",
							color: "#fff",
							background: "#05030efc",
						});
					});
			}
		});
	};

	return (
		<section className="md:py-8 p-6 md:px-16">
			<Helmet>
				<title>Message from {message?.sender} - Nazmul Hassan</title>
			</Helmet>
			<div className="flex justify-center h-[80vh] bg-transparent">
				<div className="bg-blueBG bg-center bg-cover rounded-lg shadow-lg shadow-blue-300 p-6 pt-0 max-w-lg w-full overflow-y-auto portfolio-scrollbar mt-6 relative">
					<div className="mb-2 flex items-center justify-between flex-wrap gap-2 sticky top-0 bg-nhb/5 backdrop-filter backdrop-blur-sm z-10 p-3 -mx-6 rounded-t-lg">
						<h2
							onClick={() => {
								navigate(-1);
							}}
							className="cursor-pointer md:text-xl font-semibold flex items-center flex-wrap gap-2 hover:text-blue-300 transition-all duration-500"
						>
							<FaArrowLeft className="text-lg md:text-xl" />
							<span>Message from {sender}</span>
						</h2>
						<MdDeleteForever
							onClick={handleDeleteMessage}
							className="text-2xl md:text-3xl text-red-500 hover:text-blue-50 hover:scale-105 transition-all duration-500 cursor-pointer"
							title="Delete"
						/>
					</div>
					<p className="text-sm mb-2">
						You opened this message {views}{" "}
						{views > 1 ? "times" : "time"}!
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
					<hr className="mb-3" />
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
