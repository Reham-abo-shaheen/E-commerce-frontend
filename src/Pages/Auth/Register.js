import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { baseURL, REGISTER } from "../../Api/Api";
import Loading from "../../Components/Loading/Loading";
import Cookie from "cookie-universal"
import "../../index.css"
export default function Register() {
    // State For Form
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });
    // useRef for Input[Focus]
    const focus = useRef("");
    // Use [UseRef]
    useEffect(() => {
        focus.current.focus();
    }, [])
    // Loading 
    const [loading, setLoading] = useState(false);
    //Error Msg
    const [err, setErr] = useState("");

    //Cookie
    const cookie = Cookie();
    // Function to Handle Input onChange
    function handleChange(e) {

        setForm({ ...form, [e.target.name]: e.target.value })
    }
    // Function to Handle Submit Button
    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post(`${baseURL}/${REGISTER}`, form);
            setLoading(false);
            const token = res.data.token;
            cookie.set("e-commerce", token);
            window.location.pathname = "/";
        } catch (err) {
            if (err.response.status === 422) {
                setErr("Email is already been taken !")
                setLoading(false);
            } else {
                setErr("server Error")
            }
        }
    }

    return (
        <>
            {loading && <Loading />}
            <div className="container">
                <div className="row h-lvh" >
                    <div className="form shadow-xl rounded-md ">
                        <form className="p-3 " onSubmit={handleSubmit}>
                            <h1 className="form-title">New account</h1>
                            <div className="mb- form-control">
                                <input type="text" id="name" name="name" valuealue={form.name} onChange={handleChange} required placeholder="Enter Your Name" ref={focus} />

                                <label htmlFor="name" className="form-label">Username</label>
                                {/* <div id="error-msg" className="form-text">We'll never share your email with anyone else.</div> */}
                            </div>
                            <div className="mb- form-control ">
                                <input type="email" className="shadow-inner" id="email" name="email" value={form.email} onChange={handleChange} required placeholder="Enter Your Email" />
                                <label htmlFor="email" className="form-label">Email address</label>
                                {/* <div id="error-msg" className="form-text">We'll never share your email with anyone else.</div> */}
                            </div>
                            <div className=" form-control">
                                <input type="password" id="password" name="password" value={form.password} onChange={handleChange} required minLength="6" placeholder="Enter Your Password" />
                                <label htmlFor="password" className="form-label">Password</label>
                            </div>
                            <button className="bg-highlight shadow-lg  py-2 px-3 ml-4 rounded-full text-white" >Register</button>
                            {err !== "" && <span className="err-msg">{err}</span>}
                        </form>
                        <div className="google-signup  space-y-2 bg-white rounded-xl shadow-sm sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:gap-x-6">
                            <img className="block mx-auto h-16 w-16 rounded-full sm:mx-0 sm:shrink-0" src={require("../../assets/Google-logo.avif")} alt="" />
                            <div className="google-body p-3 max-w-sm mx-auto  flex flex-col items-center gap-x-4">
                                <p className="text-base text-black font-semibold "> Signup with Google </p>
                                <a className="px-4 py-1 text-sm text-color font-semibold rounded-full border border-purple-200  hover:border-transparent focus:outline-none focus:ring-2 focus:ring-offset-2"
                                    href="http://127.0.0.1:8000/login-google">Signup</a>
                            </div>
                        </div>

                    </div>
                </div>
            </div >
        </>
    )
}
