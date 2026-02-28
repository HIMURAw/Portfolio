import { blue, discordBlurple } from "../utils";
import nodejsCert from "../assets/certificate/nodejscertficete.pdf";
import udemyLogo from "../assets/images/udemy.png";

export const certificates = [
    {
        id: "cert-nodejs",
        logo: udemyLogo,
        title: "Node.js Web Development",
        issuer: "Udemy",
        date: "2024",
        link: nodejsCert,
        bio: "Comprehensive course on Node.js, Express, and modern backend development practices, focusing on scalable API design and database integrations.",
        color: discordBlurple,
    },
    {
        id: "cert-fullstack",
        logo: udemyLogo,
        title: "Full-Stack Web Development",
        issuer: "Udemy",
        date: "2024",
        link: null,
        bio: "In-depth training covering the entire web development stack, from frontend frameworks like React to backend services and cloud deployment.",
        color: blue,
    }
];
