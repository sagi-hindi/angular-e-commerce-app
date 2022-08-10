import { ProductModel } from 'src/app/models/product.model';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CartItemModel } from 'src/app/models/cart-item.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.css']
})
export class ProductDialogComponent implements OnInit {

  public quantity:number;
  public cartItem:CartItemModel;

  constructor(public dialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductModel, private cartService:CartService) { }

  ngOnInit(): void {
  }

  async handleDialog(event:Event):Promise<void>{
    let cart = await this.cartService.createCart();
    this.cartItem = new CartItemModel(this.data.name,this.data.price * this.quantity,this.quantity,this.data._id, cart._id);
    this.dialogRef.close(this.cartItem);
}

// ngOnDestroy(): void {
//   this.dialogRef.close(this.data);
// }


closeDialog(){
  this.dialogRef.close();
}

}