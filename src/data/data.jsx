import {
	SiExpress,
	SiMongodb,
	SiFirebase,
	SiTailwindcss,
	SiReactquery,
	SiRedux,
	SiChakraui,
	SiMui,
	SiAxios,
	SiPreact,
	SiSass,
	SiReacthookform,
	SiJsonwebtokens,
	SiAntdesign,
	SiVercel,
	SiNetlify,
	SiNestjs,
	SiMongoose,
	SiJquery,
	SiWebpack,
} from "react-icons/si";
import {
	FaHtml5,
	FaReact,
	FaNodeJs,
	FaFigma,
	FaGitAlt,
	FaAngular,
	FaVuejs,
	FaPython,
	FaBootstrap,
	FaDocker,
	FaAws,
} from "react-icons/fa";
import { FaDiscord, FaTelegramPlane, FaWhatsapp } from "react-icons/fa";
import { FaFacebookF, FaYahoo } from "react-icons/fa6";
import { BiLogoGmail } from "react-icons/bi";
import { SiLeetcode } from "react-icons/si";
import { TbBrandReactNative } from "react-icons/tb";
import { BiLogoTypescript } from "react-icons/bi";
import { IoLogoCss3 } from "react-icons/io5";
import { BsStripe } from "react-icons/bs";
import { GrMysql } from "react-icons/gr";
import { RiFlutterFill, RiJavascriptFill, RiNextjsLine } from "react-icons/ri";

export const icons = [
	{
		href: "https://t.me/nhb42",
		component: FaTelegramPlane,
		title: "Telegram",
		color: "text-telegram",
	},
	{
		href: "https://facebook.com/nazmul.batchu",
		component: FaFacebookF,
		title: "Facebook",
		color: "text-facebook",
	},
	{
		href: "mailto:nazmulnhb@gmail.com",
		component: BiLogoGmail,
		title: "Gmail",
		color: "text-google",
	},
	{
		href: "https://discord.com/users/831030314528538664",
		component: FaDiscord,
		title: "Discord",
		color: "text-discord",
	},
	{
		href: "https://leetcode.com/u/nazmul-nhb",
		component: SiLeetcode,
		title: "LeetCode",
		color: "text-leetcode",
	},
	{
		href: "https://wa.me/+8801623732187",
		component: FaWhatsapp,
		title: "WhatsApp",
		color: "text-whatsapp",
	},
	{
		href: "mailto:nazmulnhb007@yahoo.com",
		component: FaYahoo,
		title: "Yahoo! Mail",
		color: "text-yahoo",
	},
];

export const skillIcons = {
	HTML: <FaHtml5 />,
	CSS: <IoLogoCss3 />,
	SASS: <SiSass />,
	JavaScript: <RiJavascriptFill />,
	Python: <FaPython />,
	React: <FaReact />,
	Angular: <FaAngular />,
	Flutter: <RiFlutterFill />,
	"Vue.js": <FaVuejs />,
	Preact: <SiPreact />,
	TypeScript: <BiLogoTypescript />,
	"Next.js": <RiNextjsLine />,
	Redux: <SiRedux />,
	"Redux Toolkit": <SiRedux />,
	"React Native": <TbBrandReactNative />,
	"Node.js": <FaNodeJs />,
	NestJS: <SiNestjs />,
	"Express.js": <SiExpress />,
	MongoDB: <SiMongodb />,
	Mongoose: <SiMongoose />,
	TailwindCSS: <SiTailwindcss />,
	Bootstrap: <FaBootstrap />,
	Firebase: <SiFirebase />,
	Git: <FaGitAlt />,
	ChakraUI: <SiChakraui />,
	MaterialUI: <SiMui />,
	Axios: <SiAxios />,
	Stripe: <BsStripe />,
	Figma: <FaFigma />,
	Docker: <FaDocker />,
	Webpack: <SiWebpack />,
	"React Hook Form": <SiReacthookform />,
	JWT: <SiJsonwebtokens />,
	jQuery: <SiJquery />,
	"Ant Design": <SiAntdesign />,
	MySQL: <GrMysql />,
	"Vercel CLI": <SiVercel />,
	Netlify: <SiNetlify />,
	AWS: <FaAws />,
	"TanStack Query": <SiReactquery />,
};
