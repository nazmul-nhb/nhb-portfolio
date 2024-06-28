import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Projects from "../../components/Projects/Projects";
import useGetProjects from "../../hooks/useGetProjects";
import ProjectForm from "../../components/Projects/ProjectForm";
import { IoIosCloseCircle } from "react-icons/io";
import toast from "react-hot-toast";
import { VscGithubProject } from "react-icons/vsc";
import { RiFolderAddLine } from "react-icons/ri";
import { GiSkills } from "react-icons/gi";
import Skills from "../../components/Skills/Skills";
import { HiOutlineViewGridAdd } from "react-icons/hi";
import SkillForm from "../../components/Skills/SkillForm";
import useGetSkills from "../../hooks/useGetSkills";

const UpdatePortfolio = () => {
    const [closing, setClosing] = useState(false);
    const [addOpen, setAddOpen] = useState(false);
    const [showSkillForm, setShowSkillForm] = useState(false);
    const { random } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const expectedRandom = location?.state?.randomURL;
    const axiosSecure = useAxiosSecure();
    const { user, userLoading } = useAuth();
    const { refetchProjects } = useGetProjects();
    const { refetchSkills } = useGetSkills()

    useEffect(() => {
        if (random !== expectedRandom || !user) {
            Swal.fire({
                title: "Access Denied!",
                text: "Unauthorized Access Attempt!",
                icon: "error",
                color: '#fff',
                background: '#05030efc',
                confirmButtonText: "OK"
            }).then(() => {
                navigate('/')
            });
        }
    }, [expectedRandom, navigate, random, user, userLoading]);

    // add a new project
    const handleAddProject = (projectData) => {
        projectData.features = projectData?.features.split('\n').map(feature => feature.trim());
        projectData.serial = parseInt(projectData?.serial);
        Swal.fire({
            title: 'Adding Project...',
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
            axiosSecure.post(`/projects/add`, projectData)
                .then(res => {
                    if (res?.data?.insertedId) {
                        toast.success("Project Added!");
                        Swal.fire({
                            title: 'Project Added!',
                            text: `${projectData?.title} Added!`,
                            icon: 'success',
                            confirmButtonText: 'Okay',
                            color: '#fff',
                            background: '#05030efc'
                        });
                        setAddOpen(false);
                        refetchProjects();
                    } else if (res?.data?.message) {
                        Swal.fire({
                            title: 'Error!',
                            text: res.data.message,
                            icon: 'error',
                            confirmButtonText: 'Close',
                            color: '#fff',
                            background: '#05030efc'
                        });
                    }
                })
                .catch(error => {
                    console.error(error);
                    if (error) {
                        Swal.fire({
                            title: 'Failed!',
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
                title: 'Failed!',
                text: error?.message,
                icon: 'error',
                confirmButtonText: 'Close',
                color: '#fff',
                background: '#05030efc'
            })
        }
    }

    // update a project
    const handleUpdateProject = (id, updatedProject, setShowUpdateForm) => {
        updatedProject.features = updatedProject?.features.split('\n').map(feature => feature.trim());
        updatedProject.serial = parseInt(updatedProject?.serial);
        delete updatedProject?._id;
        Swal.fire({
            title: 'Updating Project...',
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
            axiosSecure.patch(`/projects/update/${id}`, updatedProject)
                .then(res => {
                    if (res?.data?.modifiedCount > 0) {
                        toast.success("Project Updated!");
                        Swal.fire({
                            title: 'Updated!',
                            text: `Updated ${updatedProject?.title}!`,
                            icon: 'success',
                            confirmButtonText: 'Okay',
                            color: '#fff',
                            background: '#05030efc'
                        });
                        setShowUpdateForm(false);
                        refetchProjects();
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

    // delete a project
    const handleDeleteProject = (id, title, setOpenProjectID) => {
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
                    title: 'Deleting Project...',
                    text: 'Please, wait a moment!',
                    icon: 'info',
                    color: '#fff',
                    background: '#05030efc',
                    allowOutsideClick: false,
                    didOpen: () => {
                        Swal.showLoading();
                    }
                });
                axiosSecure.delete(`/projects/delete/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetchProjects();
                            setOpenProjectID(null);
                            Swal.fire({
                                title: 'Project Deleted!',
                                text: `Permanently Deleted "${title}"!`,
                                icon: 'success',
                                color: '#fff',
                                background: '#05030efc',
                            })
                            toast.success('Deleted the Project!');
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

    // add a new skill
    const handleAddNewSkill = (skillData) => {
        skillData.serial = parseInt(skillData?.serial);
        skillData.level = parseInt(skillData?.level);
        Swal.fire({
            title: 'Adding Skill...',
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
            axiosSecure.post(`/skills/add`, skillData)
                .then(res => {
                    if (res?.data?.insertedId) {
                        toast.success("Skill Added!");
                        Swal.fire({
                            title: 'Skill Added!',
                            text: `${skillData?.title} Added!`,
                            icon: 'success',
                            confirmButtonText: 'Okay',
                            color: '#fff',
                            background: '#05030efc'
                        });
                        setAddOpen(false);
                        refetchSkills();
                    } else if (res?.data?.message) {
                        Swal.fire({
                            title: 'Error!',
                            text: res.data.message,
                            icon: 'error',
                            confirmButtonText: 'Close',
                            color: '#fff',
                            background: '#05030efc'
                        });
                    }
                })
                .catch(error => {
                    console.error(error);
                    if (error) {
                        Swal.fire({
                            title: 'Failed!',
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
                title: 'Failed!',
                text: error?.message,
                icon: 'error',
                confirmButtonText: 'Close',
                color: '#fff',
                background: '#05030efc'
            })
        }
    }

    const handleClose = () => {
        setClosing(true);
        setTimeout(() => {
            setClosing(false);
            setAddOpen(false);
            setShowSkillForm(false);
        }, 500); // match timeout with the animation duration
    };

    return (
        <section className="md:py-8 p-6 md:px-16">
            <Helmet>
                <title>Update Portfolio - Nazmul Hassan</title>
            </Helmet>

            {/* Skills Section */}
            <h2 className="pb-1 border-b my-6 font-bold text-xl sm:text-2xl md:text-3xl flex justify-between items-center">
                <span className="flex items-center gap-2"><GiSkills />Skills</span>
                <HiOutlineViewGridAdd onClick={() => { setAddOpen(true); setShowSkillForm(true) }} className="cursor-pointer hover:text-blue-300 text-white transition-all duration-500" />
            </h2>
            <Skills updateSkill={true} />

            {/* Projects Section */}
            <h2 className="pb-1 border-b my-6 font-bold text-xl sm:text-2xl md:text-3xl flex justify-between items-center">
                <span className="flex items-center gap-2"><VscGithubProject />Projects</span>
                <RiFolderAddLine onClick={() => setAddOpen(true)} className="cursor-pointer hover:text-blue-300 text-white transition-all duration-500" />
            </h2>

            {addOpen && <>
                <div className="modal-background" onClick={handleClose}></div>
                <dialog open
                    className={`modal-content ${closing ? 'modal-content-close' : ''} w-[96%] md:w-3/4 lg:w-3/4 xl:w-3/5 2xl:w-auto h-3/4 bg-opacity-95 p-2 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-transparent rounded-lg z-50 text-white`}
                >
                    <div className='bg-blueBG bg-cover border-2 shadow-lg h-full rounded-lg p-1 flex flex-col overflow-y-auto !pb-6'>
                        <IoIosCloseCircle
                            onClick={handleClose}
                            className='absolute -top-1 -right-1 text-2xl bg-white rounded-full text-red-700 hover:text-nhb transition-all duration-500 cursor-pointer'
                            title='Close'
                        />
                        {showSkillForm
                            ? <SkillForm addSkill={true} handleAddNewSkill={handleAddNewSkill} />
                            : <ProjectForm addProject={true} handleAddProject={handleAddProject} />
                        }
                    </div>
                </dialog>
            </>}
            <Projects
                handleUpdateProject={handleUpdateProject}
                handleDeleteProject={handleDeleteProject}
                updateProject={true} />
        </section>
    );
};

export default UpdatePortfolio;