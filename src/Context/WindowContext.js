import { createContext, useEffect, useState } from "react";

export const WindowSize = createContext(null)
export default function WindowContext({ children }) {
    const [windowResize, setWindowResize] = useState(window.innerWidth);


    useEffect(() => {
        function Resize() {
            setWindowResize(window.innerWidth);
        }
        window.addEventListener("resize", Resize);

        // cleanUp function
        return (() => {
            window.removeEventListener("resize", Resize)
        })
    }, [])

    return <WindowSize.Provider value={{ windowResize, setWindowResize }}>
        {children}
    </WindowSize.Provider>
}