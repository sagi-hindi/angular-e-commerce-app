import { CategoryModel } from './../../../models/category.model';
import { ProductsService } from './../../../services/products.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductModel } from 'src/app/models/product.model';
import { Router, Routes } from '@angular/router';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  public categories:CategoryModel[];
  public product = new ProductModel();
  
  @ViewChild('imageRef') 
  public imageRef:ElementRef<HTMLInputElement>;

  constructor(private ProductsService:ProductsService, private route:Router, private notify:NotifyService) { }

  async ngOnInit():Promise<void> {
    this.categories = await this.ProductsService.getAllCategories();
    console.log(this.categories)

  }

  async addProduct(){
    try{
      this.product.image = this.imageRef.nativeElement.files[0];
      console.log(this.product);
      await this.ProductsService.addProduct(this.product);
      this.notify.success("Product added successfully");
      this.route.navigateByUrl('/products');
    }
    catch(err:any){
      alert(err.message)

    }


  }

}
