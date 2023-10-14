import React, { useEffect, useState } from "react";
import { getAllListWines } from "../service/WinesService";
import { Link } from "react-router-dom";

function ListWine() {
  const [wines, setWines] = useState();
  let [firstAlcohol,setFirstAlcohol] = useState(0);
  let [lastAlcohol,setLastAlcohol] = useState(100);
  let [color,setColor] = useState("");
  let [flavor,setFlavor] = useState("");
  let [country,setCountry] = useState("");
  let [idType,setIdType] = useState("");


  const getListWine = async () => {
    const data = await getAllListWines(firstAlcohol,lastAlcohol,color,flavor,country,idType);
    console.log(data)
    setWines(data);
  }
  useEffect(() => {
    getListWine(firstAlcohol,lastAlcohol,color,flavor,country,idType)
  }, [firstAlcohol,lastAlcohol,color,flavor,country,idType])
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
              <div style={{ fontSize: '18px' }}>Filter
                <span style={{marginLeft:'332px'}}>Search</span>
              </div>
              <div className="row mb-4">
                <div class="dropdown" style={{ marginLeft: '15px' }}>
                  <button style={{ backgroundColor: '#b7472a', color: 'white' }} class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Alcohol
                  </button>
                  <ul class="dropdown-menu">
                    <li><a class="dropdown-item">35-40</a></li>
                    <li><a class="dropdown-item">40-50</a></li>
                    <li><a class="dropdown-item"> <i class="fa-solid fa-greater-than"></i>50 </a></li>
                  </ul>
                </div>
                <div class="dropdown" style={{ marginLeft: '5px' }}>
                  <button style={{ backgroundColor: '#b7472a', color: 'white' }} class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Color
                  </button>
                  <ul class="dropdown-menu">
                    <li><a class="dropdown-item">Dark Brown</a></li>
                    <li><a class="dropdown-item">Caramel</a></li>
                    <li><a class="dropdown-item">Light Yellow</a></li>
                    <li><a class="dropdown-item">Amber</a></li>
                    <li><a class="dropdown-item">Bright</a></li>
                    <li><a class="dropdown-item">Dark</a></li>
                    <li><a class="dropdown-item">Natural</a></li>
                    <li><a class="dropdown-item">Honey yellow</a></li>
                    <li><a class="dropdown-item">Bright yellow</a></li>
                  </ul>
                </div>
       
                <div class="dropdown" style={{ marginLeft: '5px' }}>
                  <button style={{ backgroundColor: '#b7472a', color: 'white' }} class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Flavor
                  </button>
                  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <div class="row">
                      <div class="col-md-6" style={{paddingLeft:"0px"}}>
                        <a class="dropdown-item">Rich</a>
                        <a class="dropdown-item">Spicy</a>
                        <a class="dropdown-item">Bitter</a>
                        <a class="dropdown-item">Sweet</a>
                        <a class="dropdown-item">Orange</a>
                        <a class="dropdown-item">Vani</a>
                        <a class="dropdown-item">Green Apple</a>
                      </div>
                      <div class="col-md-6" style={{marginLeft: '-41px'}}>
                        <a class="dropdown-item">Oak</a>
                        <a class="dropdown-item">Dried Fruit</a>
                        <a class="dropdown-item">Pears</a>
                        <a class="dropdown-item">Peaches</a>
                        <a class="dropdown-item">Chocolate</a>
                        <a class="dropdown-item">Cinamon</a>
                        
                      </div>
                    </div>
                  </div>
                </div>
                <div class="dropdown" style={{ marginLeft: '5px' }}>
                  <button style={{ backgroundColor: '#b7472a', color: 'white' }} class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Country
                  </button>
                  <ul class="dropdown-menu">
                    <li><a class="dropdown-item">Scotland</a></li>
                    <li><a class="dropdown-item">Indian</a></li>
                    <li><a class="dropdown-item">France</a></li>
                    <li><a class="dropdown-item">Germany</a></li>
                    <li><a class="dropdown-item">Hamilton</a></li>
                    <li><a class="dropdown-item">Kentucky</a></li>
                    <li><a class="dropdown-item">American</a></li>
                    <li><a class="dropdown-item">Ireland</a></li>
                    <li><a class="dropdown-item">Jamaica</a></li>

                  </ul>
                </div>
                <div style={{ marginLeft: '10px' }}>
                  <input placeholder="Search by name wine" style={{ width: '332px', height: '37px', borderRadius: '4px' }}></input>
                  <button type="button" style={{ marginLeft: '7px', height: '37px', width: '77px', borderRadius: '4px', backgroundColor: '#b7472a', color: 'white' }}>Search</button>
                </div>

              </div>
              <div className="row">
                {wines.content && wines.content.length  !==0 ? 
                 wines.content.map((item, index) => {
                  return (
                    <div className="col-md-4 d-flex" key={item.idWines}>
                      <div className="product ftco-animate">
                        <div className="img d-flex align-items-center justify-content-center" style={{ backgroundImage: `url(/${item.imageWines})` }}>

                          <div className="desc">
                            <p className="meta-prod d-flex">
                              <a
                              
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
                }) : 
                  <div>
                     <p>Data not found</p>
                  </div>
                }

              </div>
              <div className="row mt-5">
                <div className="col text-center">
                  <div className="block-27">
                    <ul>
                      <li>
                        <a>&lt;</a>
                      </li>
                      <li className="active">
                        <span>1</span>
                      </li>
                      <li>
                        <a>2</a>
                      </li>

                      <li>
                        <a>&gt;</a>
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
                      <a value="1">
                        Brandy <span className="fa fa-chevron-right" />
                      </a>
                    </li>
                    <li>
                      <a value="2">
                        Gin <span className="fa fa-chevron-right" />
                      </a>
                    </li>
                    <li>
                      <a value="2">
                        Rum <span className="fa fa-chevron-right" />
                      </a>
                    </li>
                    <li>
                      <a>
                        Tequila <span className="fa fa-chevron-right" />
                      </a>
                    </li>
                    <li>
                      <a>
                        Vodka <span className="fa fa-chevron-right" />
                      </a>
                    </li>
                    <li>
                      <a>
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
                      <a>
                        Even the all-powerful Pointing has no control about the
                        blind texts
                      </a>
                    </h3>
                    <div className="meta">
                      <div>
                        <a>
                          <span className="fa fa-calendar" /> Apr. 18, 2020
                        </a>
                      </div>
                      <div>
                        <a>
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
                      <a>
                        Even the all-powerful Pointing has no control about the
                        blind texts
                      </a>
                    </h3>
                    <div className="meta">
                      <div>
                        <a>
                          <span className="fa fa-calendar" /> Apr. 18, 2020
                        </a>
                      </div>
                      <div>
                        <a>
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
                      <a>
                        Even the all-powerful Pointing has no control about the
                        blind texts
                      </a>
                    </h3>
                    <div className="meta">
                      <div>
                        <a>
                          <span className="fa fa-calendar" /> Apr. 18, 2020
                        </a>
                      </div>
                      <div>
                        <a>
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