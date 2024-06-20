import projects from './projects.json'

const Projects = () => {
    return (
        <section>
            {
                projects?.map((project, index) => <div className='w-full' key={index}>
                    
                </div>)
            }
        </section>
    );
};

export default Projects;