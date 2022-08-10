import { CartItemModel } from "../models/cart-item.model"
import { CartModel } from "../models/cart.model";

// products state - products data needed in the application level
export class CartItemsState{
    public cartItems: CartItemModel[] = [];
    public cart: CartModel = null;
    
}

//products action type - any action which can be done on the above products state:
export enum CartItemsActionType{
    getCart = "getCart",
    FetchCartItems = "FetchCartItems",
    CreateCart = "CreateCart",
    AddCartItem = "AddCartItem",
    DeleteCartItem = "DeleteCartItem",
}

export interface CartItemsAction{
    type: CartItemsActionType;
    payload: any;
}

export function fetchCartItemsAction(cartItems: CartItemModel[]): CartItemsAction{
    return {type: CartItemsActionType.FetchCartItems, payload: cartItems}
}

export function addCartAction(cart: CartModel): CartItemsAction{
    return {type: CartItemsActionType.CreateCart, payload: cart}

}
export function addCartItemAction(CartItem: CartItemModel): CartItemsAction{
    return {type: CartItemsActionType.AddCartItem, payload: CartItem}
}

export function deleteCartItemAction(id: string): CartItemsAction{
    return {type: CartItemsActionType.DeleteCartItem, payload: id}

}

export function cartReducer(currentState = new CartItemsState(),  action: CartItemsAction): CartItemsState{

    const newState = {...currentState};
    switch(action.type){
        case CartItemsActionType.FetchCartItems:
            newState.cartItems = action.payload;
            break;
        case CartItemsActionType.CreateCart:
            newState.cart = action.payload;
            break;
        case CartItemsActionType.AddCartItem:
            newState.cartItems.push(action.payload)
        break;
        case CartItemsActionType.DeleteCartItem:
        const indexToDelete = newState.cartItems.findIndex(p =>  p._id === action.payload)
        if(indexToDelete >= 0){
              newState.cartItems.splice(indexToDelete, 1)
            }
        break;
    }

    return newState

}