import skills from './skills.json';
import { FaHtml5, FaReact, FaNodeJs, FaFigma, FaGitAlt } from 'react-icons/fa';
import { IoLogoCss3 } from 'react-icons/io5';
import { SiExpress, SiMongodb, SiFirebase, SiTailwindcss, SiReactquery } from 'react-icons/si';
import { TbBrandJavascript } from 'react-icons/tb';
import CountUp from 'react-countup';
import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const skillIcons = {
    "HTML": <FaHtml5 />,
    "CSS": <IoLogoCss3 />,
    "JavaScript": <TbBrandJavascript />,
    "React": <FaReact />,
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
    const [hoveredSkillIndex, setHoveredSkillIndex] = useState(null);
    const [viewedSkills, setViewedSkills] = useState({});

    const { ref, inView } = useInView({
        triggerOnce: false,
        threshold: 0.5,
        delay: 3
    });

    const handleMouseEnter = (index) => {
        setHoveredSkillIndex(index);
        setViewedSkills((prevViewedSkills) => ({
            ...prevViewedSkills,
            [index]: Date.now(),
        }));
    };

    const handleMouseLeave = () => {
        setHoveredSkillIndex(null);
    };

    useEffect(() => {
        if (inView) {
            const newViewedSkills = {};
            skills.forEach((_, index) => {
                newViewedSkills[index] = Date.now();
            });
            setViewedSkills(newViewedSkills);
        }
    }, [inView]);

    return (
        <section ref={ref} className='grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12'>
            {skills.map((skill, index) => (
                <div key={index}
                    data-aos="zoom-in-down" data-aos-duration="500" data-aos-delay="400"
                    className="group flex items-center gap-3 p-4 bg-gray-800 text-blue-300 rounded-lg shadow-md shadow-blue-400"
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}>
                    <div className="text-5xl group-hover:scale-125 transition-all duration-1000">
                        {skillIcons[skill.title]}
                    </div>
                    <div className="flex-1 font-kreonSerif">
                        <h3 className="text-lg font-semibold flex items-center justify-between group-hover:text-xl transition-all duration-1000">
                            <span>{skill.title}</span>
                            <span>
                                {(hoveredSkillIndex === index || viewedSkills[index]) && (
                                    <CountUp key={viewedSkills[index]}
                                        delay={0.15} start={0} end={skill.level} duration={2}
                                        suffix="%" />
                                )}
                                {!(hoveredSkillIndex === index || viewedSkills[index]) && (
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
