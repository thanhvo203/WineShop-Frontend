
const add = (wines) => {
    return {
        type:'ADD_TO_CART',
        payload: wines
    }
}

const deleteWines = (wines) => {
    return {
        type: 'DELETE_FROM_CART',
        payload:wines
    }
}
const updateWines = (wines) => {
    return {
        type:'UPDATE',
        payload:wines
    }
}