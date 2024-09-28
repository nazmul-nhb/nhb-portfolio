import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import AOS from "aos";
import "aos/dist/aos.css";
import useAuth from "../hooks/useAuth";
import { CgMail } from "react-icons/cg";
import useMessageCount from "../hooks/useMessageCount";

AOS.init();

const Root = () => {
	const navigate = useNavigate();
	const { user } = useAuth();
	const { messageCount } = useMessageCount();

	return (
		<div className="max-w-[1920px] mx-auto">
			{user && (
				<span className="fixed top-20 left-4 z-10 cursor-pointer text-blue-300 animate-growShrink hover:text-blue-500 transition-all duration-500">
					<CgMail
						onClick={() => navigate("/messages")}
						className="inline text-3xl md:text-4xl"
					/>
					{messageCount > 0 && (
						<sup className="text-lg md:text-xl font-bold">
							{messageCount}
						</sup>
					)}
				</span>
			)}
			<Navbar />

			<main className="mx-auto min-h-screen bg-blueBG bg-fixed bg-center bg-cover bg-no-repeat text-white mt-16 overflow-x-hidden">
				<Outlet />
			</main>
			<Footer />
		</div>
	);
};

export default Root;
