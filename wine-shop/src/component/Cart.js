import React, { useEffect, useState } from "react";
import { deleteFromCart, getCustomerByIdAccount, listCart, updateCart } from "../service/WinesService";
import Swal from "sweetalert2";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getList } from "../redux/action";

function Cart() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { id } = useParams();
    const [carts, setCarts] = useState([]);
    const [customer, setCustomer] = useState({});
    let total = 0;
    carts.forEach(item => {
        total += item.wines.priceWines * item.quality;
    });

    const minusQuantity = async (idCart,quality, idWines, idCustomer) => {
        if(quality <= 1) {
            Swal.fire({
                icon: 'warning',
                title: 'Do you wanna delete this item out of your cart',
                html: '<p style = " color: red">You will not be able to undo this action!</p>',
                showCancelButton: true,
                confirmButtonText: 'OK',
                cancelButtonText: 'NO',
                reverseButtons: true
            }).then(async (result) => {
                if(result.isConfirmed) {
                    try {
                        await deleteFromCart(idWines,idCustomer);
                        setCarts(await listCart(idCustomer));
                        dispatch(getList(customer.idCustomer));
                       
                        Swal.fire({
                            icon:'success',
                            timer:2000,
                            title:'Delete Success'
                        })
                        navigate("/home/cart/" + id)
                    }catch {
                        Swal.fire({
                            icon: 'warning',
                            title: 'Xóa thất bại!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                }
            })
        }else{
            await updateCart(idCart, quality - 1, idWines, idCustomer)
            console.log(idCart,quality-1,idWines,idCustomer);
            dispatch(getList(customer.idCustomer))
            setCarts(await listCart(customer.idCustomer));
        }
        
    }
    const plusQuantity = async (idCart,quality, idWines, idCustomer)=> {
        await updateCart(idCart, quality + 1, idWines, idCustomer)
        console.log(idCart,quality+1,idWines,idCustomer);
        dispatch(getList(customer.idCustomer))
        setCarts(await listCart(customer.idCustomer));
    }
    const handleDeleteItem = async (idWines,idCustomer) => {
        Swal.fire({
            icon: 'warning',
            title: 'Do you wanna delete this item out of your cart',
            html: '<p style = " color: red">You will not be able to undo this action!</p>',
            showCancelButton: true,
            confirmButtonText: 'OK',
            cancelButtonText: 'NO',
            reverseButtons: true
        }).then(async (result) => {
            if(result.isConfirmed) {
                try {
                    await deleteFromCart(idWines,idCustomer);
                    setCarts(await listCart(idCustomer));
                    dispatch(getList(customer.idCustomer));
                   
                    Swal.fire({
                        icon:'success',
                        timer:2000,
                        title:'Delete Success'
                    })
                    navigate("/home/cart/" + id)
                }catch {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Xóa thất bại!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            }
        })
    }


    const getCustomer = async () => {
        try {
            const data = await getCustomerByIdAccount(id);
            setCustomer(data);
        } catch (error) {
            console.log(error);
        }
    }


    const getListWines = async () => {
        try {
            const data = await listCart(id);
            setCarts(data);
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                text: "You're not enough authorized to access this page",
                timer: 2000,
            }).then(() => {

            })
        }
    };
    const location = useLocation();


    console.log(carts);
    useEffect(() => {
        getCustomer();
        getListWines();
    }, [id, location])
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
                                        <th>Total</th>
                                        <th>&nbsp;</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {carts.length != 0 ?
                                        carts.map((item, index) => {
                                            return (
                                                <tr className="alert" role="alert" key={item.idCart}>
                                                    <td>
                                                        <label className="checkbox-wrap checkbox-primary">
                                                            <input type="checkbox" defaultChecked="" />
                                                            <span className="checkmark" />
                                                        </label>
                                                    </td>
                                                    <td>
                                                        <div
                                                            className="img"
                                                            style={{ backgroundImage: `url(/${item.wines.imageWines})` }}
                                                        />
                                                    </td>
                                                    <td>
                                                        <div className="email">
                                                            <span>{item.wines.nameWines}</span>
                                                            <span>{item.wines.flavorWines}</span>
                                                        </div>
                                                    </td>
                                                    <td>${item.wines.priceWines}</td>
                                                    <td>
                                                        <div className="d-flex align-items-center">
                                                            <button
                                                                onClick={() => { minusQuantity(item.idCart,item.quality, item.wines.idWines, customer.idCustomer) }}
                                                                type="button"
                                                                className="col-4 quantity-left-minus btn"
                                                                data-type="minus"
                                                            >
                                                                <i className="fa fa-minus" />
                                                            </button>
                                                            <input
                                                                type="number"
                                                                id="quantity"
                                                                className="col-4 quantity form-control input-number"
                                                                value={item.quality}
                                                            />
                                                            <button
                                                                onClick={() => { plusQuantity( item.idCart,item.quality, item.wines.idWines, customer.idCustomer) }}
                                                                type="button"
                                                                className="col-4 quantity-right-plus btn"
                                                                data-type="plus"
                                                            >
                                                                <i className="fa fa-plus" />
                                                            </button>
                                                        </div>

                                                    </td>
                                                    <td>${item.wines.priceWines * item.quality}</td>
                                                    <td>
                                                        <button
                                                            onClick={() => { handleDeleteItem(item.wines.idWines,customer.idCustomer) }}
                                                            type="button"
                                                            className="close"
                                            
                                                        >
                                                            <span aria-hidden="true">
                                                                <i className="fa fa-close" />
                                                            </span>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        }) :
                                        <>
                                            No products
                                        </>
                                    }


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
                                        <span style={{ fontSize: 18, color: "black" }}>{customer.nameCustomer}</span>
                                    </p>
                                    <p className="d-flex">
                                        <span style={{ fontSize: 18, color: "black" }}>Address:</span>
                                        <span style={{ fontSize: 18, color: "black" }}>
                                            {customer.addressCustomer}
                                        </span>
                                    </p>
                                    <p className="d-flex">
                                        <span style={{ fontSize: 18, color: "black" }}>
                                            Phone Number:
                                        </span>
                                        <span style={{ fontSize: 18, color: "black" }}>{customer.telCustomer}</span>
                                    </p>
                                    <p className="d-flex">
                                        <span style={{ fontSize: 18, color: "black" }}>Email: </span>
                                        <span style={{ fontSize: 18, color: "black" }}>
                                            {customer.emailCustomer}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 justify-content-end">
                            <div className=" mt-5 cart-wrap ftco-animate">
                                <div className="cart-total mb-3">
                                    <h3>Cart Totals</h3>

                                    <hr />
                                    <p className="d-flex total-price">
                                        <span>Total</span>
                                        <span>${total.toFixed(2)}</span>
                                    </p>
                                </div>
                                <button className="text-center" >
                                    <a className="btn btn-primary py-3 px-4">Proceed to Checkout</a>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>

    )
}
export default Cart;