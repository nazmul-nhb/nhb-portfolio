import { SiExpress, SiMongodb, SiFirebase, SiTailwindcss, SiReactquery, SiRedux, SiMongoosedotws, SiChakraui, SiMui, SiAxios, SiPreact, SiSass, SiReacthookform, SiJsonwebtokens, SiAntdesign, SiVercel, SiNetlify, SiNestjs } from 'react-icons/si';
import { FaHtml5, FaReact, FaNodeJs, FaFigma, FaGitAlt, FaSave, FaAngular, FaVuejs, FaPython, FaBootstrap, FaDocker, FaAws } from 'react-icons/fa';
import { RiFlutterFill, RiJavascriptFill, RiNextjsLine } from 'react-icons/ri';
import { MdDeleteForever, MdEditDocument } from 'react-icons/md';
import { TbBrandReactNative } from 'react-icons/tb';
import { BiLogoTypescript } from 'react-icons/bi';
import { IoLogoCss3 } from 'react-icons/io5';
import { BsStripe } from 'react-icons/bs';
import { GrMysql } from 'react-icons/gr';
import CountUp from 'react-countup';
import PropTypes from 'prop-types';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Spinner from '../Spinner/Spinner';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import useGetSkills from '../../hooks/useGetSkills';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { Tooltip } from 'react-tooltip';

const skillIcons = {
    "HTML": <FaHtml5 />,
    "CSS": <IoLogoCss3 />,
    "SASS": <SiSass />,
    "JavaScript": <RiJavascriptFill />,
    "Python": <FaPython />,
    "React": <FaReact />,
    "Angular": <FaAngular />,
    "Flutter": <RiFlutterFill />,
    "Vue.js": <FaVuejs />,
    "Preact": <SiPreact />,
    "TypeScript": <BiLogoTypescript />,
    "Next.js": <RiNextjsLine />,
    "Redux": <SiRedux />,
    "React Native": <TbBrandReactNative />,
    "Node.js": <FaNodeJs />,
    "NestJS": <SiNestjs />,
    "Express.js": <SiExpress />,
    "MongoDB": <SiMongodb />,
    "Mongoose": <SiMongoosedotws />,
    "TailwindCSS": <SiTailwindcss />,
    "Bootstrap": <FaBootstrap />,
    "Firebase": <SiFirebase />,
    "Git": <FaGitAlt />,
    "ChakraUI": <SiChakraui />,
    "MaterialUI": <SiMui />,
    "Axios": <SiAxios />,
    "Stripe": <BsStripe />,
    "Figma": <FaFigma />,
    "Docker": <FaDocker />,
    "React Hook Form": <SiReacthookform />,
    "JWT": <SiJsonwebtokens />,
    "Ant Design": <SiAntdesign />,
    "MySQL": <GrMysql />,
    "Vercel CLI": <SiVercel />,
    "Netlify": <SiNetlify />,
    "AWS": <FaAws />,
    "TanStack Query": <SiReactquery />
};

