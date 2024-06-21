import skills from './skills.json';
import { FaHtml5, FaReact, FaNodeJs, FaFigma, FaGitAlt } from 'react-icons/fa';
import { IoLogoCss3 } from 'react-icons/io5';
import { SiExpress, SiMongodb, SiFirebase, SiTailwindcss, SiReactquery } from 'react-icons/si';
import { TbBrandJavascript } from 'react-icons/tb';

const skillIcons = {
    "HTML": <FaHtml5 />,
    "CSS": <IoLogoCss3 />,
    "JavaScript": <TbBrandJavascript />,
    "React": <FaReact />,
    "Node.js": <FaNodeJs />,
    "Express.js": <SiExpress />,
    "MongoDB": <SiMongodb />,
    "Tailwind CSS": <SiTailwindcss />,
    "Firebase": <SiFirebase />,
    "Git": <FaGitAlt />,
    "Figma": <FaFigma />,
    "TanStack Query": <SiReactquery />
};
const Skills = () => {
    return (
        <section className='grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12'>
            {skills.map((skill, index) => (
                <div key={index} className="group flex items-center gap-3 p-4 bg-gray-800 text-blue-500 rounded-lg shadow-md">
                    <div className="text-5xl group-hover:scale-125 transition-all duration-1000">
                        {skillIcons[skill.title]}
                    </div>
                    <div className="flex-1 font-kreonSerif">
                        <h3 className="text-lg font-semibold flex items-center justify-between">
                            <span>{skill.title}</span> <span>{`${skill.level}%`}</span>
                        </h3>
                        <p className="text-sm text-gray-400">{skill.description}</p>
                        <div className="w-full bg-gray-500 rounded-full h-2 mt-2">
                            <div
                                className="bg-blue-500 h-2 rounded-full"
                                style={{ width: `${skill.level}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            ))}
        </section>
    );
};

export default Skills;