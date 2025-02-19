import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Axios } from "../../Api/Axios";
import { CART, Pro } from "../../Api/Api";
import ImageGallery from "react-image-gallery";
import "./SingleProduct.css"
import SkeletonComponent from "../../Components/Website/Skeleton/SkeletonComponent";
import { Cart } from "../../Context/CartContext";
import PlusMinusBtn from "../../Components/Website/Btns/PlusMinusBtn";

export default function SingleProduct() {
    const { id } = useParams()
    const [product, setProduct] = useState({})
    const [productImages, setProductImages] = useState([])
    const [loading, setLoading] = useState(true)
    const { setIsChange } = useContext(Cart)
    const roundStars = Math.round(product.rating);
    const stars = Math.min(roundStars, 5)
    const goldStars = Array.from({ length: stars }).map((_, index) => (
        <i key={index} className="fa-solid fa-star text-yellow-500"></i>
    ))
    const emptyStars = Array.from({ length: 5 - stars }).map((_, index) => (
        <i key={index} className="fa-regular fa-star text-color"></i>
    ))
    const [count, setCount] = useState(1);
    console.log(count)
    useEffect(() => {
        Axios.get(`${Pro}/${id}`)
            .then((data) => {
                setProductImages(data.data[0].images.map((img) => {
                    return {
                        original: img.image,
                        thumbnail: img.image
                    }
                }
                ));
                setProduct(data.data[0])
            }).finally(() => setLoading(false))
    }, [])

    const checkStock = async () => {
        try {
            const getItems = JSON.parse(localStorage.getItem("product")) || [];
            const productCount = getItems.filter((item) => item.id == id)?.[0]?.count;

            console.log(productCount);
            await Axios.post(`${CART}/check`, {
                product_id: product.id,
                count: count + (productCount ? productCount : 0),
            });
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    };
    const handleAddToCart = async () => {
        const check = await checkStock();
        if (check) {
            const itemsCart = JSON.parse(localStorage.getItem("product")) || []
            const checkProduct = itemsCart.findIndex((pro) => pro.id == id);

            if (checkProduct !== -1) {
                if (itemsCart[checkProduct].count) {
                    itemsCart[checkProduct].count += count
                } else {
                    itemsCart[checkProduct].count = count
                }
            } else {

                itemsCart.push(product)
            }
            localStorage.setItem("product", JSON.stringify(itemsCart))
            setIsChange((prev) => !prev)
        }
    }

    return (
        <>
            {loading ? (
                <>
                    <div className="flex gap-10 mb-3" >
                        <div className="g">
                            <SkeletonComponent
                                classes=" m-auto" height="300px"
                                length="1"
                                width="500px"
                            />
                            <div className="flex justify-center mt-1">
                                <SkeletonComponent
                                    height="60px"
                                    length="3"
                                    width="120px"
                                />
                            </div>
                        </div>
                        <div className="mt-2">
                            <div style={{ margin: "20px 10px 40px" }}>
                                <SkeletonComponent
                                    height="40px"
                                    length="1"
                                    width="600px" />
                            </div>
                            <div style={{ margin: "20px 10px 40px" }} >
                                <SkeletonComponent
                                    height="40px"
                                    length="1"
                                    width="500px" />
                            </div>
                            <div style={{ margin: "20px 10px 40px" }} >
                                <SkeletonComponent
                                    height="40px"
                                    length="1"
                                    width="400px" />
                            </div>

                        </div>
                    </div>
                </>

            ) : (
                <div className="single-product ">
                    <div className="gallery col-lg-6"  >
                        <ImageGallery items={productImages} />
                    </div>
                    <div className="product-info ">
                        <h1 className="text-color font-bold">{product.title}</h1>
                        <p className="text-gray-500">{product.About}</p>
                        <div className="desc text-color my-3">
                            <p >{product.description}</p>
                        </div>
                        <div className="price text-highlight text-sm">
                            <span>{product.discount} %</span>
                            <span>{product.price} $</span>
                        </div>
                        <div className="quantity">
                            {product.stock === 1 &&
                                <p className="text-highlight">There is only 1 left </p>}
                        </div>
                        <div className="rating flex">
                            <p>{goldStars}</p>
                            <p >{emptyStars}</p>
                        </div>

                        <button className="buy--btn" onClick={handleAddToCart}>ADD TO CART</button>

                    </div>
                </div>
            )
            }
        </>
    )
}