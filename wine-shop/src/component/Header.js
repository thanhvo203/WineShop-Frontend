import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { inforFromToken, listCart } from "../service/WinesService";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { getList } from "../redux/action";



function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const carts = useSelector((state) => state.cartItems);


  const [user, setUser] = useState({
    user: null
  });

  const getUser = async () => {
    const data = await inforFromToken();
    console.log(data);
    if (data !== null) {
      setUser(data);
      if (data.id) {
        dispatch(getList(data.id));
        console.log(dispatch(getList(data.id)));
      }
      console.log(carts);
    }
  }


  const handleLogout = () => {
    setUser({user: null})
    localStorage.removeItem('Jwt');
    Swal.fire({
      icon: 'success',
      timer: 2000,
      title: 'Logout Success',
    });
    navigate('/home');
  };


  useEffect(() => {
    getUser()
  }, []);



  if (!user || !carts) {
    return null;
  }

  return (
    <>

      {user.user !== null ? <>
        <nav className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
          <div className="container">
            <Link className="navbar-brand" to={`/home`}>Wine <span>shop</span></Link>

            <div className="order-lg-last btn-group">
              <a href="#" className="btn-cart dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span className="flaticon-shopping-bag" />
                <div className="d-flex justify-content-center align-items-center"><small>{carts.length}</small></div>
              </a>
              <div className="dropdown-menu dropdown-menu-right">
                {carts?.length != 0 ?
                  carts?.map((item) => {
                    return (
                      <div className="dropdown-item d-flex align-items-start" href="#" key={item.idCarts}>

                        <div className="img" style={{ backgroundImage: `url(/${item.wines.imageWines})` }} />
                        <div className="text pl-3">
                          <h4>{item.wines.nameWines} </h4>
                          <p className="mb-0"><a href="#" className="price">${item.wines.priceWines}</a><span className="quantity ml-3">Quantity: {item.quality}</span></p>
                        </div>
                      </div>
                    )
                  }) :
                  <>
                    <p>Not wine in cart</p>
                  </>
                }

                <Link to={`/home/cart/${user.id}`} className="dropdown-item text-center btn-link d-block w-100">
                  View All
                  <span className="ion-ios-arrow-round-forward" />
                </Link>
              </div>
            </div>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="oi oi-menu" /> Menu
            </button>
            <div className="collapse navbar-collapse" id="ftco-nav">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item active"><Link to={`/home`} className="nav-link">Home</Link></li>
                <li className="nav-item"><a href="about.html" className="nav-link">About</a></li>

                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="dropdown04" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Products</a>
                  <div className="dropdown-menu" aria-labelledby="dropdown04">
                    <Link to={`/home/wines`} className="dropdown-item">All Wines</Link>
                    <Link to={`/home/cart/${user.id}`} className="dropdown-item">Cart</Link>
                    <Link to={`/home/history/${user.id}`} className="dropdown-item">History</Link>
                  </div>
                </li>
                <li className="nav-item"><a className="nav-link">{user.users}</a></li>
                <li className="nav-item"><a onClick={() => { handleLogout() }} className="nav-link">Log out</a></li>

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
      </> : <>
        <nav className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
          <div className="container">
            <Link className="navbar-brand" to={`/home`}>Wine <span>shop</span></Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="oi oi-menu" /> Menu
            </button>
            <div className="collapse navbar-collapse" id="ftco-nav">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item active"><Link to={`/home`} className="nav-link">Home</Link></li>
                <li className="nav-item"><a href="about.html" className="nav-link">About</a></li>
                <li className="nav-item"><Link to={`/home/wines`} className="nav-link">All Wines</Link></li>
                <li className="nav-item"><Link to={`/login`} className="nav-link"><i className="fa-regular fa-user"></i></Link></li>
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

      }



    </>

  )
}
export default Header;