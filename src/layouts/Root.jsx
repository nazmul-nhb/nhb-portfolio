import { useRef } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import ScrollButtons from '../components/ScrollButtons/ScrollButtons';
import AOS from 'aos';
import 'aos/dist/aos.css';
import useAuth from '../hooks/useAuth';
import { CgMail } from 'react-icons/cg';
import useMessageCount from '../hooks/useMessageCount';

AOS.init();

const Root = () => {
    const containerRef = useRef(null);
    const navigate = useNavigate();
    const { user } = useAuth();
    const { messageCount } = useMessageCount();

    return (
        <div className="max-w-[1920px] mx-auto h-screen overflow-y-auto scrollbar-hide bg-blueBG bg-fixed bg-center bg-cover bg-no-repeat">
            {
                user && <span className='fixed top-20 left-4 z-10 cursor-pointer text-blue-300 animate-growShrink hover:text-blue-500 transition-all duration-500'>
                    <CgMail onClick={() => navigate('/messages')} className="inline text-3xl md:text-4xl" />
                    {messageCount > 0 && <sup className='text-lg md:text-xl font-bold'>{messageCount}</sup>}
                </span>
            }
            <Navbar />
            <main ref={containerRef} className="max-w-[1920px] min-h-[calc(100vh-64px)] mx-auto bg-blueBG bg-fixed bg-center bg-cover bg-no-repeat text-white mt-16 h-screen overflow-x-hidden overflow-y-auto portfolio-scrollbar">
                <Outlet />
            </main>
            <ScrollButtons containerRef={containerRef} />
            <Footer />
        </div>
    );
};

export default Root;
