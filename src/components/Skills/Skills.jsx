import { FaHtml5, FaReact, FaNodeJs, FaFigma, FaGitAlt, FaRegSave } from 'react-icons/fa';
import { IoLogoCss3 } from 'react-icons/io5';
import { SiExpress, SiMongodb, SiFirebase, SiTailwindcss, SiReactquery, SiTypescript, SiRedux } from 'react-icons/si';
import { TbBrandJavascript, TbBrandReactNative } from 'react-icons/tb';
import CountUp from 'react-countup';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import useAxiosPortfolio from '../../hooks/useAxiosPortfolio';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../Spinner/Spinner';
import { RiDeleteBin6Line, RiNextjsLine } from 'react-icons/ri';
import { CiEdit } from 'react-icons/ci';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

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

const Skills = ({ updateSkill }) => {
    const [hoveredSkillId, setHoveredSkillId] = useState(null);
    const [viewedSkills, setViewedSkills] = useState({});
    const [showUpdateForm, setShowUpdateForm] = useState(null);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
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

    useEffect(() => {
        const skill = skills.find(s => s._id === showUpdateForm);
        if (skill) {
            reset(skill);
        }
    }, [showUpdateForm, skills, reset]);

    // update a skill
    const handleUpdateSkill = (updatedSkill) => {
        updatedSkill.serial = parseInt(updatedSkill?.serial);
        updatedSkill.level = parseInt(updatedSkill?.level);
        console.log(updatedSkill);
    }

    // delete a new skill
    const handleDeleteSkill = (id, title) => {
        console.log({ id, title });
    }

    useEffect(() => {
        if (errors.title) {
            toast.error(errors.title.message, { duration: 2000 })
            return;
        }
        if (errors.description) {
            toast.error(errors.description.message, { duration: 2000 })
            return;
        }
        if (errors.level) {
            toast.error(errors.level.message, { duration: 2000 })
            return;
        }
        if (errors.serial) {
            toast.error(errors.serial.message, { duration: 2000 })
            return;
        }
    }, [errors.title, errors.level, errors.description, errors.serial]);

    if (isLoading) return <Spinner />;

    return (
        <section ref={ref} className='grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12'>
            {skills.map((skill) => (
                <div key={skill._id}
                    data-aos="zoom-in-down" data-aos-duration="500" data-aos-delay="400"
                    className="group flex items-center gap-3 p-4 bg-gray-800 text-blue-300 rounded-lg shadow-md shadow-blue-400 relative"
                    onMouseEnter={() => handleMouseEnter(skill._id)}
                    onMouseLeave={handleMouseLeave}>
                    <div className="text-5xl group-hover:scale-125 transition-all duration-1000">
                        {skillIcons[skill.title]}
                    </div>
                    {showUpdateForm !== skill._id ?
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
                        : <form onSubmit={handleSubmit(handleUpdateSkill)} className="relative flex-1 font-kreonSerif">
                            <div className='flex gap-0.5'>
                                {/* Title */}
                                <input
                                    defaultValue={skill?.title}
                                    {...register("title", {
                                        required:
                                            { value: true, message: "Skill Name is required!" }
                                    })}
                                    name='title' id="title" type="text" placeholder="Skill Name" className="px-1 py-0.5 w-3/4 border-l focus:outline-0 text-white bg-transparent border-blue-200 border shadow-md shadow-blue-500" />
                                {/* Skill Level */}
                                <input
                                    defaultValue={skill?.level}
                                    {...register("level", {
                                        required: { value: true, message: "Skill Level is required!" },
                                        min: { value: 0.0, message: "Skill Level cannot be a negative value!" },
                                        max: { value: 100.0, message: "Skill Level cannot exceed 100!" },
                                    })}
                                    name='level' id="level" type="number" placeholder="%" className="px-1 py-0.5 w-1/4 border-l focus:outline-0 text-white bg-transparent border-blue-200 border shadow-md shadow-blue-500" />
                            </div>
                            <div className='flex gap-0.5'>
                                <input
                                    defaultValue={skill?.description}
                                    {...register("description", {
                                        required:
                                            { value: true, message: "Type of Skill is required!" }
                                    })}
                                    name='description' id="description" type="text" placeholder="Type of Skill" className="px-1 py-0.5 w-3/4 border-l focus:outline-0 text-white bg-transparent border-blue-200 border shadow-md shadow-blue-500" />
                                {/* Serial */}
                                <input
                                    defaultValue={skill?.serial}
                                    {...register("serial", {
                                        required:
                                            { value: true, message: "Serial is required!" }
                                    })}
                                    name='serial' id="serial" type="number" placeholder="#" className="px-1 py-0.5 w-1/4 border-l focus:outline-0 text-white bg-transparent border-blue-200 border shadow-md shadow-blue-500" />
                            </div>
                            <button type='submit' className='absolute -top-6 -left-20 text-3xl'>
                                <FaRegSave />
                            </button>
                        </form>
                    }

                    {updateSkill &&
                        <div className='absolute -top-1 -right-2 -bottom-1 text-2xl flex flex-col justify-between gap-4'>
                            <CiEdit
                                onClick={() => setShowUpdateForm(showUpdateForm === skill._id ? null : skill._id)}
                                className='text-blue-300 hover:text-white transition-all duration-500 cursor-pointer'
                                title='Edit'
                            />
                            <RiDeleteBin6Line
                                onClick={() => handleDeleteSkill(skill?._id, skill?.title)}
                                className='text-red-400 hover:text-blue-300 transition-all duration-500 cursor-pointer'
                                title='Delete'
                            />
                        </div>
                    }
                </div>
            ))}
        </section>
    );
};

Skills.propTypes = {
    updateSkill: PropTypes.bool,
}

export default Skills;
