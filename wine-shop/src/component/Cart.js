import React, { useEffect, useState } from "react";
import { listCart } from "../service/WinesService";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
 
function Cart() {
    const navigate = useNavigate();   
     const jwtToken = localStorage.getItem("Jwt");
    const [carts,setCarts] = useState([]);
    const getList = async () => {
        if (jwtToken !== null && jwtToken.id !== undefined) {
          const data = await listCart(jwtToken.id);
          setCarts(data);
        } else {
          Swal.fire({
            icon:'error',
            text:"You're not enough authorized to access this page",
            timer:2000,
          }).then(() => {
            navigate('/home');
          })
        }
    };
    useEffect(() => {
        getList()
    },[])
    return (
        <>
           <link rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css" />
            <section className="ftco-section">
                <div className="container">
                    <div className="row">
                        <div className="table-wrap">
                            <table className="table">
                                <thead className="thead-primary">
                                    <tr>
                                        <th>&nbsp;</th>
                                        <th>&nbsp;</th>
                                        <th>Product</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>total</th>
                                        <th>&nbsp;</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="alert" role="alert">
                                        <td>
                                            <label className="checkbox-wrap checkbox-primary">
                                                <input type="checkbox" defaultChecked="" />
                                                <span className="checkmark" />
                                            </label>
                                        </td>
                                        <td>
                                            <div
                                                className="img"
                                                style={{ backgroundImage: "url(images/prod-1.jpg)" }}
                                            />
                                        </td>
                                        <td>
                                            <div className="email">
                                                <span>Jim Beam Kentucky Straight</span>
                                                <span>Fugiat voluptates quasi nemo, ipsa perferendis</span>
                                            </div>
                                        </td>
                                        <td>$44.99</td>
                                        <td className="quantity">
                                            <div className="input-group">
                                                <input
                                                    type="text"
                                                    name="quantity"
                                                    className="quantity form-control input-number"
                                                    defaultValue={2}
                                                    min={1}
                                                    max={100}
                                                />
                                            </div>
                                        </td>
                                        <td>$89.98</td>
                                        <td>
                                            <button
                                                type="button"
                                                className="close"
                                                data-dismiss="alert"
                                                aria-label="Close"
                                            >
                                                <span aria-hidden="true">
                                                    <i className="fa fa-close" />
                                                </span>
                                            </button>
                                        </td>
                                    </tr>
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6 justify-content-start">
                            <div className=" mt-5 cart-wrap ftco-animate">
                                <div className="cart-total mb-3">
                                    <h3>Information</h3>
                                    <p className="d-flex">
                                        <span style={{ fontSize: 18, color: "black" }}>Full Name:</span>
                                        <span style={{ fontSize: 18, color: "black" }}>Alex</span>
                                    </p>
                                    <p className="d-flex">
                                        <span style={{ fontSize: 18, color: "black" }}>Address:</span>
                                        <span style={{ fontSize: 18, color: "black" }}>
                                            144 American
                                        </span>
                                    </p>
                                    <p className="d-flex">
                                        <span style={{ fontSize: 18, color: "black" }}>
                                            Phone Number:
                                        </span>
                                        <span style={{ fontSize: 18, color: "black" }}>012313131</span>
                                    </p>
                                    <p className="d-flex">
                                        <span style={{ fontSize: 18, color: "black" }}>Email: </span>
                                        <span style={{ fontSize: 18, color: "black" }}>
                                            adaddad@gmail.com
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 justify-content-end">
                            <div className=" mt-5 cart-wrap ftco-animate">
                                <div className="cart-total mb-3">
                                    <h3>Cart Totals</h3>
                                    <p className="d-flex">
                                        <span>Subtotal</span>
                                        <span>$20.60</span>
                                    </p>
                                    <p className="d-flex">
                                        <span>Delivery</span>
                                        <span>$0.00</span>
                                    </p>
                                    <p className="d-flex">
                                        <span>Discount</span>
                                        <span>$3.00</span>
                                    </p>
                                    <hr />
                                    <p className="d-flex total-price">
                                        <span>Total</span>
                                        <span>$17.60</span>
                                    </p>
                                </div>
                                <p className="text-center">
                                    <a className="btn btn-primary py-3 px-4">Proceed to Checkout</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>

    )
}
export default Cart;