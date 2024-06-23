import axios from "axios";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { CgMail } from "react-icons/cg";
import { FaRegUser } from "react-icons/fa";
import { TbMessage2Question } from "react-icons/tb";
import Lottie from "lottie-react";
import contactAnimation from "../../assets/contact-animation.json"

const Contact = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [mailSending, setMailSending] = useState(false);

    const handleSendMessage = async (msgData) => {
        setMailSending(true);
        Swal.fire({
            title: 'Sending Message, Please Wait...',
            background: '#05030efc',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        try {
            const response = await axios.post('https://nhb-portfolio-server.vercel.app/email/send', msgData);
            console.log(response);
            if (response.status === 200) {
                toast.success(response.data.message);
                Swal.fire({
                    title: 'Message Sent!',
                    text: `Hi, ${msgData?.name}, Check Your Inbox or Spam Folder!`,
                    icon: 'success',
                    confirmButtonText: 'Okay',
                    background: '#05030efc'
                });
                reset();
            } else {
                Swal.fire({
                    title: 'Message Sending Failed!',
                    text: "Something Went Wrong! Please, Try Again Later.",
                    icon: 'error',
                    confirmButtonText: 'Close',
                    background: '#05030efc'
                });
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: 'Message Sending Failed!',
                text: "Something Went Wrong! Please, Try Again Later.",
                icon: 'error',
                confirmButtonText: 'Close',
                background: '#05030ef'
            });
        } finally {
            setMailSending(false);
        }
    };

    return (
        <section className="md:py-8 p-6 md:px-16 flex flex-col md:flex-row justify-between">
            <Helmet>
                <title>Contact - Nazmul Hassan</title>
            </Helmet>

            {/* Contact Buttons */}
            <div className="w-full md:w-1/2 flex items-center justify-center">
                <Lottie className='w-3/4' animationData={contactAnimation} />
            </div>
            <div className="flex-1">
                <h3 className="text-lg md:text-3xl mb-4 md:mb-8">Let&rsquo;s Build Something <span className="font-bold">Great Together</span></h3>
                {/* Contact Form */}
                <form
                    onSubmit={handleSubmit(handleSendMessage)} className="flex flex-col gap-4 justify-between text-white">
                    <div className="flex items-center gap-2 bg-transparent rounded-lg border-blue-200 border shadow-md shadow-blue-500">
                        <label htmlFor='name' className="flex items-center gap-1 pl-2 md:text-lg w-24 md:w-28"><FaRegUser /> Name</label>
                        <input
                            {...register("name", {
                                required:
                                    { value: true, message: "You must provide your name!" }
                            })}
                            name='name' id="name" type="text" placeholder="Your Name" className="px-2 rounded-r-lg py-2  w-full border-l bg-transparent focus:outline-0 text-white" />
                    </div>
                    {
                        errors.name && <p className="animate-bounce">{errors.name.message}</p>
                    }
                    <div className="flex items-center gap-2 bg-transparent rounded-lg border-blue-200 border shadow-md shadow-blue-500">
                        <label htmlFor='email' className="flex items-center gap-1 pl-2 md:text-lg w-24 md:w-28"><CgMail /> Email</label>
                        <input
                            {...register("email", {
                                required:
                                    { value: true, message: "You must provide a valid email address!" }
                            })}
                            name='email' id="email" type="email" placeholder="Your Email Address" className="px-2 rounded-r-lg py-2 w-full border-l bg-transparent focus:outline-0 text-white" />
                    </div>
                    {
                        errors.email && <p className="animate-bounce">{errors.email.message}</p>
                    }
                    <div className="flex md:flex-row flex-col items-start justify-start gap-2 bg-transparent rounded-lg border-blue-200 border shadow-md shadow-blue-500">
                        <label htmlFor='msg' className="flex items-center gap-1 justify-start pl-2 pt-1.5 md:text-lg w-full md:w-28"><TbMessage2Question /> Message</label>
                        <textarea
                            {...register("msg", {
                                required:
                                    { value: true, message: "You must write something to send a message!" }
                            })}
                            name='msg' id="msg" placeholder="Write Your Message Here" className="h-64 px-2 rounded-tr-none md:rounded-r-lg py-2 w-full border-t md:border-t-0 md:border-l bg-transparent focus:outline-none text-white"></textarea>
                    </div>
                    {
                        errors.msg && <p className="animate-bounce">{errors.msg.message}</p>
                    }
                    <button type="submit" className="w-full md:text-xl text-lg flex items-center justify-center tracking-wide uppercase px-3 py-2 font-bold rounded-lg bg-transparent text-white border border-white hover:text-nhb hover:bg-white hover:scale-[1.03] transition-all duration-700 shadow-md shadow-blue-400 hover:animate-pulse active:animate-none">
                        {mailSending ? <CgMail className="animate-horizontal text-3xl" /> : <span className=" flex items-center gap-1"> <CgMail /> Send Message</span>}
                    </button>
                </form>
            </div>

        </section>
    );
};

export default Contact;