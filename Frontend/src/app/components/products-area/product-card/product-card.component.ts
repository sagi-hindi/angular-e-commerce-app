import { Router } from '@angular/router';
import { ProductDialogComponent } from './../product-dialog/product-dialog.component';
import { Component, Input, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/models/product.model';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import store from 'src/app/redux/store';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input() product: ProductModel;
  public imageUrl:string = environment.imageUrl;
  public isAdmin:boolean = false;

  constructor(public popUp: MatDialog, private router:Router,private cartService:CartService) { }

  openPopUp():void{
    const dialogRef = this.popUp.open(ProductDialogComponent,{
      width: '250px',
      height: '200px',
      data: this.product
    }) 

    dialogRef.afterClosed().subscribe(async (result) => {
      if(result){
        await this.cartService.addCartItem(result);
      }  
      else{
        dialogRef.close();
      }  

    })
    
  }
  ngOnInit(): void {
    if(store.getState().AuthState.user.role === "Admin"){
      this.isAdmin = true;
    }
  }
  edit(id:string):void{
    this.router.navigateByUrl(`/products/update/${id}`);

  }
}
