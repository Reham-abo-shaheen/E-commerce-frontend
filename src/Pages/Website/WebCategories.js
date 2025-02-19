import { useEffect, useState } from "react";
import { Axios } from "../../Api/Axios";
import { CAT } from "../../Api/Api";
import TitleSlice from "../../helpers/TitleSlice";
import SkeletonComponent from "../../Components/Website/Skeleton/SkeletonComponent";

export default function WebCategories() {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)

    // get all categories
    useEffect(() => {
        Axios.get(`/${CAT}`)
            .then((data) => {
                setCategories(data.data);
            })
            .catch((err) => console.log(err))
            .finally(() => setLoading(false))
    }, [])
    const getCategories = categories.map((category, key) => (
        <div key={key} className="box flex items-center w-fit p-8 bg-white" style={{
            border: "1px solid #d7d3ce ",
            boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
            maxWidth: "210px"
        }} >
            <p className="mb-0 mr-4 text-color font-bold" >{TitleSlice(category.title)}</p>
            <img src={category.image} alt="category_image" style={{
                width: "100px",
                height: "100px",
                maxWidth: "100px",
                maxHeight: "100px",
            }} />

        </div>
    ))
    return (
        <>
            <div className="flex gap-16 flex-wrap items-center justify-center">
                {loading ? (
                    <SkeletonComponent
                        // bodySkeleton={false}
                        height="150px"
                        length="20"
                        width="210px"
                    />
                ) : (getCategories)
                }
            </div>
        </>
    )
}