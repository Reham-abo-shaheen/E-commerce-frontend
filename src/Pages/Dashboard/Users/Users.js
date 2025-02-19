import { useEffect, useState } from "react";
import { USER, USERS } from "../../../Api/Api";
import { Axios } from "../../../Api/Axios";
import { Link } from "react-router-dom";
import Table from "../../../Components/Dashboard/Table";
export default function Users() {

    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [total, setTotal] = useState();

    // get Current User
    useEffect(() => {
        Axios.get(`${USER}`)
            .then((res) => {
                setCurrentUser(res.data);

            })
    }, [])

    // get all users
    useEffect(() => {
        Axios.get(`/${USERS}?page=${page}&limit=${limit}`)
            .then((data) => {
                setUsers(data.data.data)
                setTotal(data.data.total)
            }
            )
            .catch((err) => console.log(err));

    }, [page, limit])

    const tableHead = [
        {
            key: "name",
            name: "Username"
        },
        {
            key: "email",
            name: "Email"
        },
        {
            key: "created_at",
            name: "Created"
        },
        {
            key: "updated_at",
            name: "Updated"
        },
        {
            key: "role",
            name: "Role"
        },
    ]
    // handleDelete function
    async function handleDelete(id) {
        if (currentUser.id !== id) {
            try {
                await Axios.delete(`${USER}/${id}`);
                setUsers((prev) => prev.filter((user) => user.id !== id))
            } catch (err) {
                console.log(err)
            }
        }
    }
    return (
        <>
            <div className="users flex-1" style={{ margin: "100px 30px" }}>
                <div className="flex items-center justify-between">
                    <h1 className="text-center text-color mb-4">Users</h1>
                    <Link to={"/dashboard/user/add"} className="pink-bg  py-2 px-3 ml-2 rounded-full text-white">Add User</Link>
                </div>
                <Table
                    page={page}
                    limit={limit}
                    head={tableHead}
                    data={users}
                    currentUser={currentUser}
                    delete={handleDelete}
                    setPage={setPage}
                    setLimit={setLimit}
                    total={total}
                    search="name"
                    searchLink={USER}
                />
            </div>
        </>
    )
}