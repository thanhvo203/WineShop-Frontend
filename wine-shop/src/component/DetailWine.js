import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { addToCart, getWinesById, inforFromToken } from "../service/WinesService";
import { useDispatch } from "react-redux";
import { getList } from "../redux/action";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

function DetailWine() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [wine, setWine] = useState({});
  const [quantity,setQuantity] = useState(1);
  const [user, setUser] = useState({});

    const getUser = async () => {
        const data = await inforFromToken();
        setUser(data);
    }

  const getWine = async () => {
    const data = await getWinesById(id)
    setWine(data);
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
  const checkUser = () => {
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
    }
  }
  const handlePlusQuantity = () => {
      setQuantity(quantity + 1)
  }
  const handleMinusQuantity = () => {
    setQuantity(quantity - 1)
  }
  const handleChangeQuantity = (event) => {
    if (event.target.value > wine.quantity) {
      setQuantity(wine.quantity);
    }else if(event.target.value < 0){
      setQuantity(1)
    }else{
      setQuantity(event.target.value)
    }
  };

  
  const img  = "/"+ wine.imageWines
  useEffect(() => {
    getUser();
    getWine();
  }, [id])
  return (
    <>
      <link rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css" />
      <section className="ftco-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 mb-5">
              <a  className="image-popup prod-img-bg" style={{height:'800px', width:'504px'}}>
                <img style={{height:'809px',width:'550px'}}
                  src= {img}
                  
                  alt="Colorlib Template"
                />
              </a>
            </div>
            <div className="col-lg-6 product-details pl-md-5">
              <h3>{wine.nameWines}</h3>
              <div className="rating d-flex">
                <p className="text-left mr-4">
                  <p className="mr-2">
                    <b>Flavor </b> : {wine.flavorWines}
                  </p>
                  <p className="mr-2">
                    <b>Color </b> : {wine.colorWines}
                  </p>
                  <p className="mr-2">
                    <b>Alcohol </b> : {wine.alcohol}%
                  </p>
                  <p className="mr-2">
                    <b>Country </b> : {wine.countryManufacture}
                  </p>
                  <p className="mr-2">
                    <b>Manufacturer </b> : {wine.manufactureWines}
                  </p>
                </p>
              </div>
              <p className="price" style={{marginTop:'-32px'}}>
                <span>${wine.priceWines}.00</span>
              </p>
              <p style={{marginTop:'-20px'}}>
                {wine.descriptionWines}
              </p>
              <div className="row mt-4">
                <div className="input-group col-md-6 d-flex mb-3">
                  <span className="input-group-btn mr-2">
                    <button
                    onClick={handleMinusQuantity}
                      type="button"
                      className="quantity-left-minus btn"
                      data-type="minus"
                      data-field=""
                      
                    >
                      <i className="fa fa-minus" />
                    </button>
                  </span>
                  <input
                    type="number"
                    className="quantity form-control input-number"
                    value={quantity}
                    onChange={handleChangeQuantity}
                  />
                  <span className="input-group-btn ml-2">
                    <button
                      onClick={handlePlusQuantity}
                      type="button"
                      className="quantity-right-plus btn"
                      data-type="plus"
                      data-field=""
                    >
                      <i className="fa fa-plus" />
                    </button>
                  </span>
                </div>
                <div className="w-100" />
                <div className="col-md-12">
                  <p style={{ color: "#000" }}>{wine.quantity} piece available</p>
                </div>
              </div>
              <p>
              {user === null ? 
                <>
                <a onClick={() => {add()}} className="btn btn-primary py-3 px-5 mr-2">
                  Add to Cart
                </a>
                <a onClick={() => {checkUser()}} className="btn btn-primary py-3 px-5">
                  Go to Cart
                </a>
                </> :
                <>
                {wine.quantity === 0 ? 
                  <a style={{backgroundColor:'grey',border:'1px'}} disabled className="btn btn-primary py-3 px-5 mr-2">
                  Add to Cart
                </a>
                :
                <a onClick={() => {add(quantity, user.id, wine.idWines) }} className="btn btn-primary py-3 px-5 mr-2">
                  Add to Cart
                </a>
                }
                {/* <a onClick={() => {add(quantity, user.id, wine.idWines) }} className="btn btn-primary py-3 px-5 mr-2">
                  Add to Cart
                </a> */}
                <Link to={`/home/cart/${user.id}`} className="btn btn-primary py-3 px-5">
                  Go to Cart
                </Link>
                </>
              }
                
              </p>
            </div>
          </div>

        </div>
      </section>
    </>

  )
}
export default DetailWine