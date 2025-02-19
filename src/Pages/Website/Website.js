import { Outlet } from "react-router-dom"
import Header from "../../Components/Website/Header/Header"
import MiniNav from "../../Components/Website/MiniNav/MiniNav"

export default function Website() {

    return (
        <>
            <div className="container">
                <Header />
                <div className="landing">
                    <MiniNav />
                </div>
                <Outlet />
            </div>
        </>
    )

}