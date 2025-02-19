import { createContext, useState } from "react"
export const Filter = createContext("");
export default function SearchContext({ children }) {

    const [search, setSearch] = useState("");
    const [searchLoading, setSearchLoading] = useState(false)

    return <Filter.Provider value={{ search, setSearch, searchLoading, setSearchLoading }}>
        {children}
    </Filter.Provider>
}