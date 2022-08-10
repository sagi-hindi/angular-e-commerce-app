import { environment } from 'src/environments/environment';
import { Component, Input, OnInit } from '@angular/core';
import { CartItemModel } from 'src/app/models/cart-item.model';
import { ProductModel } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html',
  styleUrls: ['./order-items.component.css']
})
export class OrderItemsComponent implements OnInit {

  @Input() item: CartItemModel;
  public product: ProductModel;
  public imageUrl:string = environment.imageUrl;

  constructor(private productsService:ProductsService,private cartService:CartService) { }

  async ngOnInit():Promise <void> {
    if(this.item){
    this.product = await this.productsService.getOneProduct(this.item?.productId)
  }
}

}
