import React, { useEffect, useState } from "react";
import { getAllListWines } from "../service/WinesService";
import { Link } from "react-router-dom";

function ListWine() {
    const [wines,setWines] = useState();
    
    const getListWine = async () => {
        const data = await getAllListWines();
        setWines(data);
    }
    useEffect(() => {
        getListWine()
    },[])
    if(!wines) {
        return null;
    }
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
          style={{ backgroundImage: 'url(images/bg_2.jpg)' }}
          data-stellar-background-ratio="0.5"
        >
          <div className="overlay" />
          <div className="container">
            <div className="row no-gutters slider-text align-items-end justify-content-center">
              <div className="col-md-9 ftco-animate mb-5 text-center">
                <p className="breadcrumbs mb-0">
                  <span className="mr-2">
                    <a href="index.html">
                      Home <i className="fa fa-chevron-right" />
                    </a>
                  </span>
                  <span>
                    Products <i className="fa fa-chevron-right" />
                  </span>
                </p>
                <h2 className="mb-0 bread">Products</h2>
              </div>
            </div>
          </div>
        </section>
        <section className="ftco-section">
          <div className="container">
            <div className="row">
              <div className="col-md-9">
                <div className="row mb-4">
                  <div className="col-md-12 align-items-center">
                    <input
                      type="text"
                      style={{
                        width: "70%",
                        borderRadius: 5,
                        height: 37,
                        border: "1px solid darkgray"
                      }}
                      placeholder="Search by name wine"
                    />
                    <button type="button" className="btn btn-primary">
                      Search
                    </button>
                  </div>
                </div>
                <div className="row">
                {wines.content.length > 0 && wines.content.map((item,index) => {
                    return (
                        <div className="col-md-4 d-flex">
                    <div className="product">
                      <div
                        className="img d-flex align-items-center justify-content-center"
                        style={{ backgroundImage: `url(${item.imageWines})` }}
                      >
                        <div className="desc">
                          <p className="meta-prod d-flex">
                            <a
                              href="#"
                              className="d-flex align-items-center justify-content-center"
                            >
                              <span className="flaticon-shopping-bag" />
                            </a>
                            <Link to={`/home/detail/${item.idWines}`} className="d-flex align-items-center justify-content-center"><span className="flaticon-visibility"/></Link>
                          </p>
                        </div>
                      </div>
                      <div className="text text-center">
                        <span className="category">{item.typeWines.nameTypeWines}</span>
                        <h2>{item.nameWines}</h2>
                        <p className="mb-0">
                          <span className="price">${item.priceWines}.00</span>
                        </p>
                      </div>
                    </div>
                  </div>
                    )
                })}
             
                </div>
                <div className="row mt-5">
                  <div className="col text-center">
                    <div className="block-27">
                      <ul>
                        <li>
                          <a href="#">&lt;</a>
                        </li>
                        <li className="active">
                          <span>1</span>
                        </li>
                        <li>
                          <a href="#">2</a>
                        </li>
                        
                        <li>
                          <a href="#">&gt;</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="sidebar-box ftco-animate">
                  <div className="categories">
                    <h3>Product Types</h3>
                    <ul className="p-0">
                      <li>
                        <a href="#">
                          Brandy <span className="fa fa-chevron-right" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          Gin <span className="fa fa-chevron-right" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          Rum <span className="fa fa-chevron-right" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          Tequila <span className="fa fa-chevron-right" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          Vodka <span className="fa fa-chevron-right" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          Whiskey <span className="fa fa-chevron-right" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="sidebar-box ftco-animate">
                  <h3>Recent Blog</h3>
                  <div className="block-21 mb-4 d-flex">
                    <a
                      className="blog-img mr-4"
                      style={{ backgroundImage: "url(images/image_1.jpg)" }}
                    />
                    <div className="text">
                      <h3 className="heading">
                        <a href="#">
                          Even the all-powerful Pointing has no control about the
                          blind texts
                        </a>
                      </h3>
                      <div className="meta">
                        <div>
                          <a href="#">
                            <span className="fa fa-calendar" /> Apr. 18, 2020
                          </a>
                        </div>
                        <div>
                          <a href="#">
                            <span className="fa fa-comment" /> 19
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="block-21 mb-4 d-flex">
                    <a
                      className="blog-img mr-4"
                      style={{ backgroundImage: "url(images/image_2.jpg)" }}
                    />
                    <div className="text">
                      <h3 className="heading">
                        <a href="#">
                          Even the all-powerful Pointing has no control about the
                          blind texts
                        </a>
                      </h3>
                      <div className="meta">
                        <div>
                          <a href="#">
                            <span className="fa fa-calendar" /> Apr. 18, 2020
                          </a>
                        </div>
                        <div>
                          <a href="#">
                            <span className="fa fa-comment" /> 19
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="block-21 mb-4 d-flex">
                    <a
                      className="blog-img mr-4"
                      style={{ backgroundImage: "url(images/image_3.jpg)" }}
                    />
                    <div className="text">
                      <h3 className="heading">
                        <a href="#">
                          Even the all-powerful Pointing has no control about the
                          blind texts
                        </a>
                      </h3>
                      <div className="meta">
                        <div>
                          <a href="#">
                            <span className="fa fa-calendar" /> Apr. 18, 2020
                          </a>
                        </div>
                        <div>
                          <a href="#">
                            <span className="fa fa-comment" /> 19
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
export default ListWine;