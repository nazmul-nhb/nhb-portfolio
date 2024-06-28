import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import { FaCode, FaRegSave, FaSlackHash } from "react-icons/fa";
import { PiSealPercentBold, PiSubtitlesBold } from "react-icons/pi";

const SkillForm = ({ handleAddNewSkill }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    useEffect(() => {
        if (errors.serial) {
            toast.error(errors.serial.message, { duration: 2000 })
            return;
        }
        if (errors.title) {
            toast.error(errors.title.message, { duration: 2000 })
            return;
        }
        if (errors.level) {
            toast.error(errors.level.message, { duration: 2000 })
            return;
        }
        if (errors.description) {
            toast.error(errors.description.message, { duration: 2000 })
            return;
        }
    }, [errors.title, errors.level, errors.description, errors.serial]);

    return (
        <form
            onSubmit={handleSubmit((skillData) => handleAddNewSkill(skillData))}
            className="flex flex-col gap-4 justify-between w-full p-3 sm:p-10 mx-auto">
            <h3 className="text-lg md:text-3xl lg:text-2xl xl:text-3xl text-center mb-4 animate-bounce font-bold">Add A New Skill</h3>

            {/* Serial */}
            <div className="flex items-center gap-2 rounded-lg bg-transparent border-blue-200 border shadow-md shadow-blue-500">
                <label htmlFor='serial' className="flex items-center gap-1 pl-2 md:text-lg"><FaSlackHash /> Serial</label>
                <input
                    {...register("serial", {
                        required:
                            { value: true, message: "Serial is required!" }
                    })}
                    name='serial' id="serial" type="number" placeholder="Skill Serial" className="px-2 rounded-r-lg py-2 w-full border-l bg-transparent focus:outline-0 text-white" />
            </div>
            {
                errors.serial && <p className="animate-bounce">{errors.serial.message}</p>
            }

            {/* Title */}
            <div className="flex items-center gap-2 rounded-lg bg-transparent border-blue-200 border shadow-md shadow-blue-500">
                <label htmlFor='title' className="flex items-center gap-1 pl-2 md:text-lg"><PiSubtitlesBold /> Title</label>
                <input
                    {...register("title", {
                        required:
                            { value: true, message: "Skill Name is required!" }
                    })}
                    name='title' id="title" type="text" placeholder="Skill Name" className="px-2 rounded-r-lg py-2 w-full border-l bg-transparent focus:outline-0 text-white" />
            </div>
            {
                errors.title && <p className="animate-bounce">{errors.title.message}</p>
            }

            {/* Technology Type */}
            <div className="flex items-center gap-2 rounded-lg bg-transparent border-blue-200 border shadow-md shadow-blue-500">
                <label htmlFor='description' className="flex items-center gap-1 pl-2 md:text-lg"><FaCode />Type</label>
                <input
                    {...register("description", {
                        required:
                            { value: true, message: "Type of Skill is required!" }
                    })}
                    name='description' id="description" type="text" placeholder="Type of Skill" className="px-2 rounded-r-lg py-2 w-full border-l bg-transparent focus:outline-0 text-white" />
            </div>
            {
                errors.description && <p className="animate-bounce">{errors.description.message}</p>
            }

            {/* Skill Level */}
            <div className="flex items-center gap-2 rounded-lg bg-transparent border-blue-200 border shadow-md shadow-blue-500">
                <label htmlFor='level' className="flex items-center gap-1 pl-2 md:text-lg"><PiSealPercentBold /> Level</label>
                <input
                    {...register("level", {
                        required: { value: true, message: "Skill Level is required!" },
                        min: { value: 0.0, message: "Skill Level cannot be a negative value!" },
                        max: { value: 100.0, message: "Skill Level cannot exceed 100!" },
                    })}
                    name='level' id="level" type="number" placeholder="Skill Level (Between 0 & 100)" className="px-2 rounded-r-lg py-2 w-full border-l bg-transparent focus:outline-0 text-white" />
            </div>
            {
                errors.level && <p className="animate-bounce">{errors.level.message}</p>
            }

            {/* Submit Button */}
            <button type="submit" className="absolute top-4 right-8 text-3xl text-blue-300 hover:text-white transition-all duration-500">
                <FaRegSave />
            </button>
        </form>
    );
};

SkillForm.propTypes = {
    handleAddNewSkill: PropTypes.func,
}

export default SkillForm;