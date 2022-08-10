import { Component, OnInit } from '@angular/core';
import { CategoryModel } from 'src/app/models/category.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  public categories: CategoryModel[];

  constructor(private productService :ProductsService) { }

  async ngOnInit() {
    try{
      this.categories = await this.productService.getAllCategories();
      console.log(this.categories)

    }
    catch(err:any){
      alert (err.message);
    }
    
  }

}
