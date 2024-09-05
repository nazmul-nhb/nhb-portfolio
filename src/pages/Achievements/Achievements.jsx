import { Helmet } from "react-helmet-async";
import { GrCertificate } from "react-icons/gr";
import { SiNpm } from "react-icons/si";
import { certificates } from "../../data/data";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { LiaCertificateSolid } from "react-icons/lia";

const Achievements = () => {
	return (
		<section className="md:py-8 p-6 md:px-16">
			<Helmet>
				<title>Achievements - Nazmul Hassan</title>
			</Helmet>
			{/* Published Packages */}
			<div id="education" className="scroll-margin-top mb-12">
				<h2 className="pb-1 border-b my-6 font-bold text-xl sm:text-2xl md:text-3xl flex items-center gap-2">
					<SiNpm /> Published Packages
				</h2>
				<div className="space-y-4">{}</div>
			</div>

			{/* Certifications */}
			<div id="education" className="scroll-margin-top mb-12">
				<h2 className="pb-1 border-b my-6 font-bold text-xl sm:text-2xl md:text-3xl flex items-center gap-2">
					<GrCertificate /> Certifications
				</h2>
				<div className="space-y-6">
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
											{cert.title}
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
