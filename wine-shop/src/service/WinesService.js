import axios from 'axios';
import jwtDecode from 'jwt-decode';
import Swal from 'sweetalert2';

export async function getListWines() {
    const resolve = await axios.get(`http://localhost:8080/wines`)
    return resolve.data;
}
export async function getCustomerByIdAccount(idAccount) {
    const resolve = await axios.get(`http://localhost:8080/wines/customer/${idAccount}`)
    return resolve.data;
}
export async function getLargestPrice() {
    const resolve = await axios.get(`http://localhost:8080/wines/largest-price`)
    return resolve.data;
}

export async function getAllListWines(page, firstAlcohol, lastAlcohol, color, flavor, country, nameType, nameWines, minPrice, maxPrice) {
    const resolve = await axios.get(`http://localhost:8080/wines/products?page=${page}&&firstAlcohol=${firstAlcohol}&&lastAlcohol=${lastAlcohol}&&color=${color}&&flavor=${flavor}&&country=${country}&&nameType=${nameType}&&nameWines=${nameWines}&&minPrice=${minPrice}&&maxPrice=${maxPrice}`)
    return resolve.data;
}
export async function getWinesById(id) {
    const resolve = await axios.get(`http://localhost:8080/wines/detail-product/${id}`)
    return resolve.data;
}
export async function loginByEmailAndPassword(request) {
    try {
        const resolve = await axios.post(`http://localhost:8080/wines/api/v1/auth/authenticate`, request)
        return resolve.data;
    } catch (error) {
        Swal.fire({
            icon: 'error',
            timer: 2000,
            title: 'Email or Password incorrect'
        })
    }


}

export const addJwtTokentoLocalStore = (token) => {
    localStorage.setItem("Jwt", token);
}
export const inforFromToken = () => {
    const token = localStorage.getItem("Jwt")
    if (token) {
        const data = jwtDecode(token);
        return data;
    } else {
        return null;
    }
}
export async function listCart(id) {
    const resolve = await axios.get(`http://localhost:8080/wines/cart/list/${id}`)
    return resolve.data;
}
export async function addToCart(quantity, idCustomer, idWines) {
    const resolve = await axios.post(`http://localhost:8080/wines/cart/add/${quantity}/${idCustomer}/${idWines}`)
    return resolve.data;
}
export async function deleteFromCart(idWines, idCustomer) {
    const resolve = await axios.delete(`http://localhost:8080/wines/cart/delete/${idWines}?idCustomer=${idCustomer}`)
    return resolve.data;
}
export async function updateCart(idCart, newQuantity, idWines, idCustomer) {
    const resolve = await axios.patch(`http://localhost:8080/wines/cart/update/${idCart}?newQuantity=${newQuantity}&&idWines=${idWines}&&idCustomer=${idCustomer}`)
    return resolve.data;
}
export async function addOrder(idCustomer, totalPrice) {
    const resolve = await axios.post(`http://localhost:8080/wines/order/add?idCustomer=${idCustomer}&&totalPrice=${totalPrice}`)
    return resolve.data;
}
export async function addOrderDetail(currentPrice, quality, idOrder, idWines) {
    const resolve = await axios.post(`http://localhost:8080/wines/order-detail/add?currentPrice=${currentPrice}&&quality=${quality}&&idOrder=${idOrder}&&idWines=${idWines}`)
    return resolve.data;
}
export async function updateQuantityWines(newQuantity, idWines) {
    const resolve = await axios.patch(`http://localhost:8080/wines/update-quantity?newQuantity=${newQuantity}&&idWines=${idWines}`)
    return resolve.data;
}
export async function getListHistory(idCustomer, page, startDate, endDate) {
    const resolve = await axios.get(`http://localhost:8080/wines/order/history/${idCustomer}?page=${page}&&startDate=${startDate}&&endDate=${endDate}`)
    return resolve.data;
}

export async function getListDetailHistory(id) {
    const resolve = await axios.get(`http://localhost:8080/wines/order-detail/detail-history?id=${id}`)
    return resolve.data;
}