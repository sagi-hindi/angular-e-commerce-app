import { combineReducers, createStore } from "redux";
import { authReducer } from "./auth-state";
import { cartReducer } from "./cart-state";
import { productsReducer } from "./products-state";


const reducers = combineReducers({
    ProductsState: productsReducer,
    AuthState: authReducer,
    CartItemsState:cartReducer,
});

const store = createStore(reducers);

export default store;