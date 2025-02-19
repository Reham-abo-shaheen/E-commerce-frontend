import { useContext, useEffect, useState } from "react";
import "./Bars.css"
import { useNavigate } from "react-router-dom";
import { Menu } from "../../Context/MenuContext";
import Dropdown from 'react-bootstrap/Dropdown';
import { Axios } from "../../Api/Axios";
import { LOGOUT, USER } from "../../Api/Api";
import Cookie from "cookie-universal"
import { Form } from "react-bootstrap";
import { Filter } from "../../Context/SearchContext";

export default function TopBar() {
    const menu = useContext(Menu);
    const cookie = Cookie();

    const isOpen = menu.isOpen;
    const setIsOpen = menu.setIsOpen;

    const minify = menu.minify;
    const setMinify = menu.setMinify;

    const filter = useContext(Filter);
    const search = filter.search;
    const setSearch = filter.setSearch;
    const setSearchLoading = filter.setSearchLoading;


    const [name, setName] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        Axios.get(`/${USER}`)
            .then((data) => setName(data.data.name))
            .catch(() => navigate("/login", { replace: true }))
    }, [])


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

            <div className="top-bar bg-white shadow-md" style={{ width: isOpen ? "calc(100% - 16.875rem)" : minify ? "calc(100% - 80px)" : "100%" }} >
                <div className="bar">
                    <Dropdown >
                        <Dropdown.Toggle style={{
                            backgroundColor: "rgb(155 11 29)",
                            borderColor: "rgb(155 11 29)",
                            boxShadow: "none",
                            marginRight: "5px"
                        }} id="toggle">
                            {name}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <div className="search flex items-center relative">
                    <Form.Control className="search-input" type="search" style={{
                        height: "50px"
                    }} value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setSearchLoading(true)
                        }} />
                    <i className="fa-solid fa-magnifying-glass absolute left-4" style={{}}></i>
                </div>

                <div className="mx-3 list">
                    <div className="hide-nav shadow-sm " style={{ backgroundColor: isOpen ? "" : "#a855f7", color: isOpen ? "" : "white" }} >
                        <i onClick={() => {
                            setIsOpen((prev) => !prev);
                            setMinify(false)
                        }} className="fa-solid fa-bars"></i>
                    </div>
                    <span className="hide">Hide Navigation</span>
                    <div className="minify-nav shadow-sm">
                        <i onClick={() => { setMinify((prev) => !prev); }} className="fa-solid fa-chart-bar"></i>
                    </div>
                    <span className="mini">Minify Navigation</span>
                </div>
            </div >
        </>
    )
}