import axios from 'axios';
import jwtDecode from 'jwt-decode';
import Swal from 'sweetalert2';

export async function getListWines() {
    const resolve = await axios.get(`http://localhost:8080/wines`)
    return resolve.data;
}

export async function getAllListWines() {
    const resolve = await axios.get(`http://localhost:8080/wines/products`)
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
