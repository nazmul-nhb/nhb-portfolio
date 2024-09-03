import {
	FaSquareFacebook,
	FaLinkedin,
	FaStackOverflow,
	FaSquareXTwitter,
	FaRedditAlien,
	FaDiscord,
	// FaYahoo,
} from "react-icons/fa6";
import { VscGithub } from "react-icons/vsc";
import { FaTelegramPlane } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

const SocialLinks = () => {
	return (
		<div className="text-2xl grid grid-cols-3 gap-4 !bg-transparent">
			<a
				className="flex items-center gap-2 hover:text-github hover:scale-150 transition-all duration-500"
				href="https://github.com/nazmul-nhb"
				title="GitHub"
				target="_blank"
				rel="noopener noreferrer"
			>
				<VscGithub />
			</a>
			<a
				className="flex items-center gap-2 hover:text-linkedin hover:scale-150 hover:bg-white rounded-sm transition-all duration-500"
				href="https://linkedin.com/in/nazmul-nhb"
				title="LinkedIn"
				target="_blank"
				rel="noopener noreferrer"
			>
				<FaLinkedin />
			</a>
			<a
				className="flex items-center gap-2 hover:text-telegram hover:scale-150 transition-all duration-500"
				href="https://t.me/nhb42"
				title="Telegram"
				target="_blank"
				rel="noopener noreferrer"
			>
				<FaTelegramPlane />
			</a>
			<a
				className="flex items-center gap-2 hover:text-discord hover:scale-150 transition-all duration-500"
				href="https://discord.com/users/831030314528538664"
				title="Discord"
				target="_blank"
				rel="noopener noreferrer"
			>
				<FaDiscord />
			</a>
			{/* <a className="flex items-center gap-2 hover:text-yahoo hover:scale-150 transition-all duration-500" href="mailto:nazmulnhb007@yahoo.com" title="Yahoo!" rel="noopener noreferrer">
                <FaYahoo />
            </a> */}
			<a
				className="flex items-center gap-2 hover:text-leetcode hover:scale-150 transition-all duration-500"
				href="https://leetcode.com/u/nazmul-nhb"
				title="LeetCode"
				target="_blank"
				rel="noopener noreferrer"
			>
				<SiLeetcode />
			</a>
			<a
				className="flex items-center gap-2 hover:text-reddit hover:scale-150 transition-all duration-500"
				href="https://www.reddit.com/user/nhb4207"
				title="Reddit"
				target="_blank"
				rel="noopener noreferrer"
			>
				<FaRedditAlien />
			</a>
			<a
				className="flex items-center gap-2 hover:text-facebook hover:bg-white rounded-[4px] hover:scale-150 transition-all duration-500"
				title="Facebook"
				href="https://facebook.com/nazmul.batchu"
				target="_blank"
				rel="noopener noreferrer"
			>
				<FaSquareFacebook />
			</a>
			<a
				className="flex items-center gap-2 hover:text-stackOverflow hover:scale-150 transition-all duration-500"
				href="https://stackoverflow.com/users/13540024/nazmul-hassan-batchu"
				title="Stack Overflow"
				target="_blank"
				rel="noopener noreferrer"
			>
				<FaStackOverflow />
			</a>
			<a
				className="flex items-center gap-2 hover:text-black hover:bg-white rounded-[4px] hover:scale-150 transition-all duration-500"
				title="X (Twitter)"
				href="https://twitter.com/nhb42"
				target="_blank"
				rel="noopener noreferrer"
			>
				<FaSquareXTwitter />
			</a>
		</div>
	);
};

export default SocialLinks;
