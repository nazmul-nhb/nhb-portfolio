import { useState, useEffect } from 'react';
import { IoIosCloseCircle } from 'react-icons/io';
import PropTypes from 'prop-types';
import Spinner from '../Spinner/Spinner';
import ProjectForm from './ProjectForm';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { MdEditDocument } from 'react-icons/md';
import useGetProjects from '../../hooks/useGetProjects';

const Projects = ({ updateProject, handleDeleteProject, handleUpdateProject }) => {
    const [openProjectID, setOpenProjectID] = useState(null);
    const [closing, setClosing] = useState(false);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    // get projects from server
    const { projects, isLoading } = useGetProjects();

    // disable background scrolling when modal is open
    useEffect(() => {
        if (openProjectID !== null) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }
    }, [openProjectID]);

    const handleClose = () => {
        setClosing(true);
        setShowUpdateForm(false);
        setTimeout(() => {
            setOpenProjectID(null);
            setClosing(false);
        }, 500); // match timeout with the animation duration
    };

    if (isLoading) return <Spinner />;

    return (
        <section className='grid sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-12'>
            {projects?.map((project) => (
                <div key={project?._id}
                    className='w-full flex flex-col gap-2 md:gap-4'>
                    <h3 onClick={() => setOpenProjectID(project?._id)}
                        className='flex-grow cursor-pointer hover:text-blue-500 group transition-all duration-500 text-base md:text-xl lg:text-2xl font-kreonSerif font-bold flex items-center gap-2'>
                        <img className='w-7 sm:w-8' src={project?.icon} alt={project?.title} />
                        {project?.title}
                        <span className='text-xs border px-1 group-hover:border-blue-500'>{project?.type}</span>
                    </h3>
                    <figure data-aos="fade-down" data-aos-duration="1000" data-aos-delay="300">
                        <img
                            onClick={() => setOpenProjectID(project?._id)}
                            className='w-full cursor-pointer aspect-[1/1.25] hover:scale-[1.02] sm:hover:scale-105 transition-all duration-500 rounded-md shadow-lg shadow-blue-500 opacity-95 animate-glowBorder hover:opacity-100'
                            src={project?.cover}
                            alt={project?.title}
                        />
                    </figure>
                    {openProjectID === project?._id && (
                        <>
                            <div className="modal-background" onClick={handleClose}></div>
                            <dialog open
                                className={`modal-content ${closing ? 'modal-content-close' : ''} w-[96%] md:w-3/4 lg:w-3/4 xl:w-3/5 2xl:w-auto h-3/4 bg-opacity-95 p-2 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-transparent rounded-lg z-50 text-white`}
                            >
                                <div className='bg-blueBG bg-cover border-2 shadow-lg animate-glowBorder h-full rounded-lg p-1 flex flex-col overflow-y-auto portfolio-scrollbar !pb-6'>
                                    <IoIosCloseCircle
                                        onClick={handleClose}
                                        className='absolute -top-1 -right-1 text-2xl bg-white rounded-full text-red-700 hover:text-nhb hover:scale-110 transition-all duration-500 cursor-pointer'
                                        title='Close'
                                    />
                                    {updateProject &&
                                        <div className='absolute bottom-4 right-8 text-3xl flex flex-col items-center gap-4'>
                                            <MdEditDocument 
                                                onClick={() => setShowUpdateForm(!showUpdateForm)}
                                                className='text-blue-400 hover:text-blue-50 hover:scale-105 transition-all duration-500 cursor-pointer'
                                                title='Edit'
                                            />
                                            <RiDeleteBin6Line
                                                onClick={() => handleDeleteProject(project?._id, project?.title, setOpenProjectID)}
                                                className='text-red-500 hover:text-blue-50 hover:scale-105 transition-all duration-500 cursor-pointer'
                                                title='Delete'
                                            />
                                        </div>
                                    }
                                    {!showUpdateForm ?
                                        <div className="flex flex-col gap-4 h-3/4 p-1 sm:p-6 pb-6 text-sm sm:text-base">
                                            <div className="border-b pb-1">
                                                <h3 className='text-base sm:text-2xl font-kreonSerif flex items-center gap-2'>
                                                    <img className='w-7 sm:w-8' src={project?.icon} alt={project?.title} />
                                                    {project?.title}
                                                    <span className='text-xs border px-1'>{project?.type}</span>
                                                </h3>
                                                <h4 className='text-xs sm:text-sm md:text-lg font-kreonSerif text-right mt-1'>
                                                    {project?.subtitle}
                                                </h4>
                                            </div>
                                            <ul className='list-disc'>
                                                <h4 className='font-bold'>Top Features:</h4>
                                                {project?.features?.map((feature, featureIndex) => (
                                                    <li key={featureIndex} className='ml-8'>{feature}</li>
                                                ))}
                                            </ul>
                                            <h4 className='-indent-8 pl-8'>
                                                <span className='font-bold'>Notable Technologies: </span>
                                                {project?.technologies}
                                            </h4>
                                            <div className='flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4 font-semibold'>
                                                <span className='font-bold'>Links:</span>
                                                <a href={project?.link} className="border px-3 border-white rounded-3xl hover:text-nhb hover:bg-white transition-all duration-500 hover:animate-glowBorder shadow-md shadow-blue-400" target="_blank" rel="noopener noreferrer">Live Link</a>
                                                <a href={project?.client} className="border px-3 border-white rounded-3xl hover:text-nhb hover:bg-white transition-all duration-500 hover:animate-glowBorder shadow-md shadow-blue-400" target="_blank" rel="noopener noreferrer">Client Side Repository</a>
                                                <a href={project?.server} className="border px-3 border-white rounded-3xl hover:text-nhb hover:bg-white transition-all duration-500 hover:animate-glowBorder shadow-md shadow-blue-400" target="_blank" rel="noopener noreferrer">Server Side Repository</a>
                                                <div className='h-4'></div>
                                            </div>
                                        </div>
                                        : <ProjectForm
                                            project={project}
                                            setShowUpdateForm={setShowUpdateForm}
                                            handleUpdateProject={handleUpdateProject} />
                                    }
                                </div>
                            </dialog>
                        </>
                    )}
                </div>
            ))}
        </section>
    );
};

Projects.propTypes = {
    updateProject: PropTypes.bool,
    handleDeleteProject: PropTypes.func,
    handleUpdateProject: PropTypes.func,
}

export default Projects;
