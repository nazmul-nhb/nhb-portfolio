import { Helmet } from "react-helmet-async";
import { useTypewriter } from "react-simple-typewriter";
import profile from '../../assets/pp-square.jpg'
import { PhotoProvider, PhotoView } from "react-photo-view";
import 'react-photo-view/dist/react-photo-view.css';
import { FaCloudDownloadAlt } from "react-icons/fa";
import Projects from "../../components/Projects/Projects";

const Home = () => {
    const scrollToSection = (sectionID) => {
        const section = document.getElementById(sectionID);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const [stacks] = useTypewriter({
        words: ['Front-End Developer', 'Front-End React Developer', 'MERN-Stack Developer'],
        loop: true,
    });

    return (
        <section className="md:py-8 p-6 md:px-12 scroll-smooth">
            <Helmet>
                <title>Portfolio - Nazmul Hassan</title>
            </Helmet>
            <ul className="" id="toc">
                <li><a className="cursor-pointer" onClick={() => scrollToSection('bio')}>Bio</a></li>
                <li><a className="cursor-pointer" onClick={() => scrollToSection('projects')}>Projects</a></li>
                <li><a className="cursor-pointer" onClick={() => scrollToSection('skills')}>Skills</a></li>
            </ul>
<h2 id="bio" ></h2>
            <div className="flex flex-col md:flex-row justify-around items-center md:items-start gap-6 my-6">
                {/* Bio */}
                <div className="flex flex-col items-center md:items-start gap-2">
                    <h2 className="text-2xl md:text-4xl font-bold">I&rsquo;m Nazmul Hassan</h2>
                    <h3>I am a {stacks}</h3>
                    <ul className="text-center md:text-left flex flex-col gap-2 pl-4 md:list-disc animate-pulse">
                        <li>Developing Responsive websites with user-friendly functionalities.</li>
                        <li>Passionate about crafting engaging user experiences.</li>
                        <li>Let&rsquo;s transform your ideas into dynamic experience!</li>
                    </ul>
                    <a target="_blank" rel="noopener noreferrer"
                        href="https://drive.google.com/file/d/1iwJMSanbWC3HGd98BPs9Q_X6YaZSWXL7/view"
                        className="flex items-center gap-1 text-xl md:text-2xl px-3 py-0.5 border border-white rounded-3xl hover:text-nhb hover:bg-white transition-all duration-500 font-semibold">
                        <FaCloudDownloadAlt /> Resume
                    </a>
                </div>
                {/* Image */}
                <div className="">
                    <PhotoProvider>
                        <PhotoView src={profile}>
                            <img className="cursor-pointer w-64 p-2 border" src={profile} alt="Nazmul Hassan" />
                        </PhotoView>
                    </PhotoProvider>
                </div>
            </div>

            <h2 id="projects" onClick={() => scrollToSection('toc')}>Projects</h2>
            <Projects/>
        </section>
    );
};

export default Home;
