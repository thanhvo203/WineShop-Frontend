import { call, put, takeEvery } from 'redux-saga/effects';
import { addToCart, listCart } from '../service/WinesService';
import axios from 'axios';


function* getList(action) {
  try{
    const id = action.payload
    const response = yield listCart(id);

    yield put({type: 'SUCCESS' , payload: response});
  }catch (error) {
    yield put({type: 'FAILED' ,payload:error.message});
  }
}

function* cartSaga() {
  // yield takeEvery('ADD_TO_CART', addToCartSaga);
  yield takeEvery('GET_LIST', getList)

}

export default cartSaga;