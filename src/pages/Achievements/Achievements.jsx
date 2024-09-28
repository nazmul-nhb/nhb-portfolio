import { Helmet } from "react-helmet-async";
import { GrCertificate } from "react-icons/gr";
import { certificates, packages } from "../../data/data";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { LiaCertificateSolid } from "react-icons/lia";
import { RiNpmjsLine } from "react-icons/ri";
import { TbBrandNpm } from "react-icons/tb";
import toast from "react-hot-toast";
import { FaCopy } from "react-icons/fa";

const Achievements = () => {
	const handleCopy = (text) => {
		navigator.clipboard
			.writeText(text)
			.then(() => toast.success("Code Copied!"))
			.catch((err) => toast.error(`Failed to Copy: ${err.message}`));
	};

	return (
		<section className="md:py-8 p-6 md:px-16">
			<Helmet>
				<title>Achievements - Nazmul Hassan</title>
			</Helmet>

			{/* Published Packages */}
			<div id="education" className="scroll-margin-top mb-12">
				<h2 className="pb-1 border-b my-6 font-bold text-xl sm:text-2xl md:text-3xl flex items-center gap-2">
					<TbBrandNpm /> Published Packages
				</h2>
				<div
					data-aos="zoom-in-up"
					data-aos-duration="1000"
					data-aos-delay="200"
					className="space-y-6"
				>
					{packages?.map((pkg, idx) => (
						<div
							key={idx}
							className="text-sm sm:text-base md:text-lg font-medium indent-2"
						>
							<h3 className="flex items-center text-base sm:text-lg md:text-xl font-semibold">
								<RiNpmjsLine className="text-lg sm:text-xl md:text-2xl animate-growShrink" />
								<a
									href={pkg.link}
									target="_blank"
									rel="noopener noreferrer"
									className="hover:text-reddit transition-all duration-500"
								>
									{pkg.title}
								</a>
							</h3>
							<h4 className="ml-[18px] sm:ml-5 md:ml-6 flex items-center gap-2 ">
								<span>{pkg.install}</span>
								<FaCopy
									onClick={() => handleCopy(pkg.install)}
									className="cursor-pointer hover:text-reddit transition-all duration-500"
								/>
							</h4>
							<h4 className="ml-[18px] sm:ml-5 md:ml-6">
								<a
									href={pkg.repo}
									target="_blank"
									rel="noopener noreferrer"
									className="hover:text-reddit transition-all duration-500"
								>
									GitHub Repository
								</a>
							</h4>
							<h4 className="ml-[18px] sm:ml-5 md:ml-6">
								<a
									href={pkg.link}
									target="_blank"
									rel="noopener noreferrer"
									className="hover:text-reddit transition-all duration-500"
								>
									NPM Repository
								</a>
							</h4>
						</div>
					))}
				</div>
			</div>

			{/* Certifications */}
			<div id="education" className="scroll-margin-top mb-12">
				<h2 className="pb-1 border-b my-6 font-bold text-xl sm:text-2xl md:text-3xl flex items-center gap-2">
					<GrCertificate /> Certifications
				</h2>
				<div
					data-aos="zoom-out-down"
					data-aos-duration="1000"
					className="space-y-4"
				>
					{certificates?.map((cert, idx) => (
						<div
							key={idx}
							className="text-sm sm:text-base md:text-lg font-medium indent-2"
						>
							<PhotoProvider>
								<div className="cursor-pointer hover:text-reddit transition-all duration-500">
									<PhotoView src={cert.image}>
										<h3 className="flex items-center text-base sm:text-lg md:text-xl font-semibold">
											<LiaCertificateSolid className="text-lg sm:text-xl md:text-2xl animate-growShrink cursor-pointer" />
											<span className="w-full overflow-x-auto whitespace-nowrap !scrollbar-hide">
												{cert.title}
											</span>
										</h3>
									</PhotoView>
								</div>
							</PhotoProvider>

							<h4 className="ml-[18px] sm:ml-5 md:ml-6">
								<a
									href={cert.link}
									target="_blank"
									rel="noopener noreferrer"
									className="hover:text-reddit transition-all duration-500"
								>
									{cert.organization}
								</a>
							</h4>
							<h4 className="ml-[18px] sm:ml-5 md:ml-6">
								{cert.duration}
							</h4>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Achievements;
