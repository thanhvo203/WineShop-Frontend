const initialState = {
    cartItems: [],
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_TO_CART':
        return {
          ...state,
          cartItems: [...state.cartItems, action.payload],
        };
      case 'DELETE_FROM_CART':
        return {
          ...state,
          cartItems: state.cartItems.filter((item) => item !== action.payload),
        };
      case 'UPDATE':
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.id === action.payload.id ? action.payload : item
          ),
        };
      default:
        return state;
    }
  };
  
  export default reducer;