import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Lottie from "react-lottie-player";
import errorAnimation from "../../assets/error-animation.json"

const ErrorPage = () => {
    return (
        <section className="flex items-center justify-center h-screen sm:p-16">
            <Helmet>
                <title>Error : : 404</title>
            </Helmet>
            <div className="container flex flex-col items-center justify-center px-5 pb-6 mx-auto my-6 space-y-2 text-center">
                <Lottie className='my-1' loop animationData={errorAnimation} play />
                <p className="font-bold text-xl md:text-3xl text-white">Page Not Found!</p>
                <p className="mt-4 mb-8 text-blue-200">But You can Find More Info on Homepage!</p>
                <Link to={'/'} className="px-4 py-2 rounded-3xl font-bold text-lg md:text-2xl bg-transparent text-white border border-white hover:text-nhb hover:bg-white hover:scale-105 transition-all duration-700 shadow-md shadow-blue-400 hover:animate-pulse active:animate-none">Back to Homepage</Link>
            </div>
        </section>
    );
};

export default ErrorPage;
