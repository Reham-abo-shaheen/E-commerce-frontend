import { Link } from "react-router-dom"
import "./Err404.css"
export default function Err404() {

    return (
        <>
            <div id="container">
                <div className="container-home shadow-box">
                    <div className="error-message">
                        <Link to={"/"} ><h1 className="text-color" > home</h1> </Link>
                    </div>
                </div>
                <div className="container-notfound shadow-box">
                    <div className="error-message-notfound">
                        <h1>404</h1>
                    </div>
                    <h3 > Page note found</h3>
                </div>
                <div className="container-contact shadow-box">
                    <div className="error-message">
                        <Link to={"/"} ><h1 className="text-color"> back</h1></Link>
                    </div>
                </div>
            </div>


        </>
    )
}