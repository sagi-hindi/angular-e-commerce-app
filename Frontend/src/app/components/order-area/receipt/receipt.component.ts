import { CartItemModel } from './../../../models/cart-item.model';
import { Component, Inject, OnInit, ElementRef } from '@angular/core';
import store from 'src/app/redux/store';

import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';


@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent implements OnInit {
  public invoice:any;
  public cartItems:CartItemModel[];

  constructor(private matDialogRef:MatDialogRef<ReceiptComponent>,private route:Router) { }

  ngOnInit(): void {
  }

  close(){
    this.matDialogRef.close(false);
    this.route.navigateByUrl('/products'); 
  }
  download(){
    this.matDialogRef.close(true);
  }


}

