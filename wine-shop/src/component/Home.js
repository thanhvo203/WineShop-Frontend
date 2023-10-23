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
                                <span className="subheading">History</span>
                                <h2 className="mb-4">History of strong liquor</h2>
                                <p>1.Liquor in ancient times: Liquor has been produced and consumed since ancient times, perhaps thousands of years before the Common Era. Civilizations such as Ancient Egypt and Ancient China had forms of liquor usage. Liquor during this period was often made from ingredients such as barley, grapes, honey, fruits, and other plants.</p>
                                <p>2.Middle Ages and Strong Liquor: During the Middle Ages, the art of distilling strong liquor developed. Several European countries such as Ancient Ireland, Wales, Scotland, and France developed the technology of distilling liquor from barley or grapes. Strong liquor made from barley was called whisky, while strong liquor made from grapes was called wine.</p>
                                 <p>3.Industrial Revolution and Industrial Strong Liquor: In the 18th and 19th centuries, distilling technology made significant advancements. Industrial distillation processes and essence-making procedures were applied, creating strong liquor of consistent quality and easier consumption. Countries such as England, the United States, and France became centers of strong liquor production and consumption.</p>
                                 <p>4.20th Century to Present: In the 20th century, strong liquor production technology continued to advance, with the development of fermentation, distillation, and aging processes. Strong liquors such as vodka, rum, gin, tequila, and bourbon became popular worldwide. Today, strong liquor is produced and consumed globally and plays a significant role in culture, art, and cuisine.</p>
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
                                                    <>
                                                    <a className="d-flex align-items-center justify-content-center"><span onClick={() => { add() }} className="flaticon-shopping-bag" /></a>
                                                    </>
                                                    :
                                                    <>
                                                    {wines.quantity === 0 ? <></>:
                                                    <a className="d-flex align-items-center justify-content-center"><span onClick={() => { add(1,user.id, item.idWines) }} className="flaticon-shopping-bag" /></a>
                                                     }                                   
                                                    </>
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