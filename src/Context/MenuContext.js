import { createContext, useState } from "react"
export const Menu = createContext("");
export default function MenuContext({ children }) {

    const [isOpen, setIsOpen] = useState(true);
    const [minify, setMinify] = useState(false);
    const [lock, setLock] = useState(true);
    return <Menu.Provider value={{ isOpen, setIsOpen, minify, setMinify, lock, setLock }}>
        {children}
    </Menu.Provider>
}