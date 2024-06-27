import { useForm } from "react-hook-form";
import PropTypes from 'prop-types';

const ProjectForm = ({ project, handleUpdateProject, refetch, setShowUpdateForm }) => {
    const initialProjectValues = { ...project, features: project.features.join('\n') }
    const { register, handleSubmit } = useForm({
        defaultValues: initialProjectValues
    });

    return (
        <form onSubmit={handleSubmit((updatedProject) => handleUpdateProject(updatedProject, refetch, setShowUpdateForm))} className="w-full mx-auto">
            {/* Title */}
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
            <input type="text" id="title" {...register('title')} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring bg-transparent focus:ring-opacity-50" />

            {/* Subtitle */}
            <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700 mt-4">Subtitle</label>
            <input type="text" id="subtitle" {...register('subtitle')} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring bg-transparent focus:ring-opacity-50" />

            {/* Icon */}
            <label htmlFor="icon" className="block text-sm font-medium text-gray-700 mt-4">Icon URL</label>
            <input type="text" id="icon" {...register('icon')} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring bg-transparent focus:ring-opacity-50" />

            {/* Cover */}
            <label htmlFor="cover" className="block text-sm font-medium text-gray-700 mt-4">Cover Image URL</label>
            <input type="text" id="cover" {...register('cover')} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring bg-transparent focus:ring-opacity-50" />

            {/* Link */}
            <label htmlFor="link" className="block text-sm font-medium text-gray-700 mt-4">Link</label>
            <input type="text" id="link" {...register('link')} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring bg-transparent focus:ring-opacity-50" />

            {/* Client */}
            <label htmlFor="client" className="block text-sm font-medium text-gray-700 mt-4">Client GitHub URL</label>
            <input type="text" id="client" {...register('client')} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring bg-transparent focus:ring-opacity-50" />

            {/* Server */}
            <label htmlFor="server" className="block text-sm font-medium text-gray-700 mt-4">Server GitHub URL</label>
            <input type="text" id="server" {...register('server')} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring bg-transparent focus:ring-opacity-50" />

            {/* Technologies */}
            <label htmlFor="technologies" className="block text-sm font-medium text-gray-700 mt-4">Technologies</label>
            <input type="text" id="technologies" {...register('technologies')} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring bg-transparent focus:ring-opacity-50" />

            {/* Features */}
            <label htmlFor="features" className="block text-sm font-medium text-gray-700 mt-4">Features (each on a new line)</label>
            <textarea id="features" {...register('features')} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring bg-transparent focus:ring-opacity-50" rows="4"></textarea>


            {/* Submit Button */}
            <button type="submit" className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Save
            </button>
        </form>
    );
};

ProjectForm.propTypes = {
    project: PropTypes.object,
    refetch: PropTypes.func,
    handleUpdateProject: PropTypes.func,
    setShowUpdateForm: PropTypes.func,
}

export default ProjectForm;