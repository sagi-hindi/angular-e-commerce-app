import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CartItemModel } from '../models/cart-item.model';
import { CartModel } from '../models/cart.model';
import { OrderModel } from '../models/order.model';
import { addCartAction, addCartItemAction, deleteCartItemAction, fetchCartItemsAction } from '../redux/cart-state';
import store from '../redux/store';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }
  
  public async createCart():Promise<CartModel> {
    let openCart = await firstValueFrom(this.http.post<CartModel>(environment.checkCartUrl, store.getState().AuthState.user._id));
    if(!openCart){
    const userId = store.getState().AuthState.user._id;
     const cart = await firstValueFrom(this.http.post<CartModel>(environment.createCart, userId)); 
     store.dispatch(addCartAction(cart))
     return openCart;
    }
    store.dispatch(addCartAction(openCart))
    return openCart;
  }
  
  public async fetchCartItems():Promise<CartItemModel[]> {
    let cartItems = store.getState().CartItemsState.cartItems
    if(cartItems.length <= 0){
      cartItems = await firstValueFrom(this.http.get<CartItemModel[]>(environment.getCartItems)); 
      store.dispatch(fetchCartItemsAction(cartItems));
      return cartItems;
    }
      return cartItems;
  }

  public async addCartItem(cartItem:CartItemModel):Promise<CartItemModel> {
      const openCart = await firstValueFrom(this.http.post<CartModel>(environment.checkCartUrl, store.getState().AuthState.user._id));
    let cart
    if(!openCart){
       cart = await this.createCart()
       cartItem.cartId = cart._id
       const addedCartItem = await firstValueFrom(this.http.post<CartItemModel>(environment.addCartItem, cartItem));
       store.dispatch(addCartItemAction(addedCartItem))
       return addedCartItem;
    }
    else{
      cartItem.cartId = openCart._id
      const addedCartItem = await firstValueFrom(this.http.post<CartItemModel>(environment.addCartItem, cartItem));
      store.dispatch(addCartItemAction(addedCartItem))
      return addedCartItem;
    }
}

public async deleteCartItem(id:string):Promise<void> {
   await firstValueFrom(this.http.delete<void>(environment.deleteCarItemUrl + id));
    store.dispatch(deleteCartItemAction(id));

}

public async addNewOrder(order:OrderModel):Promise<void> {
  const addedOrder = await firstValueFrom(this.http.post<void>(environment.addOrderUrl, order));
  return addedOrder;

}

}