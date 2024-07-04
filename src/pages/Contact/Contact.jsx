import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { CgMail } from "react-icons/cg";
import { LuMailCheck, LuUserCheck } from "react-icons/lu";
import { TbMessage2Question } from "react-icons/tb";
import Lottie from "react-lottie-player";
import contactAnimation from "../../assets/contact-animation.json"
import useAxiosPortfolio from "../../hooks/useAxiosPortfolio";

const Contact = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [mailSending, setMailSending] = useState(false);
    const axiosPortfolio = useAxiosPortfolio();

    const handleSendMessage = async (msgData) => {
        setMailSending(true);
        Swal.fire({
            title: 'Sending Message...',
            text: 'Please, wait a moment!',
            icon: 'info',
            color: '#fff',
            background: '#05030efc',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        try {
            const response = await axiosPortfolio.post('/email/send', msgData);
            // console.log(response);
            if (response.status === 200) {
                toast.success('Message Sent!');
                Swal.fire({
                    title: 'Message Sent!',
                    text: `Thank You, ${msgData?.name}. Please, Check Your Email!`,
                    icon: 'success',
                    confirmButtonText: 'Okay',
                    color: '#fff',
                    background: '#05030efc'
                });
                reset();
            } else {
                Swal.fire({
                    title: 'Message Sending Failed!',
                    text: "Something Went Wrong! Please, Try Again Later.",
                    icon: 'error',
                    confirmButtonText: 'Close',
                    color: '#fff',
                    background: '#05030efc'
                });
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: 'Message Sending Failed!',
                text: error?.message || "Something Went Wrong! Please, Try Again Later.",
                icon: 'error',
                confirmButtonText: 'Close',
                color: '#fff',
                background: '#05030efc'
            });
        } finally {
            setMailSending(false);
        }
    };

    useEffect(() => {
        if (errors.name) {
            toast.error(errors.name.message, { duration: 2000 })
            return;
        }
        if (errors.email) {
            toast.error(errors.email.message, { duration: 2000 })
            return;
        }
        if (errors.msg) {
            toast.error(errors.msg.message, { duration: 2000 })
            return;
        }
    }, [errors.name, errors.msg, errors.email, errors.serial]);

    return (
        <section className="p-6 pb-12 md:px-16 flex flex-col lg:flex-row lg:items-center justify-between">
            <Helmet>
                <title>Contact - Nazmul Hassan</title>
            </Helmet>

            {/* Animation */}
            <div data-aos="zoom-in-down" data-aos-duration="1500"
                className="w-full lg:w-1/2 flex items-center justify-center">
                <Lottie className='sm:w-3/5' loop animationData={contactAnimation} play />
            </div>
            <div data-aos="zoom-in-up" data-aos-duration="1500" className="flex-1">
                <h3 className="text-lg md:text-3xl lg:text-2xl xl:text-3xl text-center mb-4 md:mb-8">Let&rsquo;s Create Something <span className="font-bold animate-pulse">Great Together</span></h3>
                {/* Contact Form */}
                <form
                    onSubmit={handleSubmit(handleSendMessage)}
                    className="flex flex-col gap-4 justify-between bg-nhb bg-opacity-80 text-white p-2 sm:p-5 rounded-lg shadow-md shadow-blue-500 animate-glowBorder">
                    <div className="flex items-center gap-2 rounded-lg bg-transparent border-blue-200 border shadow-md shadow-blue-500">
                        <label htmlFor='name' className="flex items-center gap-1 pl-2 md:text-lg w-24 md:w-28"><LuUserCheck /> Name</label>
                        <input
                            {...register("name", {
                                required:
                                    { value: true, message: "Please, provide your name!" }
                            })}
                            name='name' id="name" type="text" placeholder="Your Name" className="px-2 rounded-r-lg py-2  w-full border-l bg-transparent focus:outline-0 text-white" />
                    </div>

                    <div className="flex items-center gap-2 bg-transparent rounded-lg border-blue-200 border shadow-md shadow-blue-500">
                        <label htmlFor='email' className="flex items-center gap-1 pl-2 md:text-lg w-24 md:w-28"><LuMailCheck /> Email</label>
                        <input
                            {...register("email", {
                                required:
                                    { value: true, message: "Provide a valid email address!" }
                            })}
                            name='email' id="email" type="email" placeholder="Your Email Address" className="px-2 rounded-r-lg py-2 w-full border-l bg-transparent focus:outline-0 text-white" />
                    </div>

                    <div className="flex md:flex-row flex-col items-start justify-start gap-2 bg-transparent rounded-lg border-blue-200 border shadow-md shadow-blue-500">
                        <label htmlFor='msg' className="flex items-center gap-1 justify-start pl-2 pt-1.5 md:text-lg w-full md:w-28"><TbMessage2Question /> Message</label>
                        <textarea
                            {...register("msg", {
                                required:
                                    { value: true, message: "Message cannot be blank!" }
                            })}
                            name='msg' id="msg" placeholder="Write Your Message Here" className="h-64 px-2 rounded-tr-none md:rounded-r-lg py-2 w-full border-t md:border-t-0 md:border-l bg-transparent focus:outline-none text-white"></textarea>
                    </div>

                    <button type="submit" className="w-full md:text-xl text-lg flex items-center justify-center tracking-wide uppercase px-3 py-2 font-bold rounded-lg bg-nhbBG text-white border border-white hover:text-blue-50 hover:scale-[1.03] transition-all duration-700 shadow-md shadow-blue-400 hover:animate-glowBorder">
                        {mailSending ? <CgMail className="animate-horizontal text-2xl" /> : <span className="flex items-center gap-1"> <CgMail /> Send Message</span>}
                    </button>
                </form>
            </div>

        </section>
    );
};

export default Contact;