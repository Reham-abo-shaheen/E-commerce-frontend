import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu } from "../../Context/MenuContext";
import { Axios } from "../../Api/Axios";
import { USER } from "../../Api/Api";

export default function SideBar() {
    const menu = useContext(Menu);
    const isOpen = menu.isOpen;
    const minify = menu.minify;

    const [user, setUser] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        Axios.get(`/${USER}`)
            .then((data) => setUser(data.data))
            .catch(() => navigate("/login", { replace: true }))
    }, [])
    return (
        <>

            <div className="side-bar shadow-md" style={{
                left: isOpen ? "0" : "-100px", width: !minify ? " 16.875rem" : "80px",
                display: !isOpen && !minify ? "none" : ""
            }}>
                <div className="quick-access ">
                    <div className="web-component  bg-white flex flex-row items-center justify-center shadow-sm">
                        <span className="icon text-color"><i className="fa-brands fa-react"></i></span>
                        <h4 className=" text-color" style={{ display: !minify ? "block" : "none" }}>SmartAdmin</h4>
                        <i className="fa-solid fa-chevron-down text-color " style={{ display: !minify ? "block" : "none" }} ></i>
                        <div className="pop-component flex flex-row items-center justify-start pl-8">
                            <Link to={"/"} className="span flex flex-col items-center content-center text-indigo-500 mx-4"><i className="fa-solid fa-house"></i>Home</Link>
                            <Link to={""} className="span flex flex-col items-center content-center text-purple-500 mx-4"><i className="fa-solid fa-inbox"></i>Inbox</Link>
                            <Link to={""} className="span flex flex-col items-center content-center text-pink-500 mx-4"><i className="fa-regular fa-square-plus"></i>More</Link>
                        </div>
                    </div>
                </div>
                <div className="account-section flex flex-row items-center">
                    <img src={require("../../assets/fotos/avatar.jpg")} alt="avatar" />
                    <div className="info" style={{ display: !minify ? "block" : "none" }} >
                        <h6 className="text-md text-center">{user.name}</h6>
                        <span className="text-sm">Osnabrueck, Germany</span>
                    </div>
                </div>
                <div className="elements bg-white shadow-md flex">
                    <ul className="flex flex-col p-0 w-full">
                        <NavLink className="sidebar-link  my-3 " to={"/"} ><i className="fa-solid fa-globe pr-2"></i><span style={{ display: !minify ? "" : "none" }}>Website</span></NavLink>
                        {user.role === "1995" &&
                            <NavLink className="sidebar-link  my-3 " to={"/dashboard/users"} ><i className="fa-solid fa-user-group pr-2 "></i><span style={{ display: !minify ? "" : "none" }}>Users</span></NavLink>
                        }
                        {user.role === "1995" || user.role === "1999" ?
                            <NavLink className="sidebar-link  my-3 " to={"categories"} ><i className="fa-solid fa-swatchbook pr-2"></i><span style={{ display: !minify ? "" : "none" }}>Categories</span></NavLink>
                            : ""}
                        {user.role === "1995" || user.role === "1999" ?
                            <NavLink className="sidebar-link  my-3 " to={"products"} ><i className="fa-solid fa-tags pr-2"></i><span style={{ display: !minify ? "" : "none" }}>Products</span></NavLink>
                            : ""}

                        <NavLink className="sidebar-link  my-3 " to={""} ><i className="fa-solid fa-gears pr-2"></i><span style={{ display: !minify ? "" : "none" }}>Setting</span></NavLink>
                        <NavLink className="sidebar-link  my-3 " to={""} ><i className="fa-regular fa-credit-card pr-2"></i><span style={{ display: !minify ? "" : "none" }}>Payment</span></NavLink>
                    </ul>
                </div>
            </div >
        </>
    )
}