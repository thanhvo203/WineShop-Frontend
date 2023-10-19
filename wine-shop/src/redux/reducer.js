const initialState = {
  cartItems: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SUCCESS':
      console.log(action.payload);
      return {
        cartItems: action.payload,
      }
    default:
      return state;
  }
};
export default cartReducer;