import { Outlet } from "react-router-dom";
import SideBar from "../../Components/Dashboard/SideBar";
import TopBar from "../../Components/Dashboard/TopBar";

export default function Dashboard() {
    return (
        <>
            <TopBar />
            <div className="flex gab-2">
                <SideBar />
                <Outlet />
            </div>
        </>
    )
}