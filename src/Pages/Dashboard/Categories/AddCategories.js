import { Axios } from "../../../Api/Axios";
import { useEffect, useRef, useState } from "react"
import { Cat } from "../../../Api/Api";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../../Components/Loading/Loading";
export default function AddCategories() {
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [loading, setLoading] = useState(false)
    // useRef for Input[Focus]
    const focus = useRef("");
    // Use [UseRef]
    useEffect(() => {
        focus.current.focus();
    }, [])
    const navigate = useNavigate();

    async function handleChange(e) {
        setLoading(true)
        e.preventDefault();
        const form = new FormData();
        form.append("title", title)
        form.append("image", image)
        try {
            await Axios.post(`${Cat}/add`, form)
            navigate("/dashboard/categories")
        } catch (err) {
            setLoading(false)
            console.log(err)
        }
    }
    return (
        <>
            {loading && <Loading />}
            <div className="user flex-1 relative" style={{ margin: "100px 30px" }}>
                <h1 className="text-center text-color mb-4" >Add new Category</h1>
                <form onSubmit={handleChange}>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title:</label>
                        <input type="text" className="form-control" id="name" value={title} onChange={(e) => setTitle(e.target.value)} required ref={focus} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="img" className="form-label">Choosse Image:</label>
                        <input type="file" className="form-control" id="img" onChange={(e) => setImage(e.target.files.item(0))} required />
                    </div>
                    <Link to={"/dashboard/categories"} className="bg-main-color py-2 px-3  shadow-lg   rounded-full text-white">Back</Link>
                    <button disabled={title.length > 1 ? false : true} type="submit" className="bg-highlight shadow-lg py-2 px-3 ml-2 rounded-full text-white">Add new Category</button>
                </form>
            </div>
        </>
    )
}