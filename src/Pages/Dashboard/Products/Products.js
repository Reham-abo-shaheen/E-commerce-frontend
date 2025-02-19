import { useEffect, useState } from "react";
import { PRO, Pro } from "../../../Api/Api";
import { Axios } from "../../../Api/Axios";
import { Link } from "react-router-dom";
import Table from "../../../Components/Dashboard/Table";
export default function Products() {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [total, setTotal] = useState();

    // get all Products
    useEffect(() => {
        Axios.get(`/${PRO}?page=${page}&limit=${limit}`)
            .then((data) => {
                setProducts(data.data.data)
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
            key: "images",
            name: "Product-Imgs"
        },
        {
            key: "description",
            name: "Description"
        },
        {
            key: "price",
            name: "Price"
        },
        {
            key: "rating",
            name: "Rating"
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
            await Axios.delete(`${Pro}/${id}`);
            setProducts((prev) => prev.filter((pro) => pro.id !== id))
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <>
            <div className="users flex-1" style={{ margin: "100px 30px" }}>
                <div className="flex items-center justify-between">
                    <h1 className="text-center text-color mb-4">Products</h1>
                    <Link to={"/dashboard/products/add"} className="pink-bg shadow-md  py-2 px-3 ml-2 rounded-full text-white">Add Product</Link>
                </div>

                <Table
                    page={page}
                    limit={limit}
                    head={tableHead}
                    data={products}
                    delete={handleDelete}
                    setPage={setPage}
                    setLimit={setLimit}
                    total={total}
                    search="title"
                    searchLink={Pro}
                />
            </div>
        </>
    )
}