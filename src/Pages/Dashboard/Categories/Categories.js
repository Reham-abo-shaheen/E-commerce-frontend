import { useEffect, useState } from "react";
import { Cat, CAT } from "../../../Api/Api";
import { Axios } from "../../../Api/Axios";
import { Link } from "react-router-dom";
import Table from "../../../Components/Dashboard/Table";
export default function Categories() {
    const [categories, setCategories] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [total, setTotal] = useState();

    // get all categories
    useEffect(() => {
        Axios.get(`/${CAT}?page=${page}&limit=${limit}`)
            .then((data) => {
                setCategories(data.data.data);
                setTotal(data.data.total)
            })
            .catch((err) => console.log(err));

    }, [page, limit])

    const tableHead = [
        {
            key: "title",
            name: "Title"
        },
        {
            key: "image",
            name: "Image"
        },
        {
            key: "created_at",
            name: "Created"
        },
        {
            key: "updated_at",
            name: "Updated"
        },
    ]
    // handleDelete function
    async function handleDelete(id) {

        try {
            await Axios.delete(`${Cat}/${id}`);
            setCategories((prev) => prev.filter((cat) => cat.id !== id))
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <>
            <div className="users flex-1" style={{ margin: "100px 30px" }}>
                <div className="flex items-center justify-between">
                    <h1 className="text-center text-color mb-4">Categories</h1>
                    <Link to={"/dashboard/categories/add"} className="pink-bg shadow-md  py-2 px-3 ml-2 rounded-full text-white">Add Categories</Link>
                </div>

                <Table
                    page={page}
                    limit={limit}
                    head={tableHead}
                    data={categories}
                    delete={handleDelete}
                    setPage={setPage}
                    setLimit={setLimit}
                    total={total}
                    search="title"
                    searchLink={Cat}
                />

            </div>
        </>
    )
}