import axios from 'axios';
import jwtDecode from 'jwt-decode';
import Swal from 'sweetalert2';

export async function getListWines() {
    const resolve = await axios.get(`http://localhost:8080/wines`)
    return resolve.data;
}

export async function getAllListWines(firstAlcohol,lastAlcohol,color,flavor,country,idType) {
    const resolve = await axios.get(`http://localhost:8080/wines/products?firstAlcohol=${firstAlcohol}&&lastAlcohol=${lastAlcohol}&&color=${color}&&flavor=${flavor}&&country=${country}&&idType=${idType}`)
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
    } catch(error) {
        Swal.fire({
            icon:'error',
            timer:2000,
            title:'Email or Password incorrect'
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
    const resolve = await axios.get(`http://localhost:8080/wines/cart/list?id=${id}`)
    return resolve.data;
}
export async function addToCart(quantity,idCustomer,idWines) {
    const resolve = await axios.post(`http://localhost:8080/wines/cart/add?quantity=${quantity}&&idCustomer=${idCustomer}&&idWines=${idWines}`)
    return resolve.data;
}
export async function deleteFromCart(idWines) {
    const resolve = await axios.patch(`http://localhost:8080/wines/cart/delete/${idWines}`)
    return resolve.data;
}

