import { ReceiptComponent } from './../receipt/receipt.component';
import { MatDialog } from '@angular/material/dialog';
import { jsPDF } from 'jspdf';
import { UserModel } from './../../../models/user.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CartItemModel } from 'src/app/models/cart-item.model';
import { ProductModel } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';
import store from 'src/app/redux/store';
import { CartService } from 'src/app/services/cart.service';
import { OrderModel } from 'src/app/models/order.model';
import { NotifyService } from 'src/app/services/notify.service';
import { Router } from '@angular/router';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  public cartItems:CartItemModel[] = [];
  public user:UserModel;
  public totalPrice:number = 0;
  @ViewChild("cartItem", {static: false}) cartItem: ElementRef;

  public orderForm:FormGroup;
  public cityControl:FormControl;
  public streetControl:FormControl;
  public dateControl:FormControl;
  public creditCardControl: FormControl;
  public todayDate = new Date().toISOString().slice(0, 10);



  constructor(private notify:NotifyService, private productService :ProductsService,private cartService:CartService,private router:Router, private matDialog:MatDialog) { }

  async ngOnInit():Promise<void> {
    this.cartItems = await this.cartService.fetchCartItems();
    this.user = store.getState().AuthState.user;
    for(let t in this.cartItems){
      this.totalPrice += this.cartItems[t].totalPrice;
    }  
    
    this.cityControl = new FormControl("",[Validators.required, Validators.minLength(3)]);
    this.streetControl = new FormControl("",Validators.required);
    this.dateControl = new FormControl("",Validators.required);
    this.creditCardControl = new FormControl("",[Validators.required,Validators.pattern('^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$')]);
    this.orderForm = new FormGroup({
      city: this.cityControl,
      street: this.streetControl,
      date: this.dateControl,
      creditCard: this.creditCardControl

    })
  }
  downloadPdf(){
    let pdf = new jsPDF("p", "mm", "a4")
    html2canvas(this.cartItem.nativeElement).then(canvas =>{
      let imgData = canvas.toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', 10, 10, 200, 200);
      pdf.save("receipt.pdf");
    })
    store.getState().CartItemsState.cart = undefined;

  }



  doubleClick(event:Event){
    const input = event.target as HTMLInputElement;
    switch(input.name) {
      case "city":
        this.orderForm.get("city").setValue(this.user.city);
        break;
      case "street":
        this.orderForm.get("street").setValue(this.user.street);
      break;
    }
  }

  async sendOrder(){
    try{
      const cart = await this.cartService.createCart()
      const date = new Date().toISOString().slice(0, 10);
      const fourLastNumbers = String(this.orderForm.value.creditCard).slice(String(this.orderForm.value.creditCard).length-4);
      const order = new OrderModel(cart._id,this.totalPrice,this.orderForm.value.city,this.orderForm.value.street,
      this.orderForm.value.date,date,Number(fourLastNumbers));
      await this.cartService.addNewOrder(order);
      this.openDialog();
      store.getState().CartItemsState.cartItems = [];
      store.getState().CartItemsState.cart = undefined;

      
      // this.router.navigateByUrl("/products")
      // this.notify.success("Order sent successfully");

    }
    catch(err:any){
      this.notify.error(err.message);
    }
  }

  openDialog(){
    let dialogRef = this.matDialog.open(ReceiptComponent,{
      width: "500px",
      height: "300px",
    })
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.downloadPdf();
        this.router.navigateByUrl("/products")
      }
    })
  }
  
  
}
