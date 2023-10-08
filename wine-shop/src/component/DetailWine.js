import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getWinesById } from "../service/WinesService";

function DetailWine() {
    const {id} = useParams();
    const [wine,setWine] = useState({});

    const getWine = async () => {
        const data = await getWinesById(id)
        setWine(data);
    }
    console.log(wine);
    useEffect(() => {
        getWine();
    },[id])
    return (
        <>
       <link rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css" />
            <nav className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
                <div className="container">
                    <a className="navbar-brand" href="index.html">Liquor <span>store</span></a>
                    <div className="order-lg-last btn-group">
                        <a href="#" className="btn-cart dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span className="flaticon-shopping-bag" />
                            <div className="d-flex justify-content-center align-items-center"><small>3</small></div>
                        </a>
                        <div className="dropdown-menu dropdown-menu-right">
                            <div className="dropdown-item d-flex align-items-start" href="#">
                                <div className="img" style={{ backgroundImage: 'url(images/prod-1.jpg)' }} />
                                <div className="text pl-3">
                                    <h4>Bacardi 151</h4>
                                    <p className="mb-0"><a href="#" className="price">$25.99</a><span className="quantity ml-3">Quantity: 01</span></p>
                                </div>
                            </div>
                            <div className="dropdown-item d-flex align-items-start" href="#">
                                <div className="img" style={{ backgroundImage: 'url(images/prod-2.jpg)' }} />
                                <div className="text pl-3">
                                    <h4>Jim Beam Kentucky Straight</h4>
                                    <p className="mb-0"><a href="#" className="price">$30.89</a><span className="quantity ml-3">Quantity: 02</span></p>
                                </div>
                            </div>
                            <div className="dropdown-item d-flex align-items-start" href="#">
                                <div className="img" style={{ backgroundImage: 'url(images/prod-3.jpg)' }} />
                                <div className="text pl-3">
                                    <h4>Citadelle</h4>
                                    <p className="mb-0"><a href="#" className="price">$22.50</a><span className="quantity ml-3">Quantity: 01</span></p>
                                </div>
                            </div>
                            <a className="dropdown-item text-center btn-link d-block w-100" href="cart.html">
                                View All
                                <span className="ion-ios-arrow-round-forward" />
                            </a>
                        </div>
                    </div>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="oi oi-menu" /> Menu
                    </button>
                    <div className="collapse navbar-collapse" id="ftco-nav">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item active"><a href="index.html" className="nav-link">Home</a></li>
                            <li className="nav-item"><a href="about.html" className="nav-link">About</a></li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="dropdown04" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Products</a>
                                <div className="dropdown-menu" aria-labelledby="dropdown04">
                                    <a className="dropdown-item" href="product.html">Products</a>
                                    <a className="dropdown-item" href="product-single.html">Single Product</a>
                                    <a className="dropdown-item" href="cart.html">Cart</a>
                                    <a className="dropdown-item" href="checkout.html">Checkout</a>
                                </div>
                            </li>
                            <li className="nav-item"><a href="blog.html" className="nav-link">Blog</a></li>
                            <li className="nav-item"><a href="" className="nav-link"><i className="fa-regular fa-user"></i></a></li>
                        </ul>
                    </div>
                </div>
            </nav>
  {/* END nav */}
  <section
    className="hero-wrap hero-wrap-2"
    style={{ backgroundImage: 'url("images/bg_2.jpg")' }}
    data-stellar-background-ratio="0.5"
  >
    <div className="overlay" />
    <div className="container">
      <div className="row no-gutters slider-text align-items-end justify-content-center">
        <div className="col-md-9 mb-5 text-center">
          <p className="breadcrumbs mb-0">
            <span className="mr-2">
              <a href="index.html">
                Home <i className="fa fa-chevron-right" />
              </a>
            </span>{" "}
            <span>
              <a href="product.html">
                Products <i className="fa fa-chevron-right" />
              </a>
            </span>{" "}
            <span>
              Products Single <i className="fa fa-chevron-right" />
            </span>
          </p>
          <h2 className="mb-0 bread">Products Single</h2>
        </div>
      </div>
    </div>
  </section>
  <section className="ftco-section">
    <div className="container">
      <div className="row">
        <div className="col-lg-6 mb-5">
          <a href={wine.imageWines} className="image-popup prod-img-bg">
            <img
              src={wine.imageWines}
              className="img-fluid"
              alt="Colorlib Template"
            />
          </a>
        </div>
        <div className="col-lg-6 product-details pl-md-5">
          <h3>{wine.nameWines}</h3>
          <div className="rating d-flex">
            <p className="text-left mr-4">
              <p className="mr-2">
                <b>Flavor </b> : {wine.flavorWines}
              </p>
              <p className="mr-2">
                <b>Color </b> : {wine.colorWines}
              </p>
              <p className="mr-2">
                <b>Alcohol </b> : {wine.alcohol}%
              </p>
              <p className="mr-2">
                <b>Country </b> : {wine.countryManufacture}
              </p>
              <p className="mr-2">
                <b>Manufacturer </b> : {wine.manufactureWines}
              </p>
             </p>
          </div>
          <p className="price">
            <span>${wine.priceWines}.00</span>
          </p>
          <p>
            {wine.descriptionWines}
          </p>
          <div className="row mt-4">
            <div className="input-group col-md-6 d-flex mb-3">
              <span className="input-group-btn mr-2">
                <button
                  type="button"
                  className="quantity-left-minus btn"
                  data-type="minus"
                  data-field=""
                >
                  <i className="fa fa-minus" />
                </button>
              </span>
              <input
                type="text"
                id="quantity"
                name="quantity"
                className="quantity form-control input-number"
                defaultValue={1}
                min={1}
                max={100}
              />
              <span className="input-group-btn ml-2">
                <button
                  type="button"
                  className="quantity-right-plus btn"
                  data-type="plus"
                  data-field=""
                >
                  <i className="fa fa-plus" />
                </button>
              </span>
            </div>
            <div className="w-100" />
            <div className="col-md-12">
              <p style={{ color: "#000" }}>{wine.quantity} piece available</p>
            </div>
          </div>
          <p>
            <a href="cart.html" className="btn btn-primary py-3 px-5 mr-2">
              Add to Cart
            </a>
            <a href="cart.html" className="btn btn-primary py-3 px-5">
              Buy now
            </a>
          </p>
        </div>
      </div>
  
    </div>
  </section>
  <footer className="ftco-footer">
    <div className="container">
      <div className="row mb-5">
        <div className="col-sm-12 col-md">
          <div className="ftco-footer-widget mb-4">
            <h2 className="ftco-heading-2 logo">
              <a href="#">
                Liquor <span>Store</span>
              </a>
            </h2>
            <p>
              Far far away, behind the word mountains, far from the countries.
            </p>
            <ul className="ftco-footer-social list-unstyled mt-2">
              <li className="ftco-animate">
                <a href="#">
                  <span className="fa fa-twitter" />
                </a>
              </li>
              <li className="ftco-animate">
                <a href="#">
                  <span className="fa fa-facebook" />
                </a>
              </li>
              <li className="ftco-animate">
                <a href="#">
                  <span className="fa fa-instagram" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-sm-12 col-md">
          <div className="ftco-footer-widget mb-4 ml-md-4">
            <h2 className="ftco-heading-2">My Accounts</h2>
            <ul className="list-unstyled">
              <li>
                <a href="#">
                  <span className="fa fa-chevron-right mr-2" />
                  My Account
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="fa fa-chevron-right mr-2" />
                  Register
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="fa fa-chevron-right mr-2" />
                  Log In
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="fa fa-chevron-right mr-2" />
                  My Order
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-sm-12 col-md">
          <div className="ftco-footer-widget mb-4 ml-md-4">
            <h2 className="ftco-heading-2">Information</h2>
            <ul className="list-unstyled">
              <li>
                <a href="#">
                  <span className="fa fa-chevron-right mr-2" />
                  About us
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="fa fa-chevron-right mr-2" />
                  Catalog
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="fa fa-chevron-right mr-2" />
                  Contact us
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="fa fa-chevron-right mr-2" />
                  Term &amp; Conditions
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-sm-12 col-md">
          <div className="ftco-footer-widget mb-4">
            <h2 className="ftco-heading-2">Quick Link</h2>
            <ul className="list-unstyled">
              <li>
                <a href="#">
                  <span className="fa fa-chevron-right mr-2" />
                  New User
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="fa fa-chevron-right mr-2" />
                  Help Center
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="fa fa-chevron-right mr-2" />
                  Report Spam
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="fa fa-chevron-right mr-2" />
                  Faq's
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-sm-12 col-md">
          <div className="ftco-footer-widget mb-4">
            <h2 className="ftco-heading-2">Have a Questions?</h2>
            <div className="block-23 mb-3">
              <ul>
                <li>
                  <span className="icon fa fa-map marker" />
                  <span className="text">
                    203 Fake St. Mountain View, San Francisco, California, USA
                  </span>
                </li>
                <li>
                  <a href="#">
                    <span className="icon fa fa-phone" />
                    <span className="text">+2 392 3929 210</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="icon fa fa-paper-plane pr-4" />
                    <span className="text">info@yourdomain.com</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="container-fluid px-0 py-5 bg-black">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <p className="mb-0" style={{ color: "rgba(255,255,255,.5)" }}>
              {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
              Copyright © All rights reserved | This template is made with{" "}
              <i className="fa fa-heart color-danger" aria-hidden="true" /> by{" "}
              <a href="https://colorlib.com" target="_blank">
                Colorlib.com
              </a>
              {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
            </p>
          </div>
        </div>
      </div>
    </div>
  </footer>

</>

    )
}
export default DetailWine