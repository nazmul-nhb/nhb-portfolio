import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init();

const Root = () => {
    return (
        <>
            <Navbar></Navbar>
            <main className="max-w-[1920px] min-h-[calc(100vh-64px)] mx-auto bg-blueBG bg-fixed bg-center bg-cover bg-no-repeat text-white mt-16 overflow-x-hidden">
                <Outlet></Outlet>
            </main>
            <Footer></Footer>
        </>
    );
};

export default Root;
