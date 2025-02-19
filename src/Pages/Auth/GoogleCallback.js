import axios from "axios"
import { useEffect } from "react"
import { baseURL, GOOGLE_CALL_BACK } from "../../Api/Api"
import { useLocation } from "react-router-dom"
import Cookie from "cookie-universal"

export default function GoogleCallback() {
    const location = useLocation();
    const cookie = new Cookie();
    useEffect(() => {
        async function GoogleCall() {
            try {
                let res = await axios.get(`${baseURL}/${GOOGLE_CALL_BACK}/${location.search}`)
                console.log(res)
                const token = res.data.access_token;
                cookie.set("e-commerce", token);
            } catch (e) {
                console.log(e)
            }

        }
        GoogleCall();
    }, [])
    return (
        <>
            <h1>test</h1>
        </>
    )
}