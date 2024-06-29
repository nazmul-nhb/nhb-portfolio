import { useForm } from "react-hook-form";
import PropTypes from 'prop-types';
import { FaRegSave, FaSlackHash } from "react-icons/fa";
import { RiScreenshot2Line } from "react-icons/ri";
import { PiShootingStarBold, PiSubtitlesBold, PiSubtitles  } from "react-icons/pi";
import { GrTechnology } from "react-icons/gr";
import { IoGitBranch } from "react-icons/io5";
import { IoMdGitMerge } from "react-icons/io";
import { FaLink } from "react-icons/fa6";
import { CiImageOn } from "react-icons/ci";
import { MdOutlineTypeSpecimen } from "react-icons/md";
import { useEffect } from "react";
import toast from "react-hot-toast";

const ProjectForm = ({ project, addProject, handleAddProject, handleUpdateProject, setShowUpdateForm }) => {
    const initialProjectValues = project ? { ...project, features: project.features.join('\n') } : {};

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: addProject ? {} : initialProjectValues
    });

    // show error toasts
    useEffect(() => {
        if (errors.serial) {
            toast.error(errors.serial.message, { duration: 2000 });
            return;
        }
        if (errors.title) {
            toast.error(errors.title.message, { duration: 2000 });
            return;
        }
        if (errors.subtitle) {
            toast.error(errors.subtitle.message, { duration: 2000 });
            return;
        }
        if (errors.type) {
            toast.error(errors.type.message, { duration: 2000 });
            return;
        }
        if (errors.icon) {
            toast.error(errors.icon.message, { duration: 2000 });
            return;
        }
        if (errors.cover) {
            toast.error(errors.cover.message, { duration: 2000 });
            return;
        }
        if (errors.link) {
            toast.error(errors.link.message, { duration: 2000 });
            return;
        }
        if (errors.client) {
            toast.error(errors.client.message, { duration: 2000 });
            return;
        }
        if (errors.server) {
            toast.error(errors.server.message, { duration: 2000 });
            return;
        }
        if (errors.technologies) {
            toast.error(errors.technologies.message, { duration: 2000 });
            return;
        }
        if (errors.features) {
            toast.error(errors.features.message, { duration: 2000 });
            return;
        }
    }, [errors.client, errors.cover, errors.features, errors.icon, errors.link, errors.serial, errors.server, errors.subtitle, errors.technologies, errors.title, errors.type]);

    return (
        <form
            onSubmit={handleSubmit((projectData) => addProject ? handleAddProject(projectData) : handleUpdateProject(project?._id, projectData, setShowUpdateForm))}
            className="flex flex-col gap-4 justify-between w-full p-3 sm:p-10 mx-auto">
            <h3 className="text-lg md:text-3xl lg:text-2xl xl:text-3xl text-center mb-4 animate-bounce font-bold">{addProject ? 'Add A New Project' : `Update ${project?.title}`}</h3>

            {/* Serial */}
            <div className="flex items-center gap-2 rounded-lg bg-transparent border-blue-200 border shadow-md shadow-blue-500">
                <label htmlFor='serial' className="flex items-center gap-1 pl-2 md:text-lg"><FaSlackHash /> Serial</label>
                <input
                    {...register("serial", {
                        required:
                            { value: true, message: "Serial is required!" }
                    })}
                    name='serial' id="serial" type="number" placeholder="Project Serial" className="px-2 rounded-r-lg py-2  w-full border-l bg-transparent focus:outline-0 text-white" />
            </div>

            {/* Title */}
            <div className="flex items-center gap-2 rounded-lg bg-transparent border-blue-200 border shadow-md shadow-blue-500">
                <label htmlFor='title' className="flex items-center gap-1 pl-2 md:text-lg"><PiSubtitlesBold /> Title</label>
                <input
                    {...register("title", {
                        required:
                            { value: true, message: "Title is required!" }
                    })}
                    name='title' id="title" type="text" placeholder="Project Title" className="px-2 rounded-r-lg py-2  w-full border-l bg-transparent focus:outline-0 text-white" />
            </div>

            {/* Subtitle */}
            <div className="flex items-center gap-2 rounded-lg bg-transparent border-blue-200 border shadow-md shadow-blue-500">
                <label htmlFor='subtitle' className="flex items-center gap-1 pl-2 md:text-lg"><PiSubtitles  /> Subtitle</label>
                <input
                    {...register("subtitle", {
                        required:
                            { value: true, message: "Subtitle is required!" }
                    })}
                    name='subtitle' id="subtitle" type="text" placeholder="Project Subtitle" className="px-2 rounded-r-lg py-2  w-full border-l bg-transparent focus:outline-0 text-white" />
            </div>

            {/* Project Type */}
            <div className="flex items-center gap-2 rounded-lg bg-transparent border-blue-200 border shadow-md shadow-blue-500">
                <label htmlFor='type' className="flex items-center gap-1 pl-2 md:text-lg"><MdOutlineTypeSpecimen /> Type</label>
                <input
                    {...register("type", {
                        required:
                            { value: true, message: "Project Type is required!" }
                    })}
                    name='type' id="type" type="text" placeholder="Project Type (Full-Stack, Front-End etc.)" className="px-2 rounded-r-lg py-2  w-full border-l bg-transparent focus:outline-0 text-white" />
            </div>

            {/* Icon */}
            <div className="flex items-center gap-2 rounded-lg bg-transparent border-blue-200 border shadow-md shadow-blue-500">
                <label htmlFor='icon' className="flex items-center gap-1 pl-2 md:text-lg"><CiImageOn /> Favicon</label>
                <input
                    {...register("icon", {
                        required:
                            { value: true, message: "Favicon URL is required!" }
                    })}
                    name='icon' id="icon" type="text" placeholder="Favicon URL" className="px-2 rounded-r-lg py-2  w-full border-l bg-transparent focus:outline-0 text-white" />
            </div>

            {/* Cover */}
            <div className="flex items-center gap-2 rounded-lg bg-transparent border-blue-200 border shadow-md shadow-blue-500">
                <label htmlFor='cover' className="flex items-center gap-1 pl-2 md:text-lg"><RiScreenshot2Line /> Screenshot</label>
                <input
                    {...register("cover", {
                        required:
                            { value: true, message: "Screenshot URL is required!" }
                    })}
                    name='cover' id="cover" type="text" placeholder="Project Screenshot URL" className="px-2 rounded-r-lg py-2  w-full border-l bg-transparent focus:outline-0 text-white" />
            </div>

            {/* Live Link */}
            <div className="flex items-center gap-2 rounded-lg bg-transparent border-blue-200 border shadow-md shadow-blue-500">
                <label htmlFor='link' className="flex items-center gap-1 pl-2 md:text-lg"><FaLink />Link</label>
                <input
                    {...register("link", {
                        required:
                            { value: true, message: "Live Link is required!" }
                    })}
                    name='link' id="link" type="text" placeholder="Project Live Link" className="px-2 rounded-r-lg py-2  w-full border-l bg-transparent focus:outline-0 text-white" />
            </div>

            {/* Client */}
            <div className="flex items-center gap-2 rounded-lg bg-transparent border-blue-200 border shadow-md shadow-blue-500">
                <label htmlFor='client' className="flex items-center gap-1 pl-2 md:text-lg"><IoGitBranch />Client</label>
                <input
                    {...register("client", {
                        required:
                            { value: false, message: "Client Side Repository Link is required!" }
                    })}
                    name='client' id="client" type="text" placeholder="Client Side Repository Link" className="px-2 rounded-r-lg py-2  w-full border-l bg-transparent focus:outline-0 text-white" />
            </div>

            {/* Server */}
            <div className="flex items-center gap-2 rounded-lg bg-transparent border-blue-200 border shadow-md shadow-blue-500">
                <label htmlFor='server' className="flex items-center gap-1 pl-2 md:text-lg"><IoMdGitMerge />server</label>
                <input
                    {...register("server", {
                        required:
                            { value: false, message: "Server Side Repository Link is required!" }
                    })}
                    name='server' id="server" type="text" placeholder="Server Side Repository Link" className="px-2 rounded-r-lg py-2  w-full border-l bg-transparent focus:outline-0 text-white" />
            </div>

            {/* Technologies */}
            <div className="flex items-center gap-2 rounded-lg bg-transparent border-blue-200 border shadow-md shadow-blue-500">
                <label htmlFor='technologies' className="flex items-center gap-1 pl-2 md:text-lg"><GrTechnology />Technologies</label>
                <input
                    {...register("technologies", {
                        required:
                            { value: true, message: "Technologies are required!" }
                    })}
                    name='technologies' id="technologies" type="text" placeholder="Technologies used in the Project" className="px-2 rounded-r-lg py-2  w-full border-l bg-transparent focus:outline-0 text-white" />
            </div>

            {/* Features */}
            <div className="flex md:flex-row flex-col items-start justify-start gap-2 bg-transparent rounded-lg border-blue-200 border shadow-md shadow-blue-500">
                <label htmlFor='features' className="flex items-center gap-1 justify-start pl-2 pt-1.5 md:text-lg w-full md:w-28"><PiShootingStarBold />Features</label>
                <textarea
                    {...register("features", {
                        required:
                            { value: true, message: "Features are required!" }
                    })}
                    name='features' id="features" placeholder="Features of the Project" className="h-48 px-2 rounded-tr-none md:rounded-r-lg py-2 w-full border-t md:border-t-0 md:border-l bg-transparent focus:outline-none text-white"></textarea>
            </div>

            {/* Submit Button */}
            <button title='Save' type="submit" className="absolute top-4 right-8 text-3xl text-teal-500 hover:scale-105 hover:text-blue-50 transition-all duration-500">
                <FaRegSave />
            </button>
        </form>
    );
};

ProjectForm.propTypes = {
    project: PropTypes.object,
    addProject: PropTypes.bool,
    handleAddProject: PropTypes.func,
    handleUpdateProject: PropTypes.func,
    setShowUpdateForm: PropTypes.func,
}

export default ProjectForm;