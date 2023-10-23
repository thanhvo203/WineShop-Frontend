import React, { useEffect, useState } from "react";
import { addToCart, getAllListWines, getLargestPrice, inforFromToken } from "../service/WinesService";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getList } from "../redux/action";
import Swal from "sweetalert2";
import { toast } from 'react-toastify';
import ReactSlider from "react-slider";


function ListWines() {

  const navigate = useNavigate();
  const [wines, setWines] = useState([]);
  let [firstAlcohol, setFirstAlcohol] = useState(0);
  let [lastAlcohol, setLastAlcohol] = useState(100);
  let [color, setColor] = useState("");
  let [flavor, setFlavor] = useState("");
  let [country, setCountry] = useState("");
  let [typeName, setTypeName] = useState("");
  let [nameWines, setNameWines] = useState("");
  const [wine, setWine] = useState({});
  let [minPrice, setMinPrice] = useState(0);
  let [maxPrice, setMaxprice] = useState();
  let [page, setPage] = useState(0);


  // ----------------------------------Search by price--------------------------------------

  const getMaxPrice = async () => {
    const data = await getLargestPrice();
    setWine(data);
    setMaxprice(data.priceWines)
  };
  useEffect(() => {
    setValues([minPrice, maxPrice]);
  }, [minPrice, maxPrice]);
  const [values, setValues] = useState({ minPrice, maxPrice })


  const handleCheckPrice = (min ,max) => {
    getListWine(page, firstAlcohol, lastAlcohol, color, flavor, country, typeName, nameWines, min, max)

  }

  //---------------------------------Get User ----------------------------------------------

  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const getUser = async () => {
    const data = await inforFromToken();
    setUser(data);
  }
  // ---------------------------------Search ---------------------------------------
  const handleAlcohol = (event) => {
    const data = event.target.getAttribute('data-value');
    const [value1, value2] = data.split('-')
    setFirstAlcohol(value1);
    setLastAlcohol(value2);
  }
  const handleColor = (event) => {
    const data = event.target.getAttribute('data-value')
    setColor(data);
  }
  const handleFlavor = (event) => {
    const data = event.target.getAttribute('data-value')
    setFlavor(data);
  }
  const handleCountry = (event) => {
    const data = event.target.getAttribute('data-value')
    setCountry(data)
  }
  const handleTypeName = (event) => {
    const data = event.target.getAttribute('data-value')
    setTypeName(data);
  }
  const handlenameWines = (event) => {
    setNameWines(event.target.value)
  }

  const nextPage = () => {
    if (page < wines.totalPages) {
      setPage(page + 1)
      getListWine(page, firstAlcohol, lastAlcohol, color, flavor, country, typeName, nameWines, minPrice, maxPrice)
    }
  }
  const previosPage = () => {
    if (page >= 1) {
      setPage(page - 1);
      getListWine(page, firstAlcohol, lastAlcohol, color, flavor, country, typeName, nameWines, minPrice, maxPrice)
    }
  }
  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSearch();
    }
  }
  const handleSearch = () => {
    if (nameWines === "") {
      Swal.fire({
        icon: 'error',
        timer: 2000,
        title: 'Please enter the wine name you want to search for?'
      })
      setColor("")
      setCountry("")
      setFirstAlcohol(0)
      setLastAlcohol(100)
      setTypeName("")
      setFlavor("")
      setNameWines("")
      setPage(0)
      setMinPrice(0);
      setMaxprice(wine.priceWines)
    } else {
      getListWine(page, firstAlcohol, lastAlcohol, color, flavor, country, typeName, nameWines, minPrice, maxPrice)
    }
  }



  // --------------------------Add to cart ----------------------------------------

  const add = async (quantity, idCustomer, idWines) => {
    console.log(quantity, idCustomer, idWines);
    try {
      if (user === null) {
        Swal.fire({
          icon: 'warning',
          timer: 2000,
          title: 'Please log in before performing this action',
          showConfirmButton: true,
          showCancelButton: true,
          confirmButtonText: "Go to Log in"
        }).then(async (result) => {
          if (result.isConfirmed) {
            navigate("/login")
          }
        })
      } else {
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



  const getListWine = async (page1, firstAlcohol1, lastAlcohol1, color1, flavor1, country1, typeName1, nameWines1, minPrice1, maxPrice1) => {
    try {
      const data = await getAllListWines(page1, firstAlcohol1, lastAlcohol1, color1, flavor1, country1, typeName1, nameWines1, minPrice1, maxPrice1);
      console.log(data)
      setWines(data);
    } catch (error) {
      Swal.fire({
        timer: 2000,
        title: 'Not found data',
        icon: 'error'
      }).then(() => {
        setColor("")
        setCountry("")
        setFirstAlcohol(0)
        setLastAlcohol(100)
        setTypeName("")
        setFlavor("")
        setNameWines("")
        setPage(0)
        setMinPrice(0);
        setMaxprice(wine.priceWines)

      })

    }

  }
  useEffect(() => {
    getUser()
    if (wine.priceWines != undefined) {
      getListWine(page, firstAlcohol, lastAlcohol, color, flavor, country, typeName, nameWines, minPrice, maxPrice)
    } else {
      getMaxPrice()
    }
  }, [page, firstAlcohol, lastAlcohol, color, flavor, country, typeName, minPrice, maxPrice])
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
                <span style={{ marginLeft: '323px' }}>Search</span>
              </div>
              <div className="row mb-4">
                <div className="dropdown" style={{ marginLeft: '15px' }}>
                  <button style={{ backgroundColor: '#b7472a', color: 'white' }} className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Alcohol
                  </button>
                  <ul className="dropdown-menu" onClick={handleAlcohol}>
                    <li><a className="dropdown-item" data-value="35-40" >35-40</a></li>
                    <li><a className="dropdown-item" data-value="40-50">40-50</a></li>
                    <li><a className="dropdown-item" data-value="50-100"> <i className="fa-solid fa-greater-than"></i>50 </a></li>
                  </ul>
                </div>
                <div className="dropdown" style={{ marginLeft: '5px' }}>
                  <button style={{ backgroundColor: '#b7472a', color: 'white' }} className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Color
                  </button>
                  <ul className="dropdown-menu" onClick={handleColor}>
                    <li><a className="dropdown-item" data-value="Dark Brown">Dark Brown</a></li>
                    <li><a className="dropdown-item" data-value="Caramel">Caramel</a></li>
                    <li><a className="dropdown-item" data-value="Light Yellow">Light Yellow</a></li>
                    <li><a className="dropdown-item" data-value="Amber">Amber</a></li>
                    <li><a className="dropdown-item" data-value="Bright">Bright</a></li>
                    <li><a className="dropdown-item" data-value="Dark">Dark</a></li>
                    <li><a className="dropdown-item" data-value="Natural">Natural</a></li>
                    <li><a className="dropdown-item" data-value="Honey yellow">Honey yellow</a></li>
                    <li><a className="dropdown-item" data-value="Bright yellow">Bright yellow</a></li>
                  </ul>
                </div>

                <div className="dropdown" style={{ marginLeft: '5px' }}>
                  <button style={{ backgroundColor: '#b7472a', color: 'white' }} className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Flavor
                  </button>
                  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <div className="row" onClick={handleFlavor}>
                      <div className="col-md-6" style={{ paddingLeft: "0px" }} >
                        <a className="dropdown-item" data-value="Rich" >Rich</a>
                        <a className="dropdown-item" data-value="Spicy">Spicy</a>
                        <a className="dropdown-item" data-value="Bitter">Bitter</a>
                        <a className="dropdown-item" data-value="Sweet" >Sweet</a>
                        <a className="dropdown-item" data-value="Orange">Orange</a>
                        <a className="dropdown-item" data-value="Vani" >Vani</a>
                        <a className="dropdown-item" data-value="Green Apple">Green Apple</a>
                      </div>
                      <div className="col-md-6" style={{ marginLeft: '-41px' }}>
                        <a className="dropdown-item" data-value="Oak">Oak</a>
                        <a className="dropdown-item" data-value="Dried Fruit">Dried Fruit</a>
                        <a className="dropdown-item" data-value="Pears" >Pears</a>
                        <a className="dropdown-item" data-value="Peaches" >Peaches</a>
                        <a className="dropdown-item" data-value="Chocolate">Chocolate</a>
                        <a className="dropdown-item" data-value="Cinamon">Cinamon</a>

                      </div>
                    </div>
                  </div>
                </div>
                <div className="dropdown" style={{ marginLeft: '5px' }}>
                  <button style={{ backgroundColor: '#b7472a', color: 'white' }} className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Country
                  </button>
                  <ul className="dropdown-menu" onClick={handleCountry}>
                    <li><a className="dropdown-item" data-value="Scotland">Scotland</a></li>
                    <li><a className="dropdown-item" data-value="Indian">Indian</a></li>
                    <li><a className="dropdown-item" data-value="France">France</a></li>
                    <li><a className="dropdown-item" data-value="Germany">Germany</a></li>
                    <li><a className="dropdown-item" data-value="Hamiltion">Hamilton</a></li>
                    <li><a className="dropdown-item" data-value="Kentucky">Kentucky</a></li>
                    <li><a className="dropdown-item" data-value="American">American</a></li>
                    <li><a className="dropdown-item" data-value="Ireland">Ireland</a></li>
                    <li><a className="dropdown-item" data-value="Jamaica">Jamaica</a></li>

                  </ul>
                </div>
                <div style={{ marginLeft: '10px' }}>
                  <input placeholder="Search by name wine" onKeyDown={handleKeyPress} onChange={handlenameWines} id="searchInput" style={{ width: '332px', height: '37px', borderRadius: '4px' }}></input>
                  <button type="button" onClick={handleSearch} style={{ marginLeft: '7px', height: '37px', width: '77px', borderRadius: '4px', backgroundColor: '#b7472a', color: 'white' }}>Search</button>
                </div>

              </div>
              <div className="row">
                {wines.content && wines.content.length !== 0 ?
                  wines.content.map((item, index) => {
                    return (
                      <div className="col-md-4 d-flex" key={item.idWines}>
                        <div className="product ftco-animate">
                          <div className="img d-flex align-items-center justify-content-center" style={{ backgroundImage: `url(/${item.imageWines})` }}>

                            <div className="desc">
                              <p className="meta-prod d-flex">
                                {user === null ?
                                  <>
                                    <a className="d-flex align-items-center justify-content-center">
                                      <span onClick={() => { add() }} className="flaticon-shopping-bag" />
                                    </a>
                                  </>
                                  :
                                  <>
                                    {item.quantity === 0 ? 
                                      <></>
                                      :
                                      <a className="d-flex align-items-center justify-content-center">
                                      <span onClick={() => { add(1, user.id, item.idWines) }} className="flaticon-shopping-bag" />
                                    </a>
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
                      <li onClick={previosPage}>
                        <a>&lt;</a>
                      </li>
                      <li>
                        <span>{page + 1}/{wines.totalPages}</span>
                      </li>
                      <li onClick={nextPage}>
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
                  <ul className="p-0" onClick={handleTypeName}>
                    <li>
                      <a data-value="Brandy">
                        Brandy <span className="fa fa-chevron-right" />
                      </a>
                    </li>
                    <li>
                      <a data-value="Gin">
                        Gin <span className="fa fa-chevron-right" />
                      </a>
                    </li>
                    <li>
                      <a data-value="Rum">
                        Rum <span className="fa fa-chevron-right" />
                      </a>
                    </li>
                    <li>
                      <a data-value="Tequila">
                        Tequila <span className="fa fa-chevron-right" />
                      </a>
                    </li>
                    <li>
                      <a data-value="Vodka">
                        Vodka <span className="fa fa-chevron-right" />
                      </a>
                    </li>
                    <li>
                      <a data-value="Whisky">
                        Whisky <span className="fa fa-chevron-right" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="sidebar-box ftco-animate">
                <div className="">
                  <h3>Price Range</h3>
                  <div className={"value"}>${values[0]} - ${values[1]}</div>
                  <ReactSlider className={"slider"} onChange={setValues} value={values} min={minPrice} max={maxPrice} />
                </div>
                <button className="btn btn-primary" style={{
                  marginTop: '27px',
                  marginLeft: '51px',
                  height: '38px',
                  width: '144px'
                }} onClick={() => {handleCheckPrice(values[0],values[1])}}>
                  Check
                </button>
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
export default ListWines;