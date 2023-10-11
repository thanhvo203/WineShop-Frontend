import React, { useEffect, useState } from "react";
import { getAllListWines } from "../service/WinesService";
import { Link } from "react-router-dom";

function ListWine() {
  const [wines, setWines] = useState();

  const getListWine = async () => {
    const data = await getAllListWines();
    console.log(data)
    setWines(data);
  }
  useEffect(() => {
    getListWine()
  }, [])
  if (!wines) {
    return null;
  }
  return (
    <>
      <link rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css" /> 
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
                  <button type="button" className="btn btn-primary" style={{marginLeft:'5px',marginTop:'-5px'}}>
                    Search
                  </button>
                </div>
              </div>
              <div className="row">
                {wines.content.length > 0 && wines.content.map((item, index) => {
                  return (
                    <div className="col-md-4 d-flex"  key={item.idWines}>
                      <div className="product ftco-animate">
                      <div className="img d-flex align-items-center justify-content-center" style={{ backgroundImage: `url(/${item.imageWines})` }}>

                          <div className="desc">
                            <p className="meta-prod d-flex">
                              <a
                                href="#"
                                className="d-flex align-items-center justify-content-center"
                              >
                                <span className="flaticon-shopping-bag" />
                              </a>
                              <Link to={`/home/detail/${item.idWines}`} className="d-flex align-items-center justify-content-center"><span className="flaticon-visibility" /></Link>
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
                    style={{ backgroundImage: "url(/images/image_1.jpg)" }}
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
                    style={{ backgroundImage: "url(/images/image_2.jpg)" }}
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
                    style={{ backgroundImage: "url(/images/image_3.jpg)" }}
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

    </>

  )
}
export default ListWine;