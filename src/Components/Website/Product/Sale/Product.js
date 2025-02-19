
import { NavLink } from "react-router-dom"
import TitleSlice from "../../../../helpers/TitleSlice"
import "./Product.css"
export default function Product(props) {
    const form = props.form
    return (

        <>
            {form === "rating" ? (
                <NavLink to={`/product/${props.id}`} className="product">
                    <img src={props.img} alt="" />
                    <div className="details text-color m-3">
                        <h4 className="font-bold">{TitleSlice(props.title)}</h4>
                        <p>{props.description}</p>
                        <p className="text-highlight font-bold">{props.price}  $</p>
                    </div>
                </NavLink>
            ) :
                form === "sale" ?
                    <NavLink to={`/product/${props.id}`} className={props.classes}>
                        <div className="product__photo">
                            <div className="photo-container">
                                <div className="photo-main">
                                    <div className="controls">
                                        <i className="fa-solid fa-up-right-from-square"></i>
                                        <i className="fa-regular fa-heart"></i>
                                    </div>
                                    <img src={props.img} alt="Product-img" style={{
                                        width: "284px",
                                        height: "284px",
                                        marginTop: "5px",
                                    }} />
                                </div>
                                {/* <div className="photo-album">
                            <ul>
                                <li><img src="https://res.cloudinary.com/john-mantas/image/upload/v1537302064/codepen/delicious-apples/green-apple2.png" alt="green apple" /></li>
                                <li><img src="https://res.cloudinary.com/john-mantas/image/upload/v1537303532/codepen/delicious-apples/half-apple.png" alt="half apple" /></li>
                                <li><img src="https://res.cloudinary.com/john-mantas/image/upload/v1537303160/codepen/delicious-apples/green-apple-flipped.png" alt="green apple" /></li>
                                <li><img src="https://res.cloudinary.com/john-mantas/image/upload/v1537303708/codepen/delicious-apples/apple-top.png" alt="apple top" /></li>
                            </ul>
                        </div> */}
                            </div>
                        </div>
                        <div className="product__info">
                            <div className="title">
                                {props.sale &&
                                    <div className="sale">
                                        <img src={require("../../../../assets/sale.jpg")} alt="sale" style={{ width: "50px", height: "50px", borderRadius: "50%", float: "right", marginRight: "5px" }} />
                                    </div>
                                }
                                <h1>{TitleSlice(props.title)}</h1>
                                <span className="text-color">{props.about}</span>
                            </div>
                            <div className="price">
                                <span>{props.price} $</span>
                            </div>
                            {props.color &&
                                <div className="variant ">
                                    <h3 className="text-color">SELECT A COLOR</h3>
                                    <ul>
                                        <li><img className="rounded-full" src={require("../../../../assets/imac-pink.jpeg")} alt="pink" /></li>
                                        <li><img className="rounded-full" src={require("../../../../assets/imac-green.jpeg")} alt="green" /></li>
                                        <li><img className="rounded-full" src={require("../../../../assets/imac-purple.jpeg")} alt="silver" /></li>
                                        <li><img className="rounded-full" src={require("../../../../assets/imac-blue.jpeg")} alt="purple" /></li>
                                    </ul>
                                </div>
                            }
                            <div className="description">
                                <h3 className="text-color">{props.description}</h3>
                                {/* <ul>
                            <li>Apples are nutricious</li>
                            <li>Apples may be good for weight loss</li>
                            <li>Apples may be good for bone health</li>
                            <li>They're linked to a lowest risk of diabetes</li>
                        </ul> */}
                            </div>
                            <button className="buy--btn">ADD TO CART</button>
                        </div>
                    </NavLink>
                    : ""}




        </>
    )
}