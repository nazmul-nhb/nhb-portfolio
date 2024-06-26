import { Helmet } from "react-helmet-async";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const UpdatePortfolio = () => {
    const { random } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const expectedRandom = location.state?.randomURL;

    if (random !== expectedRandom) {
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

    return (
        <section className="md:py-8 p-6 md:px-16 mb-12">
            <Helmet>
                <title>UpdatePortfolio - Nazmul Hassan</title>
            </Helmet>
            <h3 className="text-2xl text-center font-semibold animate-bounce">Update Portfolio Coming Soon!</h3>
        </section>
    );
};

export default UpdatePortfolio;