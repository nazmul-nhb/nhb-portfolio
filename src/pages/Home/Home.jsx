import { Helmet } from "react-helmet-async";
import { useTypewriter } from "react-simple-typewriter";
import profile from '../../assets/pp-square.jpg'
import { PhotoProvider, PhotoView } from "react-photo-view";
import 'react-photo-view/dist/react-photo-view.css';
import { FaCloudDownloadAlt } from "react-icons/fa";
import Projects from "../../components/Projects/Projects";
import Skills from "../../components/Skills/Skills";
import { BiBookContent } from "react-icons/bi";
import { useEffect, useRef, useState } from "react";
import { GiSkills } from "react-icons/gi";
import { RiShieldUserLine } from "react-icons/ri";
import { FaLinkedin } from "react-icons/fa6";
import { VscGithub, VscGithubProject } from "react-icons/vsc";

const Home = () => {
    const [contentsVisible, setContentsVisible] = useState(false);
    const [activeSection, setActiveSection] = useState(null);
    const contentRef = useRef(null);

    // function to handle scrolling to a section
    const scrollToSection = (sectionID) => {
        const section = document.getElementById(sectionID);
        if (section) {
            section.scrollIntoView({ behavior: "smooth", block: "start" });
            setContentsVisible(false);
        }
    };

    // function to handle scroll events and update active section
    const handleScroll = () => {
        const scrollPosition = window.scrollY + 128;
        const bioSection = document.getElementById('bio');
        const skillsSection = document.getElementById('skills');
        const projectsSection = document.getElementById('projects');

        if (projectsSection && scrollPosition >= projectsSection.offsetTop) {
            setActiveSection('projects');
        } else if (skillsSection && scrollPosition >= skillsSection.offsetTop) {
            setActiveSection('skills');
        } else if (bioSection && scrollPosition >= bioSection.offsetTop) {
            setActiveSection('bio');
        }
    };

    // effect to add scroll event listener and clean up
    useEffect(() => {
        document.addEventListener('scroll', handleScroll);

        return () => {
            document.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // effect to handle click outside menu to close it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (contentRef.current && !contentRef.current.contains(event.target)) {
                setContentsVisible(false);
            }
        };

        if (contentsVisible) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [contentsVisible]);

    const [stacks] = useTypewriter({
        words: ['Front-End Developer', 'Front-End React Developer', 'MERN-Stack Developer'],
        loop: true,
    });

    return (
        <section className="md:py-8 p-6 md:px-16 scroll-smooth relative">
            <Helmet>
                <title>Portfolio - Nazmul Hassan</title>
            </Helmet>

            {/* Table of Contents */}
            <div className="fixed top-20 right-1 md:right-4 z-10 flex items-center">
                <BiBookContent
                    className="cursor-pointer text-3xl md:text-4xl hover:text-blue-500 transition-all duration-500"
                    onClick={() => setContentsVisible(!contentsVisible)}
                />
                <div
                    ref={contentRef}
                    className={`absolute bg-nhb bg-opacity-85 space-y-1 font-semibold text-lg shadow-lg rounded-md shadow-nhb p-2 transition-transform duration-500 ease-in-out ${contentsVisible ? 'transform translate-x-0 top-1 right-9 md:right-10' : 'transform translate-x-full -left-full top-1'
                        }`}
                >
                    <a
                        className={`cursor-pointer flex items-center gap-1 hover:text-blue-500 transition-all duration-500 ${activeSection === 'bio' ? 'font-bold text-blue-300' : ''}`}
                        onClick={() => scrollToSection('bio')}
                    >
                        <RiShieldUserLine />Bio
                    </a>
                    <a
                        className={`cursor-pointer flex items-center gap-1 hover:text-blue-500 transition-all duration-500 ${activeSection === 'skills' ? 'font-bold text-blue-300' : ''}`}
                        onClick={() => scrollToSection('skills')}
                    >
                        <GiSkills />Skills
                    </a>
                    <a
                        className={`cursor-pointer flex items-center gap-1 hover:text-blue-500 transition-all duration-500 ${activeSection === 'projects' ? 'font-bold text-blue-300' : ''}`}
                        onClick={() => scrollToSection('projects')}
                    >
                        <VscGithubProject />Projects
                    </a>
                </div>
            </div>

            {/* Intro Section */}
            <div id="bio" className="flex flex-col md:flex-row justify-around items-center gap-6 my-6">

                {/* Bio */}
                <div data-aos="zoom-in-up" data-aos-duration="1000"
                    className="flex flex-col items-center md:items-start gap-2">
                    <h2 className="text-2xl md:text-4xl font-bold">I&rsquo;m Nazmul Hassan</h2>
                    <h3>I am a {stacks}</h3>
                    <ul className="text-center md:text-left flex flex-col gap-2 pl-4 md:list-disc animate-pulse">
                        <li>Developing Responsive websites with user-friendly functionalities.</li>
                        <li>Passionate about crafting engaging user experiences.</li>
                        <li>Let&rsquo;s transform your ideas into dynamic web experience!</li>
                    </ul>
                    <div data-aos="zoom-in-right" data-aos-duration="1000" data-aos-delay="700"
                        className="text-sm sm:text-xl md:text-2xl flex items-center gap-2 font-kreonSerif mt-2">
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://drive.google.com/file/d/1iwJMSanbWC3HGd98BPs9Q_X6YaZSWXL7/view"
                            className="flex items-center gap-1 px-3 py-0.5 border border-white rounded-3xl hover:text-nhb hover:bg-white hover:scale-105 transition-all duration-700 font-semibold shadow-md shadow-blue-400"
                        >
                            <FaCloudDownloadAlt /> Resume
                        </a>
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://linkedin.com/in/nazmul-nhb"
                            className="flex items-center gap-1 px-3 py-0.5 border border-white rounded-3xl hover:text-linkedin hover:scale-105 hover:bg-white transition-all duration-700 font-semibold shadow-md shadow-blue-400"
                        >
                            <FaLinkedin /> LinkedIn
                        </a>
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://github.com/nazmul-nhb"
                            className="flex items-center gap-1 px-3 py-0.5 border border-white rounded-3xl hover:text-github hover:bg-white hover:scale-105 transition-all duration-700 font-semibold shadow-md shadow-blue-400"
                        >
                            <VscGithub /> GitHub
                        </a>
                    </div>
                </div>

                {/* Image */}
                <div className="p-2 border shadow-md shadow-blue-400">
                    <PhotoProvider>
                        <PhotoView src={profile}>
                            <figure data-aos="zoom-out-down" data-aos-duration="1000" data-aos-delay="400">
                                <img
                                    className="cursor-pointer w-48 lg:w-64 aspect-square hover:scale-105 transition-all duration-500"
                                    src={profile}
                                    alt="Nazmul Hassan" />
                            </figure>
                        </PhotoView>
                    </PhotoProvider>
                </div>
            </div>

            {/* Skills Section */}
            <h2 className="pb-1 border-b my-6 font-bold text-xl sm:text-2xl md:text-3xl flex items-center gap-2" id="skills">
                <GiSkills />Skills
            </h2>
            <Skills />

            {/* Projects Section */}
            <h2 className="pb-1 border-b my-6 font-bold text-xl sm:text-2xl md:text-3xl flex items-center gap-2" id="projects">
                <VscGithubProject />Projects
            </h2>
            <Projects />
        </section>
    );
};

export default Home;
