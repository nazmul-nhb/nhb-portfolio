import { useState, useEffect } from 'react';
import projects from './projects.json';
import { IoIosCloseCircle } from 'react-icons/io';
import './Projects.css';

const Projects = () => {
    const [openProjectIndex, setOpenProjectIndex] = useState(null);
    const [closing, setClosing] = useState(false);

    // disable background scrolling when modal is open
    useEffect(() => {
        if (openProjectIndex !== null) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }
    }, [openProjectIndex]);

    const handleClose = () => {
        setClosing(true);
        setTimeout(() => {
            setOpenProjectIndex(null);
            setClosing(false);
        }, 500); // match timeout with the animation duration
    };

    return (
        <section className='grid lg:grid-cols-3 gap-6'>
            {projects?.map((project, index) => (
                <div className='w-full flex flex-col gap-4' key={index}>
                    <h3 className='text-2xl font-kreonSerif'>{project.title}</h3>
                    <img
                        onClick={() => setOpenProjectIndex(index)}
                        className='w-full cursor-pointer hover:scale-105 transition-all duration-500'
                        src={project.cover}
                        alt={project.title}
                    />
                    {openProjectIndex === index && (
                        <>
                            <div className="modal-background" onClick={handleClose}></div>
                            <dialog open
                                className={`modal-content ${closing ? 'modal-content-close' : ''} w-[96%] xl:w-auto h-3/4 bg-opacity-95 p-2 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-transparent rounded-lg z-50 text-white`}
                            >
                                <div className='bg-blueBG bg-cover border-2 shadow-lg h-full rounded-lg p-6 flex flex-col overflow-y-auto !pb-6'>
                                    <IoIosCloseCircle
                                        onClick={handleClose}
                                        className='absolute -top-1 -right-1 text-3xl bg-white rounded-full text-red-700 hover:text-nhb transition-all duration-500 cursor-pointer'
                                        title='Close'
                                    />
                                    <div className="flex flex-col gap-4 h-3/4 p-1 pb-6">
                                        <div className="border-b pb-1">
                                            <h3 className='text-2xl font-kreonSerif'>
                                                {project.title}
                                                <span className='border px-1 ml-2'>Full Stack</span>
                                            </h3>
                                            <h4 className='text-lg font-kreonSerif text-right mt-1'>{project.subtitle}</h4>
                                        </div>
                                        <ul className='list-disc'>
                                            <h4 className='font-bold text-lg'>Top Features:</h4>
                                            {project?.features?.map((feature, featureIndex) => (
                                                <li key={featureIndex} className='ml-8'>{feature}</li>
                                            ))}
                                        </ul>
                                        <h4 className='-indent-14 pl-14 w'>
                                            <span className='font-bold'>Notable Technologies: </span>
                                            {project?.technologies}
                                        </h4>
                                        <div className='flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4 font-semibold'>
                                            <span className='font-bold'>Links:</span>
                                            <a href={project?.link} className="border px-3 border-white rounded-3xl hover:text-nhb hover:bg-white transition-all duration-500" target="_blank" rel="noopener noreferrer">Live Link</a>
                                            <a href={project?.client} className="border px-3  border-white rounded-3xl hover:text-nhb hover:bg-white transition-all duration-500" target="_blank" rel="noopener noreferrer">Client Side Repository</a>
                                            <a href={project?.server} className="border px-3 border-white rounded-3xl hover:text-nhb hover:bg-white transition-all duration-500" target="_blank" rel="noopener noreferrer">Server Side Repository</a>
                                            <div className='h-4'></div>
                                        </div>
                                    </div>
                                </div>
                            </dialog>
                        </>
                    )}
                </div>
            ))}
        </section>
    );
};

export default Projects;
