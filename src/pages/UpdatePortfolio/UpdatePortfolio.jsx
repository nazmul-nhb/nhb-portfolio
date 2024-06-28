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

const UpdatePortfolio = () => {
    const [closing, setClosing] = useState(false);
    const [addOpen, setAddOpen] = useState(false);
    const { random } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const expectedRandom = location?.state?.randomURL;
    const axiosSecure = useAxiosSecure();
    const { user, userLoading } = useAuth();
    const { refetchProjects } = useGetProjects();

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
        console.log(projectData);
        setAddOpen(false);
        refetchProjects();
    }

    // update a project
    const handleUpdateProject = (id, updatedProject, setShowUpdateForm) => {
        updatedProject.features = updatedProject?.features.split('\n').map(feature => feature.trim());
        updatedProject.serial = parseInt(updatedProject?.serial);
        delete updatedProject?._id;
        Swal.fire({
            title: 'Updating Project',
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
                    if (res.data.modifiedCount > 0) {
                        toast.success("Project Updated");
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
    const handleDeleteProject = (id, title) => {
        console.log({ id, title });
        refetchProjects();
    }

    const handleClose = () => {
        setClosing(true);
        setTimeout(() => {
            setClosing(false);
            setAddOpen(false);
        }, 500); // match timeout with the animation duration
    };

    return (
        <section className="md:py-8 p-6 md:px-16">
            <Helmet>
                <title>Update Portfolio - Nazmul Hassan</title>
            </Helmet>
            <button onClick={() => setAddOpen(!addOpen)} className="text-2xl font-semibold">Add Project</button>

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

                        <ProjectForm addProject={true} handleAddProject={handleAddProject} />
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