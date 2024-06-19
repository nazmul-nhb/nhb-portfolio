import { useEffect, useRef, useState } from "react";
import { IoIosArrowDropleft } from "react-icons/io";
import { IoHomeOutline } from "react-icons/io5";
import { RiContactsBook3Line } from "react-icons/ri";
import { GiScrollQuill } from "react-icons/gi";
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

    const navClasses = ({ isActive }) => isActive ? 'font-bold border-b-2 border-white flex items-center gap-1' : 'hover:border-b-2 border-b-2 border-transparent hover:border-white font-semibold flex items-center gap-1 transition-all duration-500';

    const navigationItems = (
        <>
            <NavLink className={navClasses} to={'/'}><IoHomeOutline />Home</NavLink>
            <NavLink className={navClasses} to={'/contact'}><RiContactsBook3Line />Contact Me</NavLink>
            <NavLink className={navClasses} to={'/blogs'}><GiScrollQuill />Blogs</NavLink>
        </>
    );

    return (
        <nav className="max-w-screen-2xl bg-nhbBG text-white flex items-center justify-between gap-0 md:gap-4 mx-auto shadow-md px-6 py-3 md:px-12 sticky top-0 bg-opacity-75 h-20 z-20">
            <figure className="flex items-center justify-start gap-2 font-kreonSerif">
                <img className="w-12 h-12 rounded-full p-0.5 border" src={profile} alt="profile" />
                <NavLink className="text-2xl font-semibold" to={'/'}>
                    Nazmul Hassan
                </NavLink>
            </figure>
            <div
                ref={sidebarRef} className="flex justify-between items-center text-sm xl:text-base">
                <IoIosArrowDropleft
                    className={`min-[1370px]:hidden max-[430px]:text-3xl text-5xl cursor-pointer z-50 transform transition-all duration-1000 ${!openNavbar && "-rotate-180"}`}
                    onClick={() => setOpenNavbar(!openNavbar)}
                />
                <ul
                    className={`w-3/5 min-[1370px]:w-full flex flex-col min-[1370px]:flex-row justify-start min-[1370px]:justify-center gap-2 min-[1370px]:gap-4 text-lg md:text-xl font-semibold duration-1000 absolute min-[1370px]:static shadow-lg shadow-slate-700 min-[1370px]:shadow-none h-screen min-[1370px]:h-auto pl-6 p-4 min-[1370px]:p-0 ${openNavbar ? 'left-0 top-20 bg-blueBG flex z-10' : '-left-full top-20'}`}>
                    {navigationItems}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
