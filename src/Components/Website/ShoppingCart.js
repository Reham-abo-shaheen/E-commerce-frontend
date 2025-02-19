import { useContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap"
import PlusMinusBtn from "./Btns/PlusMinusBtn";
import { Link } from "react-router-dom";
import TitleSlice from "../../helpers/TitleSlice";
import { Cart } from "../../Context/CartContext";
import "./ShoppingCart.css"

export default function ShoppingCart() {
    const [products, setProducts] = useState([])
    const [count, setCount] = useState()
    const isChange = useContext(Cart)

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        const itemsCart = JSON.parse(localStorage.getItem("product")) || []
        setProducts(itemsCart)

    }, [isChange])


    const handleRemove = (id) => {
        const filterPro = products.filter((product) => product.id !== id)
        setProducts(filterPro)
        localStorage.setItem("product", JSON.stringify(filterPro))
    }

    const changeCount = (id, btn) => {
        const itemsCart = JSON.parse(localStorage.getItem("product")) || []
        const findProduct = itemsCart.find((product) => product.id === id)
        findProduct.count = btn
        localStorage.setItem("product", JSON.stringify(itemsCart))



    }
    const itemsCartShow = products?.map((pro, key) => (
        <>
            <div key={key} className="item flex gap-8">
                <i className="fa-solid fa-trash text-highlight cursor-pointer" onClick={() => handleRemove(pro.id)}></i>
                <div className="img">
                    <img src={pro.images[0].image} alt="" style={{ maxWidth: "100px", height: "100px" }} />
                </div>
                <div className="info ">
                    <h2 className="text-color">{TitleSlice(pro.title)}</h2>
                    <p className="text-highlight">{pro.price}$</p>
                    <hr className="text-color"></hr>
                    <PlusMinusBtn
                        id={pro.id}
                        count={pro.count || 1}
                        setCount={setCount}
                        changeCount={changeCount}

                    />
                </div>
            </div>
            <hr className="text-color x"></hr>
        </>
    ))
    return (
        <>
            <div className="cart ">
                <i className="fa-solid fa-cart-shopping text-color cursor-pointer" onClick={handleShow}></i>
                {/* <span className="count">{itemsCartShow.length}</span> */}
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title className="text-color">Your Cart</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {itemsCartShow.length === 0 ? <span className="text-color font-bold">Your Card is empty  <Link style={{ color: "rgb(226, 169, 170)" }} to={"/"} onClick={handleClose}> Go shopping</Link> </span> :
                            itemsCartShow}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button className="btn text-color" style={{ backgroundColor: "#e2a9aa", borderColor: "#e2a9aa" }} onClick={handleClose}>
                            Checkout
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    )
}