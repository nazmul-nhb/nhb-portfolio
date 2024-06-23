import { CgMail } from "react-icons/cg";
import { IoHomeOutline } from "react-icons/io5";
import { FaWhatsapp } from "react-icons/fa6";
import SocialLinks from "../SocialLinks/SocialLinks";

const Footer = () => {
    return (
        <footer className="max-w-[1920px] mx-auto md:py-8 p-6 md:px-12 bg-blueBG bg-bottom bg-cover text-white border-t">
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
                <SocialLinks />
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
