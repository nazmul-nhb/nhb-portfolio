import { CgMail } from "react-icons/cg";
import { IoHomeOutline } from "react-icons/io5";
import { FaSquareFacebook, FaLinkedin, FaWhatsapp, FaStackOverflow, FaSquareXTwitter, FaRedditAlien, FaDiscord, FaYahoo } from "react-icons/fa6";
import { VscGithub } from "react-icons/vsc";
import { FaTelegramPlane } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="max-w-[1920px] mx-auto md:py-8 p-6 md:px-12 bg-nhbBG text-white">
            <section className="mx-16 flex sm:flex-row flex-col items-center sm:justify-between text-center sm:text-left gap-6">
                {/* Contacts */}
                <div className="flex flex-col gap-3 items-center sm:items-start justify-start">
                    <h3 className="text-lg font-semibold font-kreonSerif"> Nazmul Hassan</h3>
                    <h3 className="flex items-center gap-2"><IoHomeOutline />Sirajganj, Bangladesh</h3>
                    <a className="flex items-center gap-2 hover:text-google" href="mailto:nazmulnhb@gmail.com" rel="noopener noreferrer">
                        <CgMail /> nazmulnhb@gmail.com
                    </a>
                    <a className="flex items-center gap-2 hover:text-whatsapp" href="https://wa.me/+8801623732187" target="_blank" rel="noopener noreferrer">
                        <FaWhatsapp /> +880 1623 732 187
                    </a>
                </div>
                {/* Social Links */}
                <div className="text-2xl grid grid-cols-3 gap-4 !bg-transparent">
                    <a className="flex items-center gap-2 hover:text-github hover:scale-150 transition-all duration-500" href="https://github.com/nazmul-nhb/" target="_blank" rel="noopener noreferrer">
                        <VscGithub />
                    </a>
                    <a className="flex items-center gap-2 hover:text-linkedin hover:scale-150 hover:bg-white rounded-sm transition-all duration-500" href="https://linkedin.com/in/nazmul-nhb" target="_blank" rel="noopener noreferrer">
                        <FaLinkedin />
                    </a>
                    <a className="flex items-center gap-2 hover:text-telegram hover:scale-150 transition-all duration-500" href="https://t.me/nhb42" target="_blank" rel="noopener noreferrer">
                        <FaTelegramPlane />
                    </a>
                    <a className="flex items-center gap-2 hover:text-discord hover:scale-150 transition-all duration-500" href="https://discord.com/users/831030314528538664" target="_blank" rel="noopener noreferrer">
                        <FaDiscord />
                    </a>
                    <a className="flex items-center gap-2 hover:text-yahoo hover:scale-150 transition-all duration-500" href="mailto:nazmulnhb007@yahoo.com" rel="noopener noreferrer">
                        <FaYahoo />
                    </a>
                    <a className="flex items-center gap-2 hover:text-reddit hover:scale-150 transition-all duration-500" href="https://www.reddit.com/user/nhb4207" target="_blank" rel="noopener noreferrer">
                        <FaRedditAlien />
                    </a>
                    <a className="flex items-center gap-2 hover:text-facebook hover:bg-white rounded-[4px] hover:scale-150 transition-all duration-500" href="https://facebook.com/nazmul.batchu" target="_blank" rel="noopener noreferrer">
                        <FaSquareFacebook />
                    </a>
                    <a className="flex items-center gap-2 hover:text-stackOverflow hover:scale-150 transition-all duration-500" href="https://stackoverflow.com/users/13540024/nazmul-hassan-batchu" target="_blank" rel="noopener noreferrer">
                        <FaStackOverflow />
                    </a>
                    <a className="flex items-center gap-2 hover:text-black hover:bg-white rounded-[4px] hover:scale-150 transition-all duration-500" href="https://twitter.com/nhb42" target="_blank" rel="noopener noreferrer">
                        <FaSquareXTwitter />
                    </a>
                </div>
            </section>
            {/* Copyright */}
            <p className="text-center text-sm py-8">
                {new Date().getFullYear()} &copy; Nazmul Hassan.
                <br />
                All Rights Reserved.
            </p>
        </footer>
    );
};

export default Footer;
