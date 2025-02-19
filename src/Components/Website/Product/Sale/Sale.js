import { useState } from "react"
import Product from "./Product"
import { useEffect } from "react"
import { Axios } from "../../../../Api/Axios"
import { LatestSale } from "../../../../Api/Api"
import SkeletonComponent from "../../Skeleton/SkeletonComponent"
import { Link } from "react-router-dom"

export default function Sale(props) {
    const [saleProducts, setSaleProducts] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        Axios.get(`${LatestSale}`).then((data) => setSaleProducts(data.data.slice(0, props.length)))
            .finally(() => setLoading(false))
    }, [])
    const Sale = saleProducts.map((product, key) => (

        <Product key={key}
            form="sale"
            classes="sale-product"
            id={product.id}
            title={product.title}
            img={product.images[0].image}
            description={product.description}
            price={product.price}
            about={product.About}
            sale={true}
            color={true}
        />

    ))
    return (
        <>
            <div className="sale-section col-lg-2 col-md-6 col-12 w-100">
                <div className="flex items-center">
                    {props.length === 1 &&
                        <>
                            <h1 className="text-color mb-5">Show the best Price</h1>
                            <Link className="mb-5 ml-3 text-color hover:text-pink-400" to={"/all-best-price"}>Show All </Link>
                        </>}
                </div>
                <div className="flex gap-8 flex-wrap">

                    {loading ? (
                        <SkeletonComponent
                            classes=" m-auto" height="470px"
                            length="1"
                            width="600px"
                        />
                    ) : (Sale)
                    }
                </div>
            </div >
            <hr className="my-5"></hr>

        </>
    )
}