import { useState } from "react";
import { FaDiscord, FaTelegramPlane, FaWhatsapp } from "react-icons/fa";
import { FaFacebookF, FaYahoo } from "react-icons/fa6";
import { BiLogoGmail } from "react-icons/bi";

const icons = [
    { href: "https://t.me/nhb42", component: FaTelegramPlane, title: "Telegram", color: "text-telegram" },
    { href: "https://facebook.com/nazmul.batchu", component: FaFacebookF, title: "Facebook", color: "text-facebook" },
    { href: "mailto:nazmulnhb@gmail.com", component: BiLogoGmail, title: "Gmail", color: "text-google" },
    { href: "https://discord.com/users/831030314528538664", component: FaDiscord, title: "Discord", color: "text-discord" },
    { href: "https://wa.me/+8801623732187", component: FaWhatsapp, title: "WhatsApp", color: "text-whatsapp" },
    { href: "mailto:nazmulnhb007@yahoo.com", component: FaYahoo, title: "Yahoo! Mail", color: "text-yahoo" },
];

const MovingContacts = () => {
    const [isPaused, setIsPaused] = useState(false);

    return (
        <div className="w-full h-auto my-8 text-center">
            <div className="carousel-container w-full h-auto">
                <div
                    className={`carousel ${isPaused ? 'paused' : ''}`}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    onClick={() => setIsPaused(!isPaused)}
                >
                    {icons.map((icon, index) => {
                        const IconComponent = icon.component;
                        return (
                            <a
                                key={index}
                                href={icon.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`carousel-item ${icon.color}`}
                                style={{
                                    transform: `rotateY(${index * 60}deg) translateZ(10rem)`,
                                }}
                                title={icon.title}
                            >
                                <IconComponent className="hover:scale-150 hover:text-white transition-all duration-500 text-4xl" />
                            </a>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default MovingContacts;