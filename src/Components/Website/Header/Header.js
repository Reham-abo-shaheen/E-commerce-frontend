import { Link, NavLink } from "react-router-dom"
import "./Header.css"
import ShoppingCart from "../ShoppingCart";
import Cookie from "cookie-universal"
import { Axios } from "../../../Api/Axios";
import { LOGOUT } from "../../../Api/Api";

export default function Header() {
    const cookie = Cookie();
    const token = cookie.get("e-commerce")

    async function handleLogout() {
        try {
            await Axios.get(`/${LOGOUT}`);
            cookie.remove("e-commerce")
            window.location.pathname = "/login"
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <>
            <div className="header flex items-center ">
                <div className="header-links basis-2/5">
                    <NavLink to={"/"} className="header-link mr-3 active:font-bold">Shop</NavLink>
                    <NavLink to={"/categories"} className="header-link  mr-3 active:font-bold ">Categories</NavLink>
                    <NavLink to={""} className="header-link mr-3  active:font-bold">About us</NavLink>
                    <NavLink to={""} className="header-link mr-3  active:font-bold">Contact</NavLink>
                </div>
                <div className="header-logo basis-1/5">
                    <img src={require("../../../assets/logo.png")} alt="logo" />
                </div>
                <div className="header-profile flex items-center justify-between basis-2/5">
                    <div className="login-link ">
                        {token ?

                            <p className="header-link cursor-pointer m-0" to={"/login"} onClick={handleLogout}> Logout</p>
                            :
                            <Link className="header-link " to={"/login"} >Login</Link>
                        }
                    </div>
                    <div className="social">
                        <Link to={"https://www.instagram.com/"}><i className="fa-brands fa-instagram mr-4 text-color"></i></Link>
                        <Link to={"https://x.com/i/flow/login"}><i className="fa-brands fa-x-twitter mr-4 text-color"></i></Link>
                    </div>

                    <ShoppingCart />
                </div>
            </div>

        </>
    )
}