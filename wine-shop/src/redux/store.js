import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import cartReducer from './reducer';
import cartSaga from './saga';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(cartReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(cartSaga);

export default store;