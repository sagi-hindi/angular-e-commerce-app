import { Component, OnInit, Input } from '@angular/core';
import { CartItemModel } from 'src/app/models/cart-item.model';
import { ProductModel } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {
  
  @Input() item: CartItemModel;
  public product: ProductModel;
  public imageUrl:string = environment.imageUrl;


  constructor(private productsService:ProductsService,private cartService:CartService) { }

  async ngOnInit():Promise<void> {
    this.product = await this.productsService.getOneProduct(this.item.productId)

  }

  async deleteItem(id:string){
    await this.cartService.deleteCartItem(id)
  }

}
