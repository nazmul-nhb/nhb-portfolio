import { useTypewriter } from "react-simple-typewriter";

const Home = () => {

    const [text] = useTypewriter({
        words: ['A Front-End Developer', 'A Front-End React Developer', 'A MERN-Stack Developer'],
        loop: true,
    });

    return (
        <section className="md:py-8 p-6 md:px-12">
            <h3>I am {text}</h3>
        </section>
    );
};

export default Home;
