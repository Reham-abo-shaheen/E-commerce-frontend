import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { baseURL, LOGIN } from "../../Api/Api";
import Loading from "../../Components/Loading/Loading";
import Cookie from "cookie-universal"
import { Link } from "react-router-dom";

export default function Login() {
    // State For Form
    const [form, setForm] = useState({
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

    // Cookies
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
            const res = await axios.post(`${baseURL}/${LOGIN}`, form);
            setLoading(false);
            const token = res.data.token;
            cookie.set("e-commerce", token);
            const role = res.data.user.role;
            window.location.pathname = role === "1995" || role === "1996" || role === "1999" ? "/dashboard" : "/";

        } catch (err) {
            if (err.response.status === 401) {
                setErr("Email or Password does not correct !")
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
                            <h1 className="form-title">Login</h1>
                            <div className=" form-control ">
                                <input type="email" className="shadow-inner" id="email" name="email" value={form.email} onChange={handleChange} required placeholder="Enter Your Email" ref={focus} />
                                <label htmlFor="email" className="form-label">Email address</label>
                                {/* <div id="error-msg" className="form-text">We'll never share your email with anyone else.</div> */}
                            </div>
                            <div className=" form-control">
                                <input type="password" id="password" name="password" value={form.password} onChange={handleChange} required minLength="6" placeholder="Enter Your Password" />
                                <label htmlFor="password" className="form-label">Password</label>
                            </div>
                            <div className="mb-3">
                                <p className="ml-4 text-gray-500">You don't have an account! <Link className="text-highlight  hover:text-pink-300 " to={"/register"} >New account</Link></p>
                            </div>
                            <button className="text-color shadow-lg   bg-highlight py-2 px-3 ml-4 rounded-full text-white" >Login</button>
                            {err !== "" && <span className="err-msg">{err}</span>}
                        </form>

                    </div>

                </div>
            </div >
        </>
    )
}