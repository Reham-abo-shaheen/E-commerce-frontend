import { Link } from "react-router-dom"
import PaginatedItems from "../../Pages/Dashboard/Pagination/pagination";
import { Form } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { Filter } from "../../Context/SearchContext";
import TransformDate from "../../helpers/TransformDate";
import { Axios } from "../../Api/Axios";


export default function Table(props) {
    //Search 

    const filter = useContext(Filter);
    const search = filter.search;
    const [filteredData, setFilteredData] = useState([]);
    const searchLoading = filter.searchLoading;
    const setSearchLoading = filter.setSearchLoading;
    const showWichData = search.length > 0 ? (filteredData) : (props.data);
    async function getSearchedData() {
        try {
            const res = await Axios.post(`${props.searchLink}/search?title=${search}`)
            setFilteredData(res.data)
        } catch (err) {
            console.log(err)
        } finally {
            setSearchLoading(false)
        }
    }
    useEffect(() => {
        const delay = setTimeout(() => {
            search.length > 0 ? (getSearchedData()) : (setSearchLoading(false))
        }, 500)

        return () => clearTimeout(delay)
    }, [search])



    const currentUser = props.currentUser || false;
    const tableHeader = props.head.map((item, key) => (
        <th>{item.name}</th>
    ));

    const tableData = showWichData.map((item, key) => (
        < tr key={key} >
            <td>{item.id}</td>
            {
                props.head.map((item2, key2) => (
                    <td key={key2} >
                        {item2.key === "image" ? <img src={item[item2.key]} alt="" style={{
                            maxWidth: "140px",
                            maxHeight: "80px",
                            height: "80px",
                            margin: " 0 auto",
                            padding: " 10px",
                            borderRadius: "16px"
                        }} /> : item2.key === "images" ? (
                            <div className="flex gap-2 flex-wrap">
                                {item[item2.key].map((img, index) => (
                                    <img key={index} src={img.image} alt="" style={{ maxWidth: "60px", maxHeight: "60px" }} />
                                ))}
                            </div>) : item2.key === "created_at" || item2.key === "updated_at" ? TransformDate(item[item2.key])
                            : item[item2.key] === "1995" ? "Admin"
                                : item[item2.key] === "2001" ? "User"
                                    : item[item2.key] === "1999" ? "Product Manager"
                                        : item[item2.key] === "1996" ? "Creator" : item[item2.key]}
                        {/* Condition for check current User */}
                        {currentUser && item[item2.key] === currentUser.name ? (
                            <span style={{ color: "#9b0b1d", fontWeight: "bold" }} > (You)</span>
                        )
                            : ""}

                    </td>
                ))
            }
            <td>
                <div className="flex justify-center items-center ">
                    <Link to={`${item.id}`}><i className="fa-regular fa-pen-to-square ml-4 pink-text"></i></Link>
                    <i className="fa-solid fa-trash ml-4 text-highlight" style={{
                        color: item.id !== currentUser.id ? "#9b0b1d" : "#9b0b1dab",
                        cursor: item.id !== currentUser.id ? "pointer" : "none"
                    }} onClick={() => props.delete(item.id)}>
                    </i>
                </div>
            </td>
        </tr >
    ))

    return (
        <>
            <table className="table table-responsive-sm table-responsive-md table-hover rounded-md">
                <thead className="table-primary text-center text-color">
                    <tr>
                        <th>Id</th>
                        {tableHeader}
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {props.data.length === 0 ?
                        (
                            <tr>
                                <td style={{
                                    color: "#9b0b1d",
                                    fontSize: "20px"
                                }} colSpan={12}>Loading . . .</td>
                            </tr>
                        ) :
                        searchLoading ? (
                            <tr>
                                <td style={{
                                    color: "#9b0b1d",
                                    fontSize: "20px"
                                }} colSpan={12}>Searching . . .</td>
                            </tr>
                        ) : filteredData.length === 0 && search.length !== 0 ? (
                            <tr>
                                <td style={{
                                    color: "#9b0b1d",
                                    fontSize: "20px"
                                }} colSpan={12}>No Result to show </td>
                            </tr>
                        ) : (
                            tableData
                        )}


                </tbody>
            </table>
            <div className="bg-white">
                <div className="flex items-center justify-end p-4">
                    <PaginatedItems itemsPerPage={props.limit} data={props.data} setPage={props.setPage} total={props.total} />

                    <Form.Select aria-label="Default select example" style={{
                        width: "130px",

                    }} onChange={(e) => props.setLimit(e.target.value)}>
                        <option>Select limit of items</option>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                    </Form.Select>
                </div>
            </div>
        </>
    )
}