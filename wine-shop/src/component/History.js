import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getCustomerByIdAccount, getListHistory } from "../service/WinesService";


function History() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [historys, setHistorys] = useState([]);
    let [page, setPage] = useState(0);
    let [startDate, setStartDate] = useState(null);
    let [endDate, setEndDate] = useState(null);


    const getList = async () => {
        try {
            const response = await getListHistory(id, page, startDate, endDate);
            setHistorys(response);
        } catch (error) {
            console.log(error);
        }
    };
    const handleSearch = () => {
        const minDay = document.getElementById("startDate").value;
        const maxDay = document.getElementById("endDate").value;
        setStartDate(minDay);
        setEndDate(maxDay)
        getList(id, page, startDate, endDate)
    }
    const nextPage = () => {
        if (page < historys.totalPages) {
            setPage(page + 1)
            getList(id, page, startDate, endDate)
        }
    }
    const previosPage = () => {
        if (page >= 1) {
            setPage(page - 1);
            getList(id, page, startDate, endDate)
        }
    }

    useEffect(() => {
        window.scrollTo(0,700)
        document.title = 'WineShop - History'
        getList()
    }, [page, startDate, endDate])

    if (!historys) {
        return null;
    }

    return (
        <>
            <link rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css" />
            <div className="row row-function" style={{ display: 'flex' }}>
                <div className="col-8 col-search" style={{ marginTop: '24px', float: 'left' }}>
                    <span style={{ marginLeft: '20px', fontWeight: 'bold' }}>Search</span>
                    <input
                        type="date"
                        id="startDate"
                       
                        style={{
                            width: '250px',
                            borderRadius: '5px',
                            boxSizing: 'border-box',
                            borderWidth: 0,
                            border: '1px solid grey',
                            height: '39px',
                            marginLeft: '10px'
                        }}
                        className="appearance-none pl-8 pr-6 py-2 bg-white text-sm focus:outline-none" />
                    <input
                    
                        id="endDate"
                        type="date"
                        style={{
                            width: '250px',
                            borderRadius: '5px',
                            boxSizing: 'border-box',
                            borderWidth: 0,
                            border: '1px solid grey',
                            height: '39px',
                            marginLeft: '10px'
                        }}
                        className="appearance-none pl-8 pr-6 py-2 bg-white text-sm focus:outline-none" />
                    <button
                        onClick={() => {handleSearch()}}
                        className="btn btn-primary" style={{
                            marginRight: 'auto',
                            width: '50px',
                            marginLeft: '5px',
                            marginTop: '-3px',
                        }} >
                        <i className="fa-solid fa-magnifying-glass" />
                    </button>
                </div>

            </div>
            <div className="-mx-2 sm:-mx-7 py-4 overflow-x-auto">
                <div className="inline-block min-w-full shadow rounded-lg overflow-hidden"
                    style={{ borderRadius: '10px' }}>
                    {historys.content && historys.content.length !== 0 ?
                        <div>
                            <div>
                                <table className="min-w-full leading-normal table " id="myTable" >
                                    <thead>
                                        <tr style={{ background: '#b7472a', color: '#ffffff', borderRadius: '10px' }}>
                                            <th className="px-2 py-3 text-left ">
                                                Number
                                            </th>
                                            <th className="px-2 py-3 text-left ">
                                                Day Order
                                            </th>
                                            <th className="px-2 py-3   text-left ">
                                                Time Order
                                            </th>
                                            <th className="px-2 py-3  text-left">
                                                Total Price
                                            </th>
                                            <th className="px-2 py-3   text-left ">
                                                Function
                                            </th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {historys.content.map((item, index) => (
                                            <tr key={`ctm_${item?.idOrder}`}
                                            >
                                                <td className="px-3 py-3">
                                                    <div className="flex items-center" style={{ color: 'black', fontWeight: '600' }}>
                                                        <div className="ml-3">
                                                            <p>
                                                                {(index + 1)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-2 py-3" style={{ color: 'black', fontWeight: '600' }}>
                                                    <p >
                                                        {item.dayOrder}
                                                    </p>
                                                </td>
                                                <td className="px-2 py-3 " style={{ color: 'black', fontWeight: '600' }}>
                                                    <p>
                                                        {item.timeOrder}
                                                    </p>
                                                </td>
                                                <td className="px-2 py-3 " style={{ color: 'black', fontWeight: '600' }}>
                                                    <p >
                                                        ${item.totalPrice}.00
                                                    </p>
                                                </td>
                                                <td className="px-2 py-3" style={{ color: 'black', fontWeight: '600' }}>
                                                    <Link to={`/home/history/detail/${item.idOrder}`} >
                                                        <i style={{ color: '#b7472a' }} class="fa-solid fa-circle-info"></i>
                                                    </Link>
                                                </td>

                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                            </div>
                            <div className="justify-content-center d-flex rounded-bottom shadow m-3">
                                {page !== 0 ?
                                    <button className="btn btn-primary" style={{ margin: '5px' }}
                                        onClick={previosPage}
                                    >
                                        Previos
                                    </button> :
                                    <button className="btn btn-primary" disabled style={{ margin: '5px' }}>

                                        Previos
                                    </button>
                                }

                                <div className="text-sm py-2 px-4" style={{
                                    background: '#b7472a',
                                    color: '#ffffff',
                                    margin: '5px',
                                    borderRadius: '5px'
                                }}>
                                    {page + 1}/{historys.totalPages}
                                </div>
                                {page !== historys.totalPages - 1 ?
                                    <button className="btn btn-primary" style={{ margin: '5px' }}
                                        onClick={nextPage}
                                    >
                                        Next
                                    </button> :
                                    <button className="btn btn-primary" disabled style={{ margin: '5px' }}>
                                        Next
                                    </button>
                                }
                            </div>
                        </div>
                        :
                        <table className="min-w-full leading-normal table table-hover " id="myTable">
                            <thead>
                                <tr style={{ background: '#b7472a', color: '#ffffff', borderRadius: '10px' }}>
                                    <th className="px-2 py-3 text-left ">
                                        Number
                                    </th>
                                    <th className="px-2 py-3 text-left ">
                                        Day Order
                                    </th>
                                    <th className="px-2 py-3   text-left ">
                                        Time Order
                                    </th>
                                    <th className="px-2 py-3  text-left">
                                        Total Price
                                    </th>
                                    <th className="px-2 py-3   text-left ">
                                        Function
                                    </th>

                                </tr>
                            </thead>
                            <tbody>
                                <tr style={{ height: '150px' }}>
                                    <td style={{ color: 'red', fontSize: '50px', textAlign: 'center' }} colSpan="9">Không có dữ
                                        liệu
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                    }


                </div>
            </div>
        </>

    )
}

export default History;