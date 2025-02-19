import { useEffect, useState } from "react";
import { Axios } from "../../../Api/Axios";
import { CAT } from "../../../Api/Api";
import { Link } from "react-router-dom";
import SkeletonComponent from "../Skeleton/SkeletonComponent";
import ShowbyCategory from "../Categories/ShowByCategory";

export default function MiniNav() {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)

    // get all categories
    useEffect(() => {
        Axios.get(`/${CAT}`)
            .then((data) => {
                setCategories(data.data.slice(0, 3));
            })
            .catch((err) => console.log(err))
            .finally(() => setLoading(false))
    }, [])
    const getCat = categories.map((cat, key) => (

        <Link key={key} to={`/${cat.title}`} className="cat-link  active:font-bold">{cat.title}</Link>
    ))
    return (
        <>

            <div className="cat flex items-center justify-center">
                {loading ? (
                    <SkeletonComponent
                        bodySkeleton={false}
                        height="27px"
                        length="3"
                        width="70px"
                    />
                ) : (getCat)
                }
            </div>

            <hr></hr>
            {/* <ShowbyCategory /> */}

        </>
    )
}