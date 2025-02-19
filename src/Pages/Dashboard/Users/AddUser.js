import { Axios } from "../../../Api/Axios";
import { useEffect, useRef, useState } from "react"
import { USER } from "../../../Api/Api";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../../Components/Loading/Loading";
export default function AddUser() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("")
    const [loading, setLoading] = useState(false)
    // useRef for Input[Focus]
    const focus = useRef("");
    // Use [UseRef]
    useEffect(() => {
        focus.current.focus();
    }, [])
    const navigate = useNavigate();

    async function handleChange(e) {
        setLoading(true)
        e.preventDefault();
        try {
            await Axios.post(`${USER}/add`, {
                name: name,
                email: email,
                password: password,
                role: role
            })
            navigate("/dashboard/users")
        } catch (err) {
            setLoading(false)
            console.log(err)
        }
    }
    return (
        <>
            <div className="user flex-1 relative" style={{ margin: "100px 30px" }}>

                <h1 className="text-center text-color mb-4" >Add new user</h1>
                <form onSubmit={handleChange}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Username:</label>
                        <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} required ref={focus} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email:</label>
                        <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password:</label>
                        <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="select" className="form-label">Role:</label>
                        <select id="select" className="form-select" value={role} onChange={(e) => setRole(e.target.value)}>
                            <option disabled value="">Select a Role</option>
                            <option value="1995">Admin</option>
                            <option value="2001">User</option>
                            <option value="1996">Creator</option>
                            <option value="1999">Product Manager</option>
                        </select>
                    </div>

                    <Link to={"/dashboard/users"} className="bg-main-color  py-2 px-3  shadow-lg   rounded-full text-white">Back</Link>
                    <button disabled={name.length > 1 && email.length > 1 && password.length >= 6 && role !== "" ? false : true} type="submit" className="bg-highlight shadow-lg  py-2 px-3 ml-2 rounded-full text-white">Add User</button>
                </form>
            </div>
        </>
    )
}