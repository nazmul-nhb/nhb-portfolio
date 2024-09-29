export const Spinner = () => {
	return (
		<div className="flex flex-col items-center justify-center">
			<img className="w-28 sm:w-36" src="/di-ring.svg" loading="eager" alt="Loading..." />
		</div>
	);
};

export const LogoSpinner = () => {
	return (
		<div className="flex flex-col items-center justify-center mt-28">
			<figure className="rounded-full animate-growShrink inset-0">
				<img
					className="w-24 sm:w-32 rounded-full aspect-square animate-glow"
					src="/logo.svg"
					loading="eager"
					alt="Loading..."
				/>
			</figure>
		</div>
	);
};
