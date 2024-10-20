import { useEffect, useRef, useState } from "react";
import { MdContactMail } from "react-icons/md";
import { GrAchievement } from "react-icons/gr";
import { GiCompass } from "react-icons/gi";
import { ImProfile } from "react-icons/im";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPortfolio from "../../hooks/useAxiosPortfolio";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
    const [openNavbar, setOpenNavbar] = useState(false);
    const sidebarRef = useRef(null);
    const navigate = useNavigate();
    const axiosPortfolio = useAxiosPortfolio();
    const { user, googleLogin, logOut } = useAuth();

    // generate random url suffix
    const generateRandomURL = () => {
        const random64BitHexCode = Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
        return random64BitHexCode;
    };

    // sidebar clicking in small devices
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

    // classes for navbar links
    const navClasses = ({ isActive }) => isActive ? 'font-bold border-b-2 border-white flex items-center gap-2' : 'hover:border-b-2 border-b-2 border-transparent hover:border-white font-semibold flex items-center gap-2 transition-all duration-500 text-gray-400 hover:text-white';

    // navbar links
    const navigationItems = (
		<>
			<NavLink
				onClick={() => setOpenNavbar(false)}
				className={navClasses}
				to={"/"}
			>
				<ImProfile className="sm:hidden" />
				Portfolio
			</NavLink>
			<NavLink
				onClick={() => setOpenNavbar(false)}
				className={navClasses}
				to={"/contact"}
			>
				<MdContactMail className="sm:hidden" />
				Contact Me
			</NavLink>
			<NavLink
				onClick={() => setOpenNavbar(false)}
				className={navClasses}
				to={"/achievements"}
			>
				<GrAchievement className="sm:hidden" />
				Achievements
			</NavLink>
		</>
	);

    // google login
    const handleGoogleLogin = (randomURL) => {
        googleLogin()
            .then(() => {
                navigate(`/update/${randomURL}`, { state: { randomURL } });
                toast.success("Successfully Logged in!");
            })
            .catch(error => {
                if (error?.message === "Firebase: Error (auth/popup-closed-by-user).") {
                    Swal.fire({
                        title: 'Login Failed!',
                        text: "Popup Closed by User!",
                        icon: 'warning',
                        confirmButtonText: 'Close',
                        color: '#fff',
                        background: '#05030efc'
                    });
                } else if (error?.message === "Firebase: Error (auth/account-exists-with-different-credential).") {
                    Swal.fire({
                        title: 'Login Failed!',
                        text: "Account Exists for this Email with Different Credential!",
                        icon: 'error',
                        confirmButtonText: 'Close',
                        color: '#fff',
                        background: '#05030efc'
                    });
                } else if (error?.message === "Firebase: Error (auth/network-request-failed).") {
                    Swal.fire({
                        title: 'Network Error!',
                        text: "Please, Check Your Network Connection!",
                        icon: 'error',
                        confirmButtonText: 'Close',
                        color: '#fff',
                        background: '#05030efc'
                    });
                } else {
                    Swal.fire({
                        title: 'Login Failed!',
                        text: "Error Occurred! Please, Login Later!",
                        icon: 'error',
                        confirmButtonText: 'Close',
                        color: '#fff',
                        background: '#05030efc'
                    });
                }
            })
    }

    // logout function
    const handleLogout = () => {
        logOut()
            .then(() => {
                toast.success("Logged Out Successfully!");
            })
            .catch(error => {
                Swal.fire({
                    title: 'Error!',
                    text: error?.message.split(': ')[1] || "Error Occurred! Try Again Later!",
                    icon: 'error',
                    confirmButtonText: 'Close',
                    color: '#fff',
                    background: '#05030efc'
                });
            })
    }

    // prompt for secret code
    const promptForSecretCode = () => {
        Swal.fire({
            title: "Restricted Action!",
            text: 'This Option is Only for Nazmul!',
            // icon: "info",
            input: "password",
            color: '#fff',
            inputPlaceholder: 'Enter Secret Code!',
            background: '#05030efc',
            inputAttributes: {
                autocapitalize: "off"
            },
            showCancelButton: true,
            confirmButtonText: "Submit",
            showLoaderOnConfirm: true,
            preConfirm: async (code) => {
                try {
                    const secretResponse = await axiosPortfolio.post(`/secret`, { code });
                    // console.log(secretResponse);
                    if (secretResponse?.status !== 200) {
                        toast.error(secretResponse?.data?.message);
                        Swal.showValidationMessage("Invalid Secret Code! Try Again!");
                        return false;
                    }
                    toast.success(secretResponse?.data?.message);
                    return secretResponse?.data?.urlPrefix;
                } catch (error) {
                    // console.error(error);
                    if (error?.response && error?.response?.status === 422) {
                        toast.error(error.response.data.message);
                        Swal.showValidationMessage("Invalid Secret Code! Try Again!");
                        return false;
                    } else {
                        toast.error("Error Occurred! Try Again!");
                        Swal.showValidationMessage("Error Occurred! Try Again!");
                        return false;
                    }
                }
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.isConfirmed && result.value) {
                const urlPrefix = result.value;
                // console.log(urlPrefix);
                const randomURL = urlPrefix + generateRandomURL();
                // show login prompt if not logged in
                if (!user) {
                    Swal.fire({
                        title: "Login Now?",
                        text: `Login to Update Your Portfolio!`,
                        icon: "info",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Login!",
                        color: '#fff',
                        background: '#05030efc'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            handleGoogleLogin(randomURL);
                        }
                    });
                } else {
                    navigate(`/update/${randomURL}`, { state: { randomURL } });
                }
            }
        });
    }

    const handleOwnerLogin = () => {
        // if owner is logged in, prompt to go to update page or log out
        if (user) {
            return Swal.fire({
                title: "You're Logged in!",
                text: `Update Portfolio or Log Out?`,
                icon: "info",
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "Update",
                denyButtonText: "Log Out",
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                color: '#fff',
                background: '#05030efc'
            }).then((result) => {
                if (result.isConfirmed) {
                    return promptForSecretCode();
                } else if (result.isDenied) {
                    Swal.fire({
                        title: "Are You Sure?",
                        text: `You Want to Log Out Now?`,
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Log Out!",
                        color: '#fff',
                        background: '#05030efc'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            handleLogout();
                        }
                    });
                }
            });
        }

        // prompt for secret code
        promptForSecretCode();
    }

    return (
        <nav className="max-w-[1920px] w-full bg-nhb bg-opacity-80 text-white flex items-center justify-between gap-0 md:gap-4 mx-auto shadow-lg shadow-blue-800 px-2 sm:px-6 py-3 md:px-12 fixed top-0 left-0 right-0 h-16 z-50">
            <div className="absolute inset-0 backdrop-filter backdrop-blur-lg -z-10"></div>
            <div className="flex items-center justify-start gap-2 font-kreonSerif">
                <figure onClick={handleOwnerLogin}
                    className="rounded-full shadow-md shadow-blue-300 cursor-pointer animate-growShrink inset-0">
                    <img
                        className="w-9 sm:w-10 rounded-full aspect-square animate-glowBorder hover:animate-rotate"
                        src="/logo.svg" loading="eager" alt="Logo" />
                </figure>
                <NavLink className="text-2xl sm:text-3xl font-semibold text-blue-50 hover:text-blue-300 transition-all duration-500" to={'/'}>
                    Nazmul Hassan
                </NavLink>
            </div>
            <div
                ref={sidebarRef} className="flex justify-between items-center text-sm xl:text-base">
                <GiCompass title="Navigate"
                    className={`sm:hidden text-4xl hover:text-blue-300 cursor-pointer z-50 transition-all duration-1000 ${openNavbar && "rotate-[225deg] text-blue-400"}`}
                    onClick={() => setOpenNavbar(!openNavbar)}
                />
                <ul
                    className={`w-3/5 sm:w-full flex flex-col sm:flex-row justify-start sm:justify-center gap-2 sm:gap-5 text-base sm:text-lg font-semibold transition-all duration-700 absolute sm:static sm:shadow-none h-auto pl-6 p-4 sm:p-0 ${openNavbar ? 'shadow-md shadow-blue-500 right-3 -bottom-32 bg-nhb bg-opacity-80 flex z-10' : 'right-3 bottom-full shadow-none'}`}>
                    <div className="absolute inset-0 backdrop-filter backdrop-blur-lg -z-10"></div>
                    {navigationItems}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
