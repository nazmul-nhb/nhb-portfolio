import doubleRing from "../../assets/di-ring.svg";
import logo from "../../assets/logo.png";

export const Spinner = () => {
	return (
		<div className="flex flex-col items-center justify-center">
			<img className="w-28 sm:w-36" src={doubleRing} alt="Loading..." />
		</div>
	);
};

export const LogoSpinner = () => {
	return (
		<div className="flex flex-col items-center justify-center mt-28">
			<figure className="rounded-full animate-growShrink inset-0">
				<img
					className="w-24 sm:w-32 rounded-full aspect-square animate-glow"
					src={logo}
					alt="Loading..."
				/>
			</figure>
		</div>
	);
};
