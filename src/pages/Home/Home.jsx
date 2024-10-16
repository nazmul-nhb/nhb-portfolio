import { Helmet } from "react-helmet-async";
import { useTypewriter } from "react-simple-typewriter";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { FaCloudDownloadAlt } from "react-icons/fa";
import Projects from "../../components/Projects/Projects";
import Skills from "../../components/Skills/Skills";
import { BiBookContent } from "react-icons/bi";
import { useEffect, useRef, useState } from "react";
import { GiSkills } from "react-icons/gi";
import { RiShieldUserLine } from "react-icons/ri";
import {
	FaGraduationCap,
	FaHandshake,
	FaLinkedin,
	FaUserGraduate,
} from "react-icons/fa6";
import { VscGithub, VscGithubProject } from "react-icons/vsc";
import useGetBio from "../../hooks/useGetBio";
import { LogoSpinner } from "../../components/Spinner/Spinner";
import { useNavigate } from "react-router-dom";
import MovingContacts from "../../components/MovingContacts/MovingContacts";
import { Tooltip } from "react-tooltip";

const Home = () => {
	const [contentsVisible, setContentsVisible] = useState(false);
	const [activeSection, setActiveSection] = useState(null);
	const { bio, isBioLoading } = useGetBio();
	const contentRef = useRef(null);
	const navigate = useNavigate();

	// function to handle scrolling to a section
	const scrollToSection = (sectionID) => {
		const section = document.getElementById(sectionID);

		if (section) {
			section.scrollIntoView({ behavior: "smooth", block: "start" });
			window.history.pushState(null, "", `#${sectionID}`);
			setContentsVisible(false);
		}
	};

	// function to handle scroll events and update active section
	const handleScroll = () => {
		const position = window.scrollY + 128;
		const sections = ["bio", "skills", "projects", "education"];

		sections.forEach((sectionID) => {
			const section = document.getElementById(sectionID);

			if (section && position >= section.offsetTop) {
				setActiveSection(sectionID);
			}
		});
	};

	// update url with selected section id
	useEffect(() => {
		const sectionID = window.location.hash.replace("#", "");

		if (sectionID) {
			scrollToSection(sectionID);
		}
	}, []);

	// effect to add scroll event listener and clean up
	useEffect(() => {
		document.addEventListener("scroll", handleScroll);

		return () => {
			document.removeEventListener("scroll", handleScroll);
		};
	}, []);

	// effect to handle click outside menu to close it
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				contentRef.current &&
				!contentRef.current.contains(event.target)
			) {
				setContentsVisible(false);
			}
		};

		if (contentsVisible) {
			document.addEventListener("mousedown", handleClickOutside);
		} else {
			document.removeEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [contentsVisible]);

	const [myRoles] = useTypewriter({
		words: bio?.responsibilities || ["Web Developer"],
		loop: true,
	});

	// process education info
	const processedEducation = bio?.education?.map((edu) => {
		const [degree, institution, result] = edu
			.split(";")
			.map((item) => item.trim());
		return {
			degree,
			institution,
			result,
		};
	});

	if (isBioLoading) return <LogoSpinner />;

	return (
		<section className="md:py-8 p-6 md:px-16 relative">
			<Helmet>
				<title>Portfolio - Nazmul Hassan</title>
			</Helmet>

			<FaHandshake
				onClick={() => navigate("/contact")}
				className="contact fixed top-32 right-4 z-10 cursor-pointer text-3xl md:text-4xl text-blue-300 animate-growShrink hover:text-blue-500 transition-all duration-500"
			/>
			<Tooltip className="z-30" anchorSelect=".contact" place="left">
				Contact Me
			</Tooltip>

			{/* Table of Contents */}
			<div className="fixed top-20 right-4 z-10 flex items-center">
				<BiBookContent
					id="contents"
					title="Contents"
					className="cursor-pointer text-3xl md:text-4xl text-blue-300 animate-flip hover:text-blue-500 hover:scale-105 transition-all duration-500"
					onClick={() => setContentsVisible(!contentsVisible)}
				/>
				{/* <Tooltip className="z-30" anchorSelect="#contents" place="left">
                    Contents
                </Tooltip> */}
				<div
					ref={contentRef}
					className={`absolute flex gap-5 items-center bg-nhb bg-opacity-60 space-y-1 font-semibold text-xs sm:text-lg shadow-md shadow-blue-500 p-2 transition-transform duration-1000 ease-in-out ${
						contentsVisible
							? "transform translate-x-0 -top-2 right-9 md:right-11"
							: "transform translate-x-full -right-full -top-2"
					}`}
				>
					<div className="absolute inset-0 backdrop-filter backdrop-blur-lg -z-10"></div>
					<a
						className={`cursor-pointer flex items-center gap-1 hover:text-blue-500 transition-all duration-500 ${
							activeSection === "bio"
								? "font-bold text-blue-300"
								: ""
						}`}
						onClick={() => scrollToSection("bio")}
					>
						<RiShieldUserLine />
						Bio
					</a>
					<a
						className={`cursor-pointer flex items-center gap-1 hover:text-blue-500 transition-all duration-500 ${
							activeSection === "skills"
								? "font-bold text-blue-300"
								: ""
						}`}
						onClick={() => scrollToSection("skills")}
					>
						<GiSkills />
						Skills
					</a>
					<a
						className={`cursor-pointer flex items-center gap-1 hover:text-blue-500 transition-all duration-500 ${
							activeSection === "projects"
								? "font-bold text-blue-300"
								: ""
						}`}
						onClick={() => scrollToSection("projects")}
					>
						<VscGithubProject />
						Projects
					</a>
					<a
						className={`cursor-pointer flex items-center gap-1 hover:text-blue-500 transition-all duration-500 ${
							activeSection === "education"
								? "font-bold text-blue-300"
								: ""
						}`}
						onClick={() => scrollToSection("education")}
					>
						<FaUserGraduate />
						Education
					</a>
				</div>
			</div>

			{/* Bio Section */}
			<div
				id="bio"
				className="scroll-margin-top flex flex-col md:flex-row justify-around items-center gap-10 my-6 mb-12"
			>
				{/* Intro */}
				<div
					data-aos="zoom-in-up"
					data-aos-duration="1000"
					className="flex flex-col items-center md:items-start gap-2"
				>
					<h2 className="text-2xl md:text-4xl font-bold">
						I&rsquo;m{" "}
						<span className="animate-pulse">
							{bio?.name || "Nazmul Hassan"}
						</span>
					</h2>
					<h3 className="text-xl">I am a {myRoles}</h3>
					<ul className="text-center md:text-left flex flex-col gap-2 pl-4 md:list-disc">
						{bio?.highlights?.map((highlight, index) => (
							<li key={index}>{highlight}</li>
						))}
					</ul>
					{/* Buttons */}
					<div
						data-aos="zoom-in-right"
						data-aos-duration="1000"
						data-aos-delay="700"
						className="w-full text-sm sm:text-xl md:text-2xl flex items-center justify-center md:justify-between gap-2 font-kreonSerif mt-2"
					>
						<a
							target="_blank"
							rel="noopener noreferrer"
							href={bio?.resume}
							className="flex items-center gap-1 px-3 py-1 border border-white rounded-3xl hover:text-nhb hover:bg-white animate-glowBorder hover:scale-105 transition-all duration-700 font-semibold shadow-md shadow-blue-400"
						>
							<FaCloudDownloadAlt /> Resume
						</a>
						<a
							target="_blank"
							rel="noopener noreferrer"
							href={bio?.linked_in}
							className="flex items-center gap-1 px-3 py-1 border border-white rounded-3xl hover:text-linkedin hover:scale-105 hover:bg-white animate-glowBorder transition-all duration-700 font-semibold shadow-md shadow-blue-400"
						>
							<FaLinkedin /> LinkedIn
						</a>
						<a
							target="_blank"
							rel="noopener noreferrer"
							href={bio?.github}
							className="flex items-center gap-1 px-3 py-1 border border-white rounded-3xl hover:text-github hover:bg-white animate-glowBorder hover:scale-105 transition-all duration-700 font-semibold shadow-md shadow-blue-400"
						>
							<VscGithub /> GitHub
						</a>
					</div>
					<MovingContacts />
				</div>

				{/* Image */}
				<div className="relative p-2 shadow-md shadow-blue-400 animate-glowBorder">
					<PhotoProvider>
						<figure
							data-aos="zoom-out-down"
							data-aos-duration="1000"
							data-aos-delay="400"
						>
							<PhotoView src={bio?.profile_image}>
								<img
									className="cursor-pointer w-48 lg:w-64 aspect-square hover:scale-105 transition-all duration-500 hover:animate-pulse"
									src={bio?.profile_image}
									alt={bio?.name}
								/>
							</PhotoView>
						</figure>
					</PhotoProvider>
				</div>
			</div>

			{/* Skills Section */}
			<h2
				id="skills"
				className="scroll-margin-top pb-1 border-b my-6 font-bold text-xl sm:text-2xl md:text-3xl flex items-center gap-2"
			>
				<GiSkills /> Skills & Tools
			</h2>
			<Skills />

			{/* Projects Section */}
			<h2
				id="projects"
				className="scroll-margin-top pb-1 border-b my-6 font-bold text-xl sm:text-2xl md:text-3xl flex items-center gap-2"
			>
				<VscGithubProject /> Projects
			</h2>
			<Projects />

			{/* Education Section */}
			<div id="education" className="scroll-margin-top mb-12">
				<h2 className="pb-1 border-b my-6 font-bold text-xl sm:text-2xl md:text-3xl flex items-center gap-2">
					<FaUserGraduate /> Education
				</h2>
				<div className="space-y-4">
					{processedEducation?.map((edu, idx) => (
						<div
							key={idx}
							className="text-sm sm:text-base md:text-lg font-medium indent-2"
						>
							<h3 className="flex items-center text-base sm:text-lg md:text-xl font-semibold">
								<FaGraduationCap className="text-lg sm:text-xl md:text-2xl animate-growShrink" />
								{edu.degree}
							</h3>
							<h4 className="ml-[18px] sm:ml-5 md:ml-6">
								{edu.institution}
							</h4>
							<h4 className="ml-[18px] sm:ml-5 md:ml-6">
								{edu.result}
							</h4>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Home;
