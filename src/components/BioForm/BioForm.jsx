import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { FaLinkedin, FaGithub, FaRegSave, FaUserGraduate } from 'react-icons/fa';
import { MdImage, MdOutlineTaskAlt } from 'react-icons/md';
import { GrDocumentUser } from "react-icons/gr";
import { FaUserPen } from "react-icons/fa6";
import { GiFallingStar } from "react-icons/gi";
import useGetBio from "../../hooks/useGetBio";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Spinner from "../Spinner/Spinner";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const BioForm = () => {
    const { bio, isBioLoading, refetchBio } = useGetBio();
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleUpdateBio = (updatedBio) => {
        updatedBio.responsibilities = updatedBio?.responsibilities.split('\n').map(feature => feature.trim());
        updatedBio.education = updatedBio?.education.split('\n').map(feature => feature.trim());
        updatedBio.highlights = updatedBio?.highlights.split('\n').map(feature => feature.trim());

        Swal.fire({
            title: 'Updating Bio...',
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
            axiosSecure.patch(`/bio/update/${bio?._id}`, updatedBio)
                .then(res => {
                    // console.log(res);
                    if (res?.data?.modifiedCount > 0) {
                        toast.success("Bio Updated!");
                        Swal.fire({
                            title: 'Bio Updated!',
                            text: `Updated ${updatedBio?.name}'s Bio!`,
                            icon: 'success',
                            confirmButtonText: 'Okay',
                            color: '#fff',
                            background: '#05030efc'
                        });
                        refetchBio();
                    } else if (
                        res?.data?.acknowledged &&
                        res?.data?.matchedCount === 1 &&
                        res?.data?.modifiedCount === 0
                    ) {
                        toast.success("Bio is Up to Date!");
                        Swal.fire({
                            title: 'Up to Date!',
                            text: `Bio is Up to Date!`,
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

    // show error toasts
    useEffect(() => {
        if (errors.name) {
            toast.error(errors.name.message, { duration: 2000 });
            return;
        }
        if (errors.profile_image) {
            toast.error(errors.profile_image.message, { duration: 2000 });
            return;
        }
        if (errors.resume) {
            toast.error(errors.resume.message, { duration: 2000 });
            return;
        }
        if (errors.linked_in) {
            toast.error(errors.linked_in.message, { duration: 2000 });
            return;
        }
        if (errors.github) {
            toast.error(errors.github.message, { duration: 2000 });
            return;
        }
        if (errors.education) {
            toast.error(errors.education.message, { duration: 2000 });
            return;
        }
        if (errors.responsibilities) {
            toast.error(errors.responsibilities.message, { duration: 2000 });
            return;
        }
        if (errors.highlights) {
            toast.error(errors.highlights.message, { duration: 2000 });
            return;
        }
    }, [errors.education, errors.github, errors.highlights, errors.linked_in, errors.name, errors.profile_image, errors.responsibilities, errors.resume]);

    if (isBioLoading) return <Spinner />

    return (
        <div className="flex flex-col md:flex-row justify-around items-center md:items-start gap-8 my-6 mb-12">
            <form
                onSubmit={handleSubmit(handleUpdateBio)}
                className="flex flex-col gap-5 items-center justify-between w-full mx-auto">
                {/* Name */}
                <div className="w-full flex items-center gap-2 rounded-lg bg-transparent border-blue-200 border shadow-md shadow-blue-500">
                    <label htmlFor='name' className="flex items-center gap-1 pl-2 md:text-lg"><FaUserPen /> Name</label>
                    <input
                        defaultValue={bio.name}
                        {...register("name", {
                            required: { value: true, message: "Name is required!" }
                        })}
                        name='name' id="name" type="text" placeholder="Your Name" className="px-2 rounded-r-lg py-2 w-full border-l bg-transparent focus:outline-0 text-white" />
                </div>

                {/* Profile Image */}
                <div className="w-full flex items-center gap-2 rounded-lg bg-transparent border-blue-200 border shadow-md shadow-blue-500">
                    <label htmlFor='profile_image' className="flex items-center gap-1 pl-2 md:text-lg"><MdImage /> Image</label>
                    <input
                        defaultValue={bio.profile_image}
                        {...register("profile_image", {
                            required: { value: true, message: "Profile Image URL is required!" }
                        })}
                        name='profile_image' id="profile_image" type="text" placeholder="Profile Image URL" className="px-2 rounded-r-lg py-2 w-full border-l bg-transparent focus:outline-0 text-white" />
                </div>

                {/* Resume */}
                <div className="w-full flex items-center gap-2 rounded-lg bg-transparent border-blue-200 border shadow-md shadow-blue-500">
                    <label htmlFor='resume' className="flex items-center gap-1 pl-2 md:text-lg"><GrDocumentUser /> Resume</label>
                    <input
                        defaultValue={bio.resume}
                        {...register("resume", {
                            required: { value: true, message: "Resume URL is required!" }
                        })}
                        name='resume' id="resume" type="text" placeholder="Resume URL" className="px-2 rounded-r-lg py-2 w-full border-l bg-transparent focus:outline-0 text-white" />
                </div>

                {/* LinkedIn */}
                <div className="w-full flex items-center gap-2 rounded-lg bg-transparent border-blue-200 border shadow-md shadow-blue-500">
                    <label htmlFor='linked_in' className="flex items-center gap-1 pl-2 md:text-lg"><FaLinkedin /> LinkedIn</label>
                    <input
                        defaultValue={bio.linked_in}
                        {...register("linked_in", {
                            required: { value: true, message: "LinkedIn URL is required!" }
                        })}
                        name='linked_in' id="linked_in" type="text" placeholder="LinkedIn URL" className="px-2 rounded-r-lg py-2 w-full border-l bg-transparent focus:outline-0 text-white" />
                </div>

                {/* GitHub */}
                <div className="w-full flex items-center gap-2 rounded-lg bg-transparent border-blue-200 border shadow-md shadow-blue-500">
                    <label htmlFor='github' className="flex items-center gap-1 pl-2 md:text-lg"><FaGithub /> GitHub</label>
                    <input
                        defaultValue={bio.github}
                        {...register("github", {
                            required: { value: true, message: "GitHub URL is required!" }
                        })}
                        name='github' id="github" type="text" placeholder="GitHub URL" className="px-2 rounded-r-lg py-2 w-full border-l bg-transparent focus:outline-0 text-white" />
                </div>

                {/* Education */}
                <div className="w-full flex md:flex-row flex-col items-start justify-start gap-2 bg-transparent rounded-lg border-blue-200 border shadow-md shadow-blue-500">
                    <label htmlFor='education' className="flex items-center gap-1 justify-start pl-2 pt-1.5 md:text-lg w-full md:w-40"><FaUserGraduate /> Education</label>
                    <textarea
                        defaultValue={bio.education.join('\n')}
                        {...register("education", {
                            required: { value: true, message: "Education info is required!" }
                        })}
                        name='education' id="education" placeholder="Education info (One per Line)" className="h-36 px-2 rounded-tr-none md:rounded-r-lg py-2 w-full border-t md:border-t-0 md:border-l bg-transparent focus:outline-none text-white"></textarea>
                </div>

                {/* Responsibilities */}
                <div className="w-full flex md:flex-row flex-col items-start justify-start gap-2 bg-transparent rounded-lg border-blue-200 border shadow-md shadow-blue-500">
                    <label htmlFor='responsibilities' className="flex items-center gap-1 justify-start pl-2 pt-1.5 md:text-lg w-full md:w-40"><MdOutlineTaskAlt /> Responsibilities</label>
                    <textarea
                        defaultValue={bio.responsibilities.join('\n')}
                        {...register("responsibilities", {
                            required: { value: true, message: "Responsibilities are required!" }
                        })}
                        name='responsibilities' id="responsibilities" placeholder="Responsibilities (One per Line)" className="h-36 px-2 rounded-tr-none md:rounded-r-lg py-2 w-full border-t md:border-t-0 md:border-l bg-transparent focus:outline-none text-white"></textarea>
                </div>

                {/* Highlights */}
                <div className="w-full flex md:flex-row flex-col items-start justify-start gap-2 bg-transparent rounded-lg border-blue-200 border shadow-md shadow-blue-500">
                    <label htmlFor='highlights' className="flex items-center gap-1 justify-start pl-2 pt-1.5 md:text-lg w-full md:w-28"><GiFallingStar /> Highlights</label>
                    <textarea
                        defaultValue={bio.highlights.join('\n')}
                        {...register("highlights", {
                            required: { value: true, message: "Key Points are required!" }
                        })}
                        name='highlights' id="highlights" placeholder="Key Points (One per Line)" className="h-32 px-2 rounded-tr-none md:rounded-r-lg py-2 w-full border-t md:border-t-0 md:border-l bg-transparent focus:outline-none text-white"></textarea>
                </div>
                {/* Submit Button */}
                <button title='Save' type="submit" className="flex items-center gap-1 px-3 py-0.5 text-xl md:text-2xl border border-white rounded-3xl hover:text-nhb hover:bg-white animate-glowBorder hover:scale-105 transition-all duration-700 font-semibold shadow-md shadow-blue-400">
                    <FaRegSave /> Save Data
                </button>
            </form>
            {/* Image */}
            <div className="p-2 shadow-md shadow-blue-400 animate-glowBorder">
                <PhotoProvider>
                    <figure data-aos="zoom-out-down " data-aos-duration="1000" data-aos-delay="400">
                        <PhotoView src={bio.profile_image}>
                            <img
                                className="cursor-pointer w-48 lg:w-64 aspect-square hover:scale-105 transition-all duration-500 hover:animate-pulse"
                                src={bio.profile_image}
                                alt={bio.name} />
                        </PhotoView>
                        <figcaption className="text-center mt-2">{bio.name}</figcaption>
                    </figure>
                </PhotoProvider>
            </div>
        </div>
    );
};

export default BioForm;
