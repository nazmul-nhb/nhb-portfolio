import { useState } from "react";
import { FaDiscord, FaTelegramPlane, FaWhatsapp } from "react-icons/fa";
import { FaFacebookF, FaYahoo } from "react-icons/fa6";
import { BiLogoGmail } from "react-icons/bi";

const MovingContacts = () => {
    const [isPaused, setIsPaused] = useState(false);

    return (
        <div className="inset-0 flex justify-center items-center rounded-full animate-glowAll">
            <div className="w-full h-full flex justify-center items-center bg-transparent">
                <div className={`circle-animation ${isPaused ? 'paused' : ''} text-4xl bg-transparent`}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    onClick={() => setIsPaused(!isPaused)}
                >
                    <a className="flex items-center gap-2 text-github" href="https://t.me/nhb42" target="_blank" rel="noopener noreferrer" title="Telegram">
                        <FaTelegramPlane className="hover:scale-125 hover:text-white transition-all duration-500" />
                    </a>
                    <a className="flex items-center gap-2 text-facebook" href="https://facebook.com/nazmul.batchu" target="_blank" rel="noopener noreferrer" title="Facebook">
                        <FaFacebookF className="hover:scale-125 hover:text-white transition-all duration-500" />
                    </a>
                    <a className="flex items-center gap-2 text-google" href="mailto:nazmulnhb@gmail.com" rel="noopener noreferrer" title="Gmail">
                        <BiLogoGmail className="hover:scale-125 hover:text-white transition-all duration-500" />
                    </a>
                    <a className="flex items-center gap-2 text-discord" href="https://discord.com/users/831030314528538664" target="_blank" rel="noopener noreferrer" title="Discord">
                        <FaDiscord className="hover:scale-125 hover:text-white transition-all duration-500" />
                    </a>
                    <a className="flex items-center gap-2 text-whatsapp" href="https://wa.me/+8801623732187" target="_blank" rel="noopener noreferrer" title="WhatsApp">
                        <FaWhatsapp className="hover:scale-125 hover:text-white transition-all duration-500" />
                    </a>
                    <a className="flex items-center gap-2 text-yahoo" href="mailto:nazmulnhb007@yahoo.com" rel="noopener noreferrer" title="Yahoo! Mail">
                        <FaYahoo className="hover:scale-125 hover:text-white transition-all duration-500" />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default MovingContacts;