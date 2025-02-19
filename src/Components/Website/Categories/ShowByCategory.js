import { useEffect, useState } from "react";
import { Axios } from "../../../Api/Axios";
import { PRO } from "../../../Api/Api";
import SkeletonComponent from "../Skeleton/SkeletonComponent";
import Product from "../Product/Sale/Product";

export default function ShowbyCategory(props) {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    // get Products
    useEffect(() => {
        Axios.get(`${PRO}`)
            .then((data) => {
                setProducts(data.data);
            })
            .catch((err) => console.log(err))
            .finally(() => setLoading(false))

    }, [])
    const getPro = products.map((pro, key) => (
        pro.category === 1 &&

        <Product key={key} title={pro.title} description={pro.description} price={pro.price}
            img={pro.images[0].image}
        />

    ))
    return (
        <>
            <div className="products flex gap-11 items-stretch justify-center flex-wrap">
                {loading ? (

                    <SkeletonComponent
                        classes="col-lg-3 col-md-6 col-12"
                        height="300px"
                        length="9"
                    />
                )
                    : (
                        getPro
                    )
                }
            </div>
        </>
    )
}