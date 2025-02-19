import { Axios } from "../../../Api/Axios";
import { useEffect, useState } from "react"
import { Cat } from "../../../Api/Api";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "../../../Components/Loading/Loading";

export default function Category() {
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [disable, setDisable] = useState(true)
    const [loading, setLoading] = useState(false)

    const { id } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true)
        Axios.get(`${Cat}/${id}`).then((data) => {
            setTitle(data.data.title)

            setLoading(false)
        }).then(() => setDisable(false))
            .catch(() => navigate("/dashboard/category/page/404"))

    }, [])

    async function handleChange(e) {
        setLoading(true)
        e.preventDefault();
        const form = new FormData();
        form.append("title", title)
        form.append("image", image)
        try {
            const res = await Axios.post(`${Cat}/edit/${id}`, form
            )
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
                <h1 className="text-center text-color mb-4" >Edit Category</h1>
                <form onSubmit={handleChange}>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title:</label>
                        <input type="text" className="form-control" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="img" className="form-label">Choosse Image:</label>
                        <input type="file" className="form-control" id="img" onChange={(e) => setImage(e.target.files.item(0))} required />
                    </div>
                    <Link to={"/dashboard/categories"} className="  py-2 px-3 bg-main-color shadow-lg   rounded-full text-white">Back</Link>
                    <button disabled={disable} type="submit" className=" shadow-lg bg-highlight  py-2 px-3 ml-2 rounded-full text-white">Save</button>
                </form>
            </div>
        </>
    )
}