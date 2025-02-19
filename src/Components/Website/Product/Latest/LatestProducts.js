import { useState } from "react"
import Product from "../Sale/Product"
import { useEffect } from "react"
import { Axios } from "../../../../Api/Axios"
import { LATEST } from "../../../../Api/Api"
import SkeletonComponent from "../../Skeleton/SkeletonComponent"

export default function LatestProducts() {
    const [saleProducts, setSaleProducts] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        Axios.get(`${LATEST}`).then((data) => setSaleProducts(data.data))
            .finally(() => setLoading(false))
    }, [])
    const Sale = saleProducts.map((product, key) => (

        <Product key={key}
            form="rating"
            classes="product"
            id={product.id}
            title={product.title}
            img={product.images[0].image}
            description={product.description}
            price={product.price}

        />

    ))
    return (
        <>
            <div className="sale-section col-lg-2 col-md-6 col-12 w-100">
                <h1 className="text-color mb-5">Show the latest Products</h1>
                <div className="flex gap-8  flex-wrap">

                    {loading ? (
                        <SkeletonComponent
                            classes=" m-auto" height="470px"
                            length="3"
                            width="600px"
                        />
                    ) : (Sale)
                    }
                </div>
            </div >

        </>
    )
}