const Skills = ({ updateSkill }) => {
    const [hoveredSkillId, setHoveredSkillId] = useState(null);
    const [viewedSkills, setViewedSkills] = useState({});
    const [showUpdateForm, setShowUpdateForm] = useState(null);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const axiosSecure = useAxiosSecure();

    // get skills
    const { skills, isLoading, refetchSkills } = useGetSkills()

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
    const handleUpdateSkill = (id, updatedSkill) => {
        updatedSkill.serial = parseInt(updatedSkill?.serial);
        updatedSkill.level = parseInt(updatedSkill?.level);
        delete updatedSkill?._id;
        Swal.fire({
            title: 'Updating Skill...',
            text: 'Please, wait a moment!',
            icon: 'info',
            color: '#fff',
            background: '#05030efc',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        try {
            axiosSecure.patch(`/skills/update/${id}`, updatedSkill)
                .then(res => {
                    if (res?.data?.modifiedCount > 0) {
                        toast.success("Skill Updated!");
                        Swal.fire({
                            title: 'Updated!',
                            text: `Updated "${updatedSkill?.title}"!`,
                            icon: 'success',
                            confirmButtonText: 'Okay',
                            color: '#fff',
                            background: '#05030efc'
                        });
                        setShowUpdateForm(false);
                        refetchSkills();
                        reset();
                    } else if (
                        res?.data?.acknowledged &&
                        res?.data?.matchedCount === 1 &&
                        res?.data?.modifiedCount === 0
                    ) {
                        toast.success("Skill's Up to Date!");
                        Swal.fire({
                            title: 'Up to Date!',
                            text: `"${updatedSkill?.title}" Up to Date!`,
                            icon: 'success',
                            color: '#fff',
                            background: '#05030efc'
                        });
                    }
                })
                .catch(error => {
                    console.error(error);
                    if (error) {
                        Swal.fire({
                            title: 'Update Failed!',
                            text: error?.message,
                            icon: 'error',
                            confirmButtonText: 'Close',
                            color: '#fff',
                            background: '#05030efc'
                        })
                    }
                })
        } catch (error) {
            Swal.fire({
                title: 'Update Failed!',
                text: error?.message,
                icon: 'error',
                confirmButtonText: 'Close',
                color: '#fff',
                background: '#05030efc'
            })
        }
    }

    // delete a skill
    const handleDeleteSkill = (id, title) => {
        Swal.fire({
            title: 'Are You Sure?',
            text: `Delete "${title}" Permanently?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ff0000',
            cancelButtonColor: '#2a7947',
            confirmButtonText: 'Yes, Delete It!',
            color: '#fff',
            background: '#05030efc',
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Deleting Skill...',
                    text: 'Please, wait a moment!',
                    icon: 'info',
                    color: '#fff',
                    background: '#05030efc',
                    allowOutsideClick: false,
                    didOpen: () => {
                        Swal.showLoading();
                    }
                });
                axiosSecure.delete(`/skills/delete/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetchSkills();
                            Swal.fire({
                                title: 'Skill Deleted!',
                                text: `Permanently Deleted "${title}"!`,
                                icon: 'success',
                                color: '#fff',
                                background: '#05030efc',
                            })
                            toast.success('Deleted the Skill!');
                        }
                    })
                    .catch(error => {
                        Swal.fire({
                            title: 'Error!',
                            text: error?.message,
                            icon: 'error',
                            confirmButtonText: 'Close',
                            color: '#fff',
                            background: '#05030efc',
                        });
                    })
            }
        })
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
                    id={`skill-${skill._id}`}
                    data-aos="zoom-in-down" data-aos-duration="500" data-aos-delay="400"
                    className="skillLevel hover:animate-glowBorder group flex items-center gap-3 p-4 bg-gray-800 text-blue-300 rounded-lg shadow-md shadow-blue-400 relative"
                    onMouseEnter={() => handleMouseEnter(skill._id)}
                    onMouseLeave={handleMouseLeave}>
                    <Tooltip anchorSelect={`#skill-${skill._id}`} place="top">
                        {skill.level >= 80 ? 'Expert'
                            : (skill.level >= 70 && skill.level < 80) ? 'Comfortable'
                                : (skill.level >= 50 && skill.level < 70)? 'Familiar'
                                    : null
                        }
                    </Tooltip>
                    <div className="text-5xl group-hover:scale-125 transition-all duration-1000">
                      <span className="block animate-growShrink">{skillIcons[skill.title]}</span>  
                    </div>
                    {showUpdateForm !== skill._id ?
                        <div className="flex-1 font-kreonSerif">
                            <h3 className="text-lg font-semibold flex items-center justify-between group-hover:text-xl transition-all duration-1000">
                                <span>{skill.title}</span>
                                <span className="hidden">
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
                        // update form
                        : <form onSubmit={handleSubmit((skillData) => handleUpdateSkill(skill?._id, skillData))} className="relative flex-1 font-kreonSerif space-y-1">
                            <div className='flex gap-0.5'>
                                {/* Title */}
                                <input
                                    defaultValue={skill?.title}
                                    {...register("title", {
                                        required:
                                            { value: true, message: "Skill Name is required!" }
                                    })}
                                    name='title' id="title" type="text" placeholder="Skill Name" className="px-1 py-0.5 w-3/4 border-l focus:outline-0 text-white bg-transparent border-blue-200 border shadow-sm shadow-blue-500" />
                                {/* Skill Level */}
                                <input
                                    defaultValue={skill?.level}
                                    {...register("level", {
                                        required: { value: true, message: "Skill Level is required!" },
                                        min: { value: 0.0, message: "Skill Level cannot be a negative value!" },
                                        max: { value: 100.0, message: "Skill Level cannot exceed 100!" },
                                    })}
                                    name='level' id="level" type="number" placeholder="%" className="px-1 py-0.5 w-1/4 border-l focus:outline-0 text-white bg-transparent border-blue-200 border shadow-sm shadow-blue-500" />
                            </div>
                            <div className='flex gap-0.5'>
                                {/* Skill Type */}
                                <input
                                    defaultValue={skill?.description}
                                    {...register("description", {
                                        required:
                                            { value: true, message: "Type of Skill is required!" }
                                    })}
                                    name='description' id="description" type="text" placeholder="Type of Skill" className="px-1 py-0.5 w-3/4 border-l focus:outline-0 text-white bg-transparent border-blue-200 border shadow-sm shadow-blue-500" />
                                {/* Serial */}
                                <input
                                    defaultValue={skill?.serial}
                                    {...register("serial", {
                                        required:
                                            { value: true, message: "Serial is required!" }
                                    })}
                                    name='serial' id="serial" type="number" placeholder="#" className="px-1 py-0.5 w-1/4 border-l focus:outline-0 text-white bg-transparent border-blue-200 border shadow-sm shadow-blue-500" />
                            </div>
                            <button title='Save' type='submit' className='absolute -top-6 -left-20 text-3xl text-teal-500 hover:text-blue-50 hover:scale-105 transition-all duration-500'>
                                <FaSave />
                            </button>
                        </form>
                    }

                    {updateSkill &&
                        <div className='absolute -top-1 -right-3 -bottom-1 flex flex-col justify-between gap-4'>
                            <MdEditDocument
                                onClick={() => setShowUpdateForm(showUpdateForm === skill._id ? null : skill._id)}
                                className='text-2xl text-blue-400 hover:text-blue-50 hover:scale-105 transition-all duration-500 cursor-pointer'
                                title='Edit'
                            />
                            <MdDeleteForever
                                onClick={() => handleDeleteSkill(skill?._id, skill?.title)}
                                className='text-3xl text-red-500 hover:text-blue-50 hover:scale-105 transition-all duration-500 cursor-pointer'
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
