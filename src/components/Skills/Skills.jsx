import { FaHtml5, FaReact, FaNodeJs, FaFigma, FaGitAlt } from 'react-icons/fa';
import { IoLogoCss3 } from 'react-icons/io5';
import { SiExpress, SiMongodb, SiFirebase, SiTailwindcss, SiReactquery, SiTypescript, SiRedux } from 'react-icons/si';
import { TbBrandJavascript, TbBrandReactNative } from 'react-icons/tb';
import CountUp from 'react-countup';
import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import useAxiosPortfolio from '../../hooks/useAxiosPortfolio';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../Spinner/Spinner';
import { RiNextjsLine } from 'react-icons/ri';

const skillIcons = {
    "HTML": <FaHtml5 />,
    "CSS": <IoLogoCss3 />,
    "JavaScript": <TbBrandJavascript />,
    "React": <FaReact />,
    "TypeScript": <SiTypescript />,
    "Next.js": <RiNextjsLine />,
    "Redux": <SiRedux />,
    "React Native": <TbBrandReactNative />,
    "Node.js": <FaNodeJs />,
    "Express.js": <SiExpress />,
    "MongoDB": <SiMongodb />,
    "TailwindCSS": <SiTailwindcss />,
    "Firebase": <SiFirebase />,
    "Git": <FaGitAlt />,
    "Figma": <FaFigma />,
    "TanStack Query": <SiReactquery />
};

const Skills = () => {
    const [hoveredSkillId, setHoveredSkillId] = useState(null);
    const [viewedSkills, setViewedSkills] = useState({});
    const axiosPortfolio = useAxiosPortfolio();

    const { data: skills = [], isLoading } = useQuery({
        queryKey: ['skills'],
        queryFn: async () => {
            const { data } = await axiosPortfolio(`/skills`);
            return data;
        }
    });

    const { ref, inView } = useInView({
        triggerOnce: false,
        threshold: [0.4, 0.6, 0.8],
    });

    const handleMouseEnter = (id) => {
        setHoveredSkillId(id);
        setViewedSkills((prevViewedSkills) => ({
            ...prevViewedSkills,
            [id]: Date.now(),
        }));
    };

    const handleMouseLeave = () => {
        setHoveredSkillId(null);
    };

    useEffect(() => {
        if (inView) {
            const newViewedSkills = {};
            skills.forEach((skill) => {
                newViewedSkills[skill._id] = Date.now();
            });
            setViewedSkills(newViewedSkills);
        }
    }, [inView, skills]);

    if (isLoading) return <Spinner />;

    return (
        <section ref={ref} className='grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12'>
            {skills.map((skill) => (
                <div key={skill._id}
                    data-aos="zoom-in-down" data-aos-duration="500" data-aos-delay="400"
                    className="group flex items-center gap-3 p-4 bg-gray-800 text-blue-300 rounded-lg shadow-md shadow-blue-400"
                    onMouseEnter={() => handleMouseEnter(skill._id)}
                    onMouseLeave={handleMouseLeave}>
                    <div className="text-5xl group-hover:scale-125 transition-all duration-1000">
                        {skillIcons[skill.title]}
                    </div>
                    <div className="flex-1 font-kreonSerif">
                        <h3 className="text-lg font-semibold flex items-center justify-between group-hover:text-xl transition-all duration-1000">
                            <span>{skill.title}</span>
                            <span>
                                {(hoveredSkillId === skill._id || viewedSkills[skill._id]) && (
                                    <CountUp key={viewedSkills[skill._id]}
                                        delay={0.1} start={0} end={skill.level} duration={2}
                                        suffix="%" />
                                )}
                                {!(hoveredSkillId === skill._id || viewedSkills[skill._id]) && (
                                    `${skill.level}%`
                                )}
                            </span>
                        </h3>
                        <p className="text-sm text-gray-400">{skill.description}</p>
                        <div className="w-full bg-gray-500 rounded-full h-2 mt-2">
                            <div
                                className="bg-blue-300 h-2 rounded-full group-hover:animate-progress"
                                style={{ '--progress-width': `${skill.level}%`, width: `${skill.level}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            ))}
        </section>
    );
};

export default Skills;
