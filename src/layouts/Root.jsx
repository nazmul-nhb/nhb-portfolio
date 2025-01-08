import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import useAuth from "../hooks/useAuth";
import { CgMail } from "react-icons/cg";
import useMessageCount from "../hooks/useMessageCount";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

AOS.init();

const Root = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { user } = useAuth();
	const { messageCount } = useMessageCount();

	useEffect(() => {
		if (!location.hash) {
			window.scrollTo(0, 0);
		} else {
			const element = document.querySelector(location.hash);

			if (element) {
				element.scrollIntoView({ behavior: "smooth" });
			}
		}
	}, [location]);

	return (
		<div className="max-w-[1920px] mx-auto">
			{/* Show Message icon with msg count */}
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
			{/* Main Layout */}
			<main className="mx-auto min-h-screen bg-blueBG bg-fixed bg-center bg-cover bg-no-repeat text-white mt-16 overflow-x-hidden">
				<Outlet />
			</main>
			<Footer />
		</div>
	);
};

export default Root;
