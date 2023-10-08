import React, { useEffect, useState } from 'react';
import { getListWines } from '../service/WinesService';
import { Link } from 'react-router-dom';


function Home() {

    const [wines,setWines] = useState();
    
    const getList = async () => {
        const data = await getListWines();
        setWines(data);
    }
    useEffect(() => {
        getList()
    },[])
    console.log(wines);
    if(!wines) {
        return null;
    }

    return (
        <div>
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
            <div className="hero-wrap" style={{ backgroundImage: 'url(images/bg_2.jpg)' }} data-stellar-background-ratio="0.5">
                <div className="overlay" />
                <div className="container">
                    <div className="row no-gutters slider-text align-items-center justify-content-center">
                        <div className="col-md-8 ftco-animate d-flex align-items-end">
                            <div className="text w-100 text-center">
                                <h1 className="mb-4">Good <span>Drink</span> for Good <span>Moments</span>.</h1>
                               
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <section className="ftco-section ftco-no-pb">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 img img-3 d-flex justify-content-center align-items-center" style={{ backgroundImage: 'url(images/about.jpg)' }}>
                        </div>
                        <div className="col-md-6 wrap-about pl-md-5 ftco-animate py-5">
                            <div className="heading-section">
                                <span className="subheading">Since 1905</span>
                                <h2 className="mb-4">Desire Meets A New Taste</h2>
                                <p>A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.</p>
                                <p>On her way she met a copy. The copy warned the Little Blind Text, that where it came from it would have been rewritten a thousand times and everything that was left from its origin would be the word "and" and the Little Blind Text should turn around and return to its own, safe country.</p>
                    
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="ftco-section ftco-no-pb">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-2 col-md-4 ">
                            <div className="sort w-100 text-center ftco-animate">
                                <div className="img" style={{ backgroundImage: 'url(images/kind-1.jpg)' }} />
                                <h3>Brandy</h3>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-4 ">
                            <div className="sort w-100 text-center ftco-animate">
                                <div className="img" style={{ backgroundImage: 'url(images/kind-2.jpg)' }} />
                                <h3>Gin</h3>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-4 ">
                            <div className="sort w-100 text-center ftco-animate">
                                <div className="img" style={{ backgroundImage: 'url(images/kind-3.jpg)' }} />
                                <h3>Rum</h3>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-4 ">
                            <div className="sort w-100 text-center ftco-animate">
                                <div className="img" style={{ backgroundImage: 'url(images/kind-4.jpg)' }} />
                                <h3>Tequila</h3>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-4 ">
                            <div className="sort w-100 text-center ftco-animate">
                                <div className="img" style={{ backgroundImage: 'url(images/kind-5.jpg)' }} />
                                <h3>Vodka</h3>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-4 ">
                            <div className="sort w-100 text-center ftco-animate">
                                <div className="img" style={{ backgroundImage: 'url(images/kind-6.jpg)' }} />
                                <h3>Whiskey</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="ftco-section">
                <div className="container">
                    <div className="row justify-content-center pb-5">
                        <div className="col-md-7 heading-section text-center ftco-animate">
                            <span className="subheading">Our Delightful offerings</span>
                            <h2>Tastefully Yours</h2>
                        </div>
                    </div>
                    <div className="row">
                    {wines.length > 0 && wines.map((item) =>  {
                        return (
                        <div className="col-md-3 d-flex">
                            <div className="product ftco-animate">
                                <div className="img d-flex align-items-center justify-content-center"  style={{ backgroundImage: `url(${item.imageWines})` }}>

                                    <div className="desc">
                                        <p className="meta-prod d-flex">
                                            <a href="#" className="d-flex align-items-center justify-content-center"><span className="flaticon-shopping-bag" /></a>
                                            <Link to={`/home/detail/${item.idWines}`} className="d-flex align-items-center justify-content-center"><span className="flaticon-visibility"/></Link>
                                        </p>
                                    </div>
                                </div>
                                <div className="text text-center">
                                    <span className="category">{item.typeWines.nameTypeWines}</span>
                                    <h2>{item.nameWines}</h2>
                                    <p className="mb-0"><span className="price">${item.priceWines}.00</span></p>
                                </div>
                            </div>
                        </div>
                    )})}
                  
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-md-4">
                            <Link to={`/home/wines`} className="btn btn-primary d-block">View All Products <span className="fa fa-long-arrow-right" /></Link>
                        </div>
                    </div>
                </div>
            </section>
            <section className="ftco-section">
                <div className="container">
                    <div className="row justify-content-center mb-5">
                        <div className="col-md-7 heading-section text-center ftco-animate">
                            <span className="subheading">Blog</span>
                            <h2>Recent Blog</h2>
                        </div>
                    </div>
                    <div className="row d-flex">
                        <div className="col-lg-6 d-flex align-items-stretch ftco-animate">
                            <div className="blog-entry d-flex">
                                <a href="blog-single.html" className="block-20 img" style={{ backgroundImage: 'url("images/image_1.jpg")' }}>
                                </a>
                                <div className="text p-4 bg-light">
                                    <div className="meta">
                                        <p><span className="fa fa-calendar" /> 23 April 2020</p>
                                    </div>
                                    <h3 className="heading mb-3"><a href="#">The Recipe from a Winemaker’s Restaurent</a></h3>
                                    <p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                                    <a href="#" className="btn-custom">Continue <span className="fa fa-long-arrow-right" /></a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 d-flex align-items-stretch ftco-animate">
                            <div className="blog-entry d-flex">
                                <a href="blog-single.html" className="block-20 img" style={{ backgroundImage: 'url("images/image_2.jpg")' }}>
                                </a>
                                <div className="text p-4 bg-light">
                                    <div className="meta">
                                        <p><span className="fa fa-calendar" /> 23 April 2020</p>
                                    </div>
                                    <h3 className="heading mb-3"><a href="#">The Recipe from a Winemaker’s Restaurent</a></h3>
                                    <p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                                    <a href="#" className="btn-custom">Continue <span className="fa fa-long-arrow-right" /></a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 d-flex align-items-stretch ftco-animate">
                            <div className="blog-entry d-flex">
                                <a href="blog-single.html" className="block-20 img" style={{ backgroundImage: 'url("images/image_3.jpg")' }}>
                                </a>
                                <div className="text p-4 bg-light">
                                    <div className="meta">
                                        <p><span className="fa fa-calendar" /> 23 April 2020</p>
                                    </div>
                                    <h3 className="heading mb-3"><a href="#">The Recipe from a Winemaker’s Restaurent</a></h3>
                                    <p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                                    <a href="#" className="btn-custom">Continue <span className="fa fa-long-arrow-right" /></a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 d-flex align-items-stretch ftco-animate">
                            <div className="blog-entry d-flex">
                                <a href="blog-single.html" className="block-20 img" style={{ backgroundImage: 'url("images/image_4.jpg")' }}>
                                </a>
                                <div className="text p-4 bg-light">
                                    <div className="meta">
                                        <p><span className="fa fa-calendar" /> 23 April 2020</p>
                                    </div>
                                    <h3 className="heading mb-3"><a href="#">The Recipe from a Winemaker’s Restaurent</a></h3>
                                    <p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                                    <a href="#" className="btn-custom">Continue <span className="fa fa-long-arrow-right" /></a>
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
                                <h2 className="ftco-heading-2 logo"><a href="#">Liquor <span>Store</span></a></h2>
                                <p>Far far away, behind the word mountains, far from the countries.</p>
            
                            </div>
                        </div>
                        <div className="col-sm-12 col-md">
                            <div className="ftco-footer-widget mb-4 ml-md-4">
                                <h2 className="ftco-heading-2">My Accounts</h2>
                                <ul className="list-unstyled">
                                    <li><a href="#"><span className="fa fa-chevron-right mr-2" />My Account</a></li>
                                    <li><a href="#"><span className="fa fa-chevron-right mr-2" />Register</a></li>
                                    <li><a href="#"><span className="fa fa-chevron-right mr-2" />Log In</a></li>
                                    <li><a href="#"><span className="fa fa-chevron-right mr-2" />My Order</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md">
                            <div className="ftco-footer-widget mb-4 ml-md-4">
                                <h2 className="ftco-heading-2">Information</h2>
                                <ul className="list-unstyled">
                                    <li><a href="#"><span className="fa fa-chevron-right mr-2" />About us</a></li>
                                    <li><a href="#"><span className="fa fa-chevron-right mr-2" />Catalog</a></li>
                                    <li><a href="#"><span className="fa fa-chevron-right mr-2" />Contact us</a></li>
                                    <li><a href="#"><span className="fa fa-chevron-right mr-2" />Term &amp; Conditions</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md">
                            <div className="ftco-footer-widget mb-4">
                                <h2 className="ftco-heading-2">Quick Link</h2>
                                <ul className="list-unstyled">
                                    <li><a href="#"><span className="fa fa-chevron-right mr-2" />New User</a></li>
                                    <li><a href="#"><span className="fa fa-chevron-right mr-2" />Help Center</a></li>
                                    <li><a href="#"><span className="fa fa-chevron-right mr-2" />Report Spam</a></li>
                                    <li><a href="#"><span className="fa fa-chevron-right mr-2" />Faq's</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md">
                            <div className="ftco-footer-widget mb-4">
                                <h2 className="ftco-heading-2">Have a Questions?</h2>
                                <div className="block-23 mb-3">
                                    <ul>
                                        <li><span className="icon fa fa-map marker" /><span className="text">203 Fake St. Mountain View, San Francisco, California, USA</span></li>
                                        <li><a href="#"><span className="icon fa fa-phone" /><span className="text">+2 392 3929 210</span></a></li>
                                        <li><a href="#"><span className="icon fa fa-paper-plane pr-4" /><span className="text">info@yourdomain.com</span></a></li>
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
                                <p className="mb-0" style={{ color: 'rgba(255,255,255,.5)' }}>{/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                                    Copyright © All rights reserved | This template is made with <i className="fa fa-heart color-danger" aria-hidden="true" /> by <a href="https://colorlib.com" target="_blank">Colorlib.com</a>
                                    {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>

    )
}
export default Home;