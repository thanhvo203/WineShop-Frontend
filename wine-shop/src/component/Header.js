import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { inforFromToken, listCart } from "../service/WinesService";
import Swal from "sweetalert2";

function Header() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const [carts, setCarts] = useState([]);

  const getUser = async () => {
    const data = await inforFromToken();
    setUser(data);
  }
  const getList = async () => {
    if (user !== null && user.id !== undefined) {
      const data = await listCart(user.id);
      setCarts(data);
    } else {
      console.error('User is not logged in or user.id is undefined');
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("Jwt")
    Swal.fire({
      icon: 'success',
      timer: 2000,
      title: 'Logout Success'
    })
    navigate('/home')
  }
  console.log(user);
  useEffect(() => {
    getUser();
    getList();
  }, [])

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
        <div className="container">
          <Link className="navbar-brand" to={`/home`}>Wine <span>shop</span></Link>
          {user != null ? <div className="order-lg-last btn-group">
            <a href="#" className="btn-cart dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <span className="flaticon-shopping-bag" />
              <div className="d-flex justify-content-center align-items-center"><small>3</small></div>
            </a>
            <div className="dropdown-menu dropdown-menu-right">
              {carts.length != 0 ?
                carts.map((item, index) => {
                  return (
                    <div className="dropdown-item d-flex align-items-start" href="#" key={item.idCarts}>

                      <div className="img" style={{ backgroundImage: `url(/${item.wines.imageWines})` }} />
                      <div className="text pl-3">
                        <h4>{item.wines.nameWines} </h4>
                        <p className="mb-0"><a href="#" className="price">${item.wines.priceWines}</a><span className="quantity ml-3">Quantity: {item.quality}</span></p>
                      </div>
                    </div>
                  )
                }) : <>
                  <p>Not wine in cart</p>
                </>
              }

              <Link to={`/home/cart`} className="dropdown-item text-center btn-link d-block w-100">
                View All
                <span className="ion-ios-arrow-round-forward" />
              </Link>
            </div>
          </div>
            : <></>
          }

          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="oi oi-menu" /> Menu
          </button>
          <div className="collapse navbar-collapse" id="ftco-nav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active"><Link to={`/home`} className="nav-link">Home</Link></li>
              <li className="nav-item"><a href="about.html" className="nav-link">About</a></li>
              {user === null || user === undefined ? (
                <>
                  <li className="nav-item"><Link  to={`/home/wines`} className="nav-link">All Wines</Link></li>
                  <li className="nav-item"><Link to={`/login`} className="nav-link"><i className="fa-regular fa-user"></i></Link></li>   
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="dropdown04" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Products</a>
                    <div className="dropdown-menu" aria-labelledby="dropdown04">
                      <Link to={`/home/wines`} className="dropdown-item" href="product.html">All Wines</Link>
                      <Link to={`/home/cart`} className="dropdown-item" href="cart.html">Cart</Link>
                    </div>
                  </li>
                  <li className="nav-item"><a className="nav-link">{user.users}</a></li>
                  <li className="nav-item"><a onClick={() => { handleLogout() }} className="nav-link">Log out</a></li>
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