import axios from 'axios';

export async function getListWines () {
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
