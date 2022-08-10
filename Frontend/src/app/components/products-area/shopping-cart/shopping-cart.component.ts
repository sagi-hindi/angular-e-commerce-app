import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Unsubscribe } from 'redux';
import { CartItemModel } from 'src/app/models/cart-item.model';
import store from 'src/app/redux/store';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {

  public cartItems:CartItemModel[] = [];
  public unsubscribe:Unsubscribe;
  public totalPrice:number = 0;

  constructor(private cartService:CartService, private router:Router) { }

  async ngOnInit():Promise<void> {
    this.cartItems = await this.cartService.fetchCartItems();
    for(let t in this.cartItems){
      this.totalPrice += this.cartItems[t].totalPrice;
    }

    this.unsubscribe = store.subscribe(() => {
      this.cartItems = store.getState().CartItemsState.cartItems;
      this.totalPrice = 0;
      for(let t in this.cartItems){
        this.totalPrice += this.cartItems[t].totalPrice;
      }  
    })
  }
  ngOnDestroy(): void {
    this.unsubscribe();
  }
  public order():void{
    if(store.getState().CartItemsState.cartItems.length > 0){
    this.router.navigateByUrl("order");
    }
  }

  }


