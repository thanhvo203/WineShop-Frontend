import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getListDetailHistory, inforFromToken } from "../service/WinesService";

function DetailHistory() {
    const [list, setList] = useState([]);
    const { id } = useParams();
    const [user, setUser] = useState({
        user: null
    });

    const getList = async () => {
        const data = await getListDetailHistory(id);
        setList(data)
    }

    console.log(user);
    const getUser = async () => {
        const data = await inforFromToken();
        setUser(data)
    }
    console.log(list);
    useEffect(() => {
        window.scrollTo(0,700)
        document.title = 'WineShop - Detail History'
        getUser();
        getList();
    }, [id])

    if (!list) {
        return null;
    }

    return (
        <>
            <div
                className=" col col-sm-12 col-md-12  mt-5"
                style={{ paddingLeft: "100px", paddingRight: "100px" }}
            >
                {list.length > 0 && (
                    <h2 className="p-0 text-start mb-3" style={{ marginTop: "100px" }}>
                        Purchase history
                    </h2>
                )}
                <div className=" d-flex flex-column justify-content-center align-items-center ">
                    {list.length > 0 ? (
                        <table className="table table-hover">
                            <thead>
                                <tr className="px-0">
                                    <td
                                        colSpan={2}
                                        style={{
                                            color: "grey",
                                            fontWeight: "bold",
                                            borderTop: "none",
                                        }}
                                    >
                                        Image
                                    </td>
                                    <td
                                        style={{
                                            color: "grey",
                                            fontWeight: "bold",
                                            borderTop: "none",
                                        }}
                                    >
                                        Name
                                    </td>
                                    <td
                                        style={{
                                            color: "grey",
                                            fontWeight: "bold",
                                            borderTop: "none",
                                        }}
                                    >
                                        Price
                                    </td>
                                    <td
                                        style={{
                                            color: "grey",
                                            fontWeight: "bold",
                                            borderTop: "none",
                                        }}
                                    >
                                        Quantity
                                    </td>
                                    <td
                                        colSpan={3}
                                        style={{
                                            color: "grey",
                                            fontWeight: "bold",
                                            borderTop: "none",
                                        }}
                                    >Payment method</td>

                                </tr>
                            </thead>
                            <tbody>
                                {list.map((item) => (
                                    <tr key={`el_${item.idOrderDetails}`} className="py-5">
                                        <td className="align-middle text-center px-0">
                                            <div style={{ width: '50x', height: '80px' }}>
                                                <img src={"/" + item.idWines.imageWines}
                                                    className="w-100 h-100"
                                                ></img>
                                            </div>
                                        </td>
                                        <td className=" text-center align-middle fw-bold">
                                            <div
                                                style={{ cursor: "pointer" }}
                                                className=" d-flex flex-column align-items-start justify-content-center mx-2"

                                            >
                                                <p className="m-0"></p>
                                                <small></small>
                                                <div className="bottom d-flex align-items-start flex-column align-items-start  justify-content-start">

                                                </div>
                                            </div>
                                        </td>
                                        <td className="align-middle  ">{item.idWines.nameWines}</td>
                                        <td className="align-middle  ">
                                            ${item.idWines.priceWines}
                                        </td>
                                        <td className="align-middle ">{item.quality}</td>
                                        <td className="align-middle">Paypal</td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    ) : (
                        <>
                            <div className="d-flex justify-content-center align-items-center flex-column">
                                <h2 className="p-0  mb-3" style={{ marginTop: "100px" }}>
                                    Purchase history
                                </h2>
                                <img
                                    src="https://s.udemycdn.com/browse_components/flyout/empty-shopping-cart-v2-2x.jpg"
                                    className="w-75"
                                ></img>
                                <p className="col col-md-12  mb-3 text-center fs-6">
                                    Sorry, we couldn't find any results for your purchase history!
                                </p>
                                <div>
                                    
                                </div>
                            </div>
                        </>
                    )}

                    <Link to={`/home/history/${user.id}`} style={{ marginLeft: '1000px' }} className="btn btn-primary py-3 px-5 mr-2">
                        Back
                    </Link>

                </div>
            </div>
        </>
    )
}
export default DetailHistory;