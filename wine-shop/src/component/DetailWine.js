import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getWinesById } from "../service/WinesService";

function DetailWine() {
  const { id } = useParams();
  const [wine, setWine] = useState({});

  const getWine = async () => {
    const data = await getWinesById(id)
    setWine(data);
  }

  
  const img  = "/"+ wine.imageWines
  useEffect(() => {
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
              <a  className="image-popup prod-img-bg">
                <img
                  src= {img}
                  className="img-fluid"
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
              <p className="price">
                <span>${wine.priceWines}.00</span>
              </p>
              <p>
                {wine.descriptionWines}
              </p>
              <div className="row mt-4">
                <div className="input-group col-md-6 d-flex mb-3">
                  <span className="input-group-btn mr-2">
                    <button
                      type="button"
                      className="quantity-left-minus btn"
                      data-type="minus"
                      data-field=""
                    >
                      <i className="fa fa-minus" />
                    </button>
                  </span>
                  <input
                    type="text"
                    id="quantity"
                    name="quantity"
                    className="quantity form-control input-number"
                    defaultValue={1}
                    min={1}
                    max={100}
                  />
                  <span className="input-group-btn ml-2">
                    <button
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
                <a href="cart.html" className="btn btn-primary py-3 px-5 mr-2">
                  Add to Cart
                </a>
                <a href="cart.html" className="btn btn-primary py-3 px-5">
                  Buy now
                </a>
              </p>
            </div>
          </div>

        </div>
      </section>
    </>

  )
}
export default DetailWine