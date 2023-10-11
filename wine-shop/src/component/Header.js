import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { inforFromToken } from "../service/WinesService";
import Swal from "sweetalert2";

function Header() {
  const [jwtToken, setJwtToken] = useState(localStorage.getItem("Jwt"));
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const getUser = async () => {
    const data = await inforFromToken();
    setUser(data);
  }
  const handleLogout = () => { 
     setUser("");
     localStorage.removeItem("Jwt")
     setJwtToken("")
     Swal.fire({
       icon:'success',
       timer:2000,
       title: 'Logout Success'
     })
     navigate('/home')
  }
  console.log(user);
  useEffect(() => {
    getUser();
  })

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
        <div className="container">
          <a className="navbar-brand" href="index.html">Wine <span>shop</span></a>
          <div className="order-lg-last btn-group">
            <a href="#" className="btn-cart dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <span className="flaticon-shopping-bag" />
              <div className="d-flex justify-content-center align-items-center"><small>3</small></div>
            </a>
            <div className="dropdown-menu dropdown-menu-right">
              <div className="dropdown-item d-flex align-items-start" href="#">
                <div className="img" style={{ backgroundImage: 'url(/images/prod-1.jpg)' }} />
                <div className="text pl-3">
                  <h4>Bacardi 151</h4>
                  <p className="mb-0"><a href="#" className="price">$25.99</a><span className="quantity ml-3">Quantity: 01</span></p>
                </div>
              </div>
              <div className="dropdown-item d-flex align-items-start" href="#">
                <div className="img" style={{ backgroundImage: 'url(/images/prod-2.jpg)' }} />
                <div className="text pl-3">
                  <h4>Jim Beam Kentucky Straight</h4>
                  <p className="mb-0"><a href="#" className="price">$30.89</a><span className="quantity ml-3">Quantity: 02</span></p>
                </div>
              </div>
              <div className="dropdown-item d-flex align-items-start" href="#">
                <div className="img" style={{ backgroundImage: 'url(/images/prod-3.jpg)' }} />
                <div className="text pl-3">
                  <h4>Citadelle</h4>
                  <p className="mb-0"><a href="#" className="price">$22.50</a><span className="quantity ml-3">Quantity: 01</span></p>
                </div>
              </div>
              <a className="dropdown-item text-center btn-link d-block w-100">
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
              {user == null ? (
                <li className="nav-item"><Link to={`/login`} className="nav-link"><i className="fa-regular fa-user"></i></Link></li>
              ) : (
                <>
                  <li className="nav-item"><a className="nav-link">{user.users}</a></li>
                  <li className="nav-item"><a onClick={() => {handleLogout()}} className="nav-link">Log out</a></li>
                </>
              )
              }


            </ul>
          </div>
        </div>
      </nav>
      {/* END nav */}
      <div className="hero-wrap" style={{ backgroundImage: 'url(https://wineudesign.com/wp-content/uploads/2022/04/anna-hecker-cJdwPzls6kg-unsplash.jpg)' }} data-stellar-background-ratio="0.5">
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
    </>
  )
}
export default Header