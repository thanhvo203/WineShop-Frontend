import React, { useEffect, useState } from 'react';
import { addToCart, getListWines, inforFromToken } from '../service/WinesService';
import { Link, useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import {  getList } from '../redux/action';
import Header from './Header';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';


function Home() {
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const [wines, setWines] = useState();
    const [user, setUser] = useState({});

    const getUser = async () => {
        const data = await inforFromToken();
        setUser(data);
    }

    const listHome = async () => {
        const data = await getListWines();
        setWines(data);
    }
    const add = async (quantity, idCustomer, idWines) => {
        console.log(quantity, idCustomer, idWines);
        try {
            if(user === null) {
              Swal.fire({
                icon:'warning',
                timer:2000,
                title:'Please log in before performing this action',
                showConfirmButton:true,
                showCancelButton:true,
                confirmButtonText: "Go to Log in"
              }).then(async(result) => {
                if(result.isConfirmed) {
                  navigate("/login")
                }
              })
            }else{
            await addToCart(quantity, user.id, idWines)
            dispatch(getList(user.id))
            toast.success("Add success", {
                autoClose: 500
            })
          }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getUser();
        listHome()
    }, [])

    if (!wines) {
        return null;
    }

    return (
        <div>
            <link rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css" />

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
                        {wines.length > 0 && wines.map((item) => {
                            return (
                                <div className="col-md-3 d-flex" key={item.idWines}>
                                    <div className="product ftco-animate">
                                        <div className="img d-flex align-items-center justify-content-center" style={{ backgroundImage: `url(${item.imageWines})` }}>

                                            <div className="desc">
                                                <p className="meta-prod d-flex">
                                                   {user === null ? 
                                                    <a className="d-flex align-items-center justify-content-center"><span onClick={() => { add() }} className="flaticon-shopping-bag" /></a>
                                                    :
                                                    <a className="d-flex align-items-center justify-content-center"><span onClick={() => { add(1,user.id, item.idWines) }} className="flaticon-shopping-bag" /></a>
                                                   }     
                                                    <Link to={`/home/detail/${item.idWines}`} className="d-flex align-items-center justify-content-center"><span className="flaticon-visibility" /></Link>
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
                            )
                        })}

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
                                <a  className="block-20 img" style={{ backgroundImage: 'url("images/image_1.jpg")' }}>
                                </a>
                                <div className="text p-4 bg-light">
                                    <div className="meta">
                                        <p><span className="fa fa-calendar" /> 23 April 2020</p>
                                    </div>
                                    <h3 className="heading mb-3"><a>The Recipe from a Winemaker’s Restaurent</a></h3>
                                    <p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                                    <a  className="btn-custom">Continue <span className="fa fa-long-arrow-right" /></a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 d-flex align-items-stretch ftco-animate">
                            <div className="blog-entry d-flex">
                                <a className="block-20 img" style={{ backgroundImage: 'url("images/image_2.jpg")' }}>
                                </a>
                                <div className="text p-4 bg-light">
                                    <div className="meta">
                                        <p><span className="fa fa-calendar" /> 23 April 2020</p>
                                    </div>
                                    <h3 className="heading mb-3"><a >The Recipe from a Winemaker’s Restaurent</a></h3>
                                    <p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                                    <a  className="btn-custom">Continue <span className="fa fa-long-arrow-right" /></a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 d-flex align-items-stretch ftco-animate">
                            <div className="blog-entry d-flex">
                                <a className="block-20 img" style={{ backgroundImage: 'url("images/image_3.jpg")' }}>
                                </a>
                                <div className="text p-4 bg-light">
                                    <div className="meta">
                                        <p><span className="fa fa-calendar" /> 23 April 2020</p>
                                    </div>
                                    <h3 className="heading mb-3"><a >The Recipe from a Winemaker’s Restaurent</a></h3>
                                    <p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                                    <a className="btn-custom">Continue <span className="fa fa-long-arrow-right" /></a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 d-flex align-items-stretch ftco-animate">
                            <div className="blog-entry d-flex">
                                <a  className="block-20 img" style={{ backgroundImage: 'url("images/image_4.jpg")' }}>
                                </a>
                                <div className="text p-4 bg-light">
                                    <div className="meta">
                                        <p><span className="fa fa-calendar" /> 23 April 2020</p>
                                    </div>
                                    <h3 className="heading mb-3"><a >The Recipe from a Winemaker’s Restaurent</a></h3>
                                    <p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                                    <a className="btn-custom">Continue <span className="fa fa-long-arrow-right" /></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>

    )
}
export default Home;