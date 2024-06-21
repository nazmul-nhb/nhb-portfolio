import { useEffect, useRef, useState } from "react";
import { IoIosArrowDropleft } from "react-icons/io";
import { IoHomeOutline } from "react-icons/io5";
import { RiContactsBook3Line } from "react-icons/ri";
import { GiQuillInk } from "react-icons/gi";
import { NavLink } from "react-router-dom";
import profile from "../../assets/pp-square.jpg"

const Navbar = () => {
    const [openNavbar, setOpenNavbar] = useState(false);
    const sidebarRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                sidebarRef.current &&
                !sidebarRef.current.contains(e.target)
            ) {
                setOpenNavbar(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [sidebarRef]);

    const navClasses = ({ isActive }) => isActive ? 'font-bold border-b-2 border-white flex items-center gap-2' : 'hover:border-b-2 border-b-2 border-transparent hover:border-white font-semibold flex items-center gap-2 transition-all duration-500 text-gray-400 hover:text-white';

    const navigationItems = (
        <>
            <NavLink onClick={() => setOpenNavbar(false)} className={navClasses} to={'/'}><IoHomeOutline className="sm:hidden" />Home</NavLink>
            <NavLink onClick={() => setOpenNavbar(false)} className={navClasses} to={'/contact'}><RiContactsBook3Line className="sm:hidden" />Contact Me</NavLink>
            <NavLink onClick={() => setOpenNavbar(false)} className={navClasses} to={'/blogs'}><GiQuillInk className="sm:hidden" />Blogs</NavLink>
        </>
    );

    return (
        <nav className="max-w-[1920px] bg-nhbBG text-white flex items-center justify-between gap-0 md:gap-4 mx-auto shadow-lg shadow-blue-800 px-2 sm:px-6 py-3 md:px-12 sticky top-0 bg-opacity-75 h-16 z-20">
            <figure className="flex items-center justify-start gap-2 font-kreonSerif">
                <img className="w-10 sm:w-11 h-10 sm:h-11 rounded-full p-0.5 border" src={profile} alt="profile" />
                <NavLink className="text-2xl sm:text-3xl font-semibold" to={'/'}>
                    Nazmul Hassan
                </NavLink>
            </figure>
            <div
                ref={sidebarRef} className="flex justify-between items-center text-sm xl:text-base">
                <IoIosArrowDropleft
                    className={`sm:hidden text-4xl cursor-pointer z-50 transform transition-all duration-1000 ${!openNavbar && "rotate-180"}`}
                    onClick={() => setOpenNavbar(!openNavbar)}
                />
                <ul
                    className={`w-3/5 sm:w-full flex flex-col sm:flex-row justify-start sm:justify-center gap-2 sm:gap-5 text-base sm:text-lg font-semibold duration-1000 absolute sm:static shadow-lg shadow-nhb sm:shadow-none h-screen sm:h-auto pl-6 p-4 sm:p-0 ${openNavbar ? 'right-0 top-16 bg-nhbBG flex z-10' : 'right-full top-16'}`}>
                    {navigationItems}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
