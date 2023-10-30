import React, { useEffect, useState } from "react";
import { addOrder, addOrderDetail, deleteFromCart, getCustomerByIdAccount, getWinesById, listCart, updateCart, updateQuantityWines } from "../service/WinesService";
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
    const [itemCarts, setItemCarts] = useState([]);
    let [total,setTotal] = useState(0);

    let stateButton = 0
    itemCarts.forEach((item) => {
        total += item.wines.priceWines * item.quality;
    });

    const minusQuantity = async (idCart, quality, idWines, idCustomer) => {
        
        if (quality <= 1) {
            Swal.fire({
                icon: 'warning',
                title: 'Do you wanna delete this item out of your cart',
                html: '<p style = " color: red">You will not be able to undo this action!</p>',
                showCancelButton: true,
                confirmButtonText: 'OK',
                cancelButtonText: 'NO',
                reverseButtons: true
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        await deleteFromCart(idWines, idCustomer);
                        setCarts(await listCart(idCustomer));
                        dispatch(getList(customer.idCustomer));

                        Swal.fire({
                            icon: 'success',
                            timer: 2000,
                            title: 'Delete Success'
                        })
                        navigate("/home/cart/" + id)
                    } catch {
                        Swal.fire({
                            icon: 'warning',
                            title: 'Delete Success!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                }
            })
        } else {
            await updateCart(idCart, quality - 1, idWines, idCustomer)
            dispatch(getList(customer.idCustomer))
            setCarts(await listCart(customer.idCustomer));
            itemCarts.forEach((item) => {
                if(item.wines.idWines === idWines) {
                    setTotal((prev) => prev - (1 * item.wines.priceWines));
                }
            });
        }

    }
    const plusQuantity = async (idCart, quality, idWines, idCustomer) => {
        const data = await getWinesById(idWines);
        if( quality < data.quantity) {
            await updateCart(idCart, quality + 1, idWines, idCustomer)
            dispatch(getList(customer.idCustomer))
            setCarts(await listCart(customer.idCustomer));
            itemCarts.forEach((item) => {
                if(item.wines.idWines === idWines) {
                    setTotal((prev) => prev + (1 * item.wines.priceWines));
                }
            }); 
        }
    }
    const handleDeleteItem = async (idWines, idCustomer) => {
        Swal.fire({
            icon: 'warning',
            title: 'Do you wanna delete this item out of your cart',
            html: '<p style = " color: red">You will not be able to undo this action!</p>',
            showCancelButton: true,
            confirmButtonText: 'OK',
            cancelButtonText: 'NO',
            reverseButtons: true
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteFromCart(idWines, idCustomer);
                    setCarts(await listCart(idCustomer));
                    dispatch(getList(customer.idCustomer));

                    Swal.fire({
                        icon: 'success',
                        timer: 2000,
                        title: 'Delete Success'
                    })
                    navigate("/home/cart/" + id)
                } catch {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Delete Failed!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            }
        })
    }
    console.log(itemCarts);
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
    // ---------------------Payment------------------
    const handleChooseItem = (item) => {
        if (itemCarts.includes(item)) {
            const updatedItemCarts = itemCarts.filter((cartItem) => cartItem !== item);
            setItemCarts(updatedItemCarts);
        } else {
            setItemCarts((prevItemCarts) => [...prevItemCarts, item]);
        }
    }
    const renderPaypalButton = (itemCarts) => {
        const createOrder = (data, actions) => {
            try {
                const totalAmount = document.getElementById("totalAmount").innerText;
                console.log(totalAmount);
                return actions.order.create({
                    purchase_units: [
                        {
                            amount: {
                                currency_code: "USD",
                                value: totalAmount
                            },
                        },
                    ],
                });
            } catch (error) {
                console.error("Error creating order:", error);
                throw error;
            }
        };

        window.paypal
            .Buttons({
                style: {
                    color: "gold",
                    layout: "vertical",
                    shape: "rect",
                    label: "pay",
                    height: 40,
                    marginLeft: 400,
                },
                createOrder: createOrder,
                onApprove: async (data, actions) => {
                    let isQuantityValid = true;

                    itemCarts.forEach((item) => {
                      if (item.quality > item.wines.quantity) {
                        isQuantityValid = false;
                        Swal.fire({
                          icon: 'error',
                          timer: 3000,
                          title: 'Quantity of ' + item.wines.nameWines + ' not enough to continue this action'
                        });
                      }
                    });
                  
                    if (!isQuantityValid) {
                      navigate("/home/cart/" + id);
                      return;
                    }
                    const order = await actions.order.capture();
                    const dataOrder = await addOrder(customer.idCustomer, total);
                    itemCarts.forEach((item) => {
                        console.log(item.wines.priceWines * item.quality);
                        addOrderDetail((item.wines.priceWines * item.quality), item.quality, dataOrder.idOrder, item.wines.idWines)
                        deleteFromCart(item.wines.idWines, customer.idCustomer);
                        updateQuantityWines(item.quality,item.wines.idWines);
                        dispatch(getList(customer.idCustomer));
                        
                    });

                    if (
                        order.status === "COMPLETED" ||
                        order.status === 200
                    ) {
                        Swal.fire({
                            icon: "success",
                            title: "Payment success",
                            timer: 3000,
                        });
                        navigate("/home");
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "Payment Failed",
                            timer: 3000,
                        });
                        navigate("/home");
                    }
                },
            })
            .render("#paypal-button-container");
    };

    const handlePayment = () => {
        Swal.fire({
            icon: "warning",
            text: "Are you sure to check out ?",
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonColor: "#ffc439",
            cancelButtonColor: "grey",
            confirmButtonText: "Yes",
            cancelButtonText: "Not yet",
        }).then((result) => {
            if (result && result.value) {
                if (stateButton === 0) {
                    renderPaypalButton(itemCarts);
                    console.log(itemCarts);
                    stateButton++;

                    const kiemTraButton = document.querySelector(
                        "#paypal-button-container button"
                    );
                    kiemTraButton.style.display = "none";
                }
            }
        });
    };
    //---------------------------------------------

    useEffect(() => {
        window.scrollTo(0,700)
        document.title =  'WineShop - Cart'
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
                                    {carts.length !== 0 ?
                                        carts.map((item, index) => {
                                            return (
                                                <tr className="alert" role="alert" key={item.idCart}>
                                                    <td>
                                                        <label className="checkbox-wrap checkbox-primary">
                                                            <input onClick={() => { handleChooseItem(item) }} type="checkbox" defaultChecked="" />
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
                                                                onClick={() => { minusQuantity(item.idCart, item.quality, item.wines.idWines, customer.idCustomer) }}
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
                                                                onClick={() => { plusQuantity(item.idCart, item.quality, item.wines.idWines, customer.idCustomer) }}
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
                                                            onClick={() => { handleDeleteItem(item.wines.idWines, customer.idCustomer) }}
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
                                        <span style={{ textAlign: 'end', fontWeight: '600', color: 'black' }}>$</span><span id="totalAmount">{total}.00</span>
                                    </p>
                                </div>
                                {itemCarts.length === 0 ? 
                                   <>
                                   </>
                                 :  
                                 <>
                                 <div id="paypal-button-container">
                                    <button style={{ width: '100%', border: '1px' }}
                                        onClick={() => handlePayment()}
                                        className=" btn btn-primary py-3 px-4 text-center"
                                    >
                                        Proceed to Checkout
                                    </button>
                                </div>
                                 </>
                                 }
                               

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>

    )
}
export default Cart;