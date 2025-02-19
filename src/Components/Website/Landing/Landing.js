import LatestProducts from "../Product/Latest/LatestProducts"
import Sale from "../Product/Sale/Sale"
import "./Landing.css"

export default function Landing() {

    return (
        <>
            <Sale length={1} />
            <LatestProducts />
        </>
    )
}