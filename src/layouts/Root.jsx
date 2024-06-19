import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

const Root = () => {
    return (
        <>
            <Navbar></Navbar>
            <main className="max-w-screen-2xl min-h-screen mx-auto bg-blueBG h-screen bg-cover text-white">
                <Outlet></Outlet>
            </main>
            <Footer></Footer>
        </>
    );
};

export default Root;
