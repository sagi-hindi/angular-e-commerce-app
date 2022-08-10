import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { CategoryModel } from 'src/app/models/category.model';
import { ProductModel } from 'src/app/models/product.model';
import store from 'src/app/redux/store';
import { NavBarService } from 'src/app/services/nav-bar.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  public products: ProductModel[];
  public categories: CategoryModel[];
  public isActive:string = "1";
  public categoryId:string = "1";
  public isAdmin:boolean = false;
  public searchText:string ="";



  constructor(private productService :ProductsService,public nav:NavBarService) { }


  async ngOnInit() {
    this.nav.show();
    let user = store.getState().AuthState.user;
    try{
      if(user.role == "Admin"){
        this.isAdmin = true;
      }
      else{
        this.isAdmin = false;
      }

      this.products = await this.productService.getAllProducts();
      this.categories = await this.productService.getAllCategories();
    }
    catch(err:any){
      alert (err.message);
    }
  }

  public async categoryFilter(event:Event):Promise<void>{
    const category = event.target as HTMLSpanElement;
    this.categoryId = category.id;
  }
  onSearchTextEntered(searchValue:string){
    this.searchText = searchValue
  }
 



  }


