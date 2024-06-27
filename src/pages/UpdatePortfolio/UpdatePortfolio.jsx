import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Projects from "../../components/Projects/Projects";

const UpdatePortfolio = () => {
    // const [updateProject, setUpdateProject] = useState(true);
    const { random } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const expectedRandom = location?.state?.randomURL;
    const axiosSecure = useAxiosSecure();
    const { user, userLoading } = useAuth();

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

    // add anew project
    const handleAddProject = () => {
        console.log('Add Project');
    }

    // delete a project
    const handleUpdateProject = (updatedProject, refetch, setShowUpdateForm) => {
        updatedProject.features = updatedProject.features.split('\n').map(feature => feature.trim());
        console.log(updatedProject);
        setShowUpdateForm(false);
        refetch();
    }

    const handleDeleteProject = (id, refetch) => {
        console.log(id);
        refetch();
    }

    return (
        <section className="md:py-8 p-6 md:px-16 mb-12">
            <Helmet>
                <title>Update Portfolio - Nazmul Hassan</title>
            </Helmet>
            <h3 className="text-2xl text-center font-semibold animate-bounce">Update Portfolio Coming Soon!</h3>
            <Projects
                handleUpdateProject={handleUpdateProject}
                handleDeleteProject={handleDeleteProject}
                updateProject={true} />
        </section>
    );
};

export default UpdatePortfolio;