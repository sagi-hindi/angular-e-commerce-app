import { NotifyService } from './../../../services/notify.service';
import { ProductsService } from 'src/app/services/products.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductModel } from 'src/app/models/product.model';
import store from 'src/app/redux/store';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  private product:ProductModel;
  

  public updateForm:FormGroup;
  public nameInput:FormControl;
  public priceInput:FormControl;
  public imageInput:FormControl;
  
  @ViewChild('imageBox') 
  public imageBoxRef:ElementRef<HTMLInputElement>;


  constructor(private activatedRoute:ActivatedRoute, private ProductsService:ProductsService, private notify:NotifyService, private router:Router) { }

  async ngOnInit() {
    const id = this.activatedRoute.snapshot.params["id"];
    this.product = await this.ProductsService.getOneProduct(id);

    this.nameInput = new FormControl(this.product.name);
    this.priceInput = new FormControl(this.product.price);
    this.imageInput = new FormControl();
    this.updateForm = new FormGroup({
      nameInput: this.nameInput,
      priceInput: this.priceInput,
      imageInput: this.imageInput
    });
  }

  async update(){
    this.product.name = this.nameInput.value;
    this.product.price = this.priceInput.value;
    this.product.image = this.imageBoxRef.nativeElement.files[0];

    const products = store.getState().ProductsState.products;
    const updatedProduct = await this.ProductsService.updateProduct(this.product);

    this.notify.success("Product updated successfully");

    this.router.navigateByUrl("/products");
  
    


  }

}
