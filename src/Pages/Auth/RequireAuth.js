import Cookie from "cookie-universal"
import { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { USER } from "../../Api/Api";
import Loading from "../../Components/Loading/Loading";
import { Axios } from "../../Api/Axios";
import Err403 from "../../Components/Errors/Err403";
export default function RequireAuth({ allowedRole }) {

    const navigate = useNavigate();

    // ckeck User from Backend
    const [user, setUser] = useState("");

    useEffect(() => {
        Axios.get(`/${USER}`)
            .then((data) => setUser(data.data))
            .catch(() => navigate("/login", { replace: true }))
    }, [])

    const cookie = Cookie();
    const token = cookie.get("e-commerce");

    return token ?
        (user === ""
            ?
            (<Loading />)
            : allowedRole.includes(user.role) ?
                (<Outlet />) : (<Err403 />)
        ) : (
            <Navigate to={"/login"} replace={true} />
        )

}