import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CategoryModel } from '../models/category.model';
import { ProductModel } from '../models/product.model';
import { addProductsAction, fetchProductsAction, updateProductsAction } from '../redux/products-state';
import store from '../redux/store';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }
  
  public async getAllProducts():Promise<ProductModel[]> {
    let products = store.getState().ProductsState.products;
    if(products.length === 0){
       products = await firstValueFrom(this.http.get<ProductModel[]>(environment.productsUrl)); 
        store.dispatch(fetchProductsAction(products));
    }
      return products;
  }

  public async getAllCategories():Promise<CategoryModel[]> {
    const categories = await firstValueFrom(this.http.get<CategoryModel[]>(environment.categoriesUrl));
    return categories;

}

public async getOneProduct(_id:string):Promise<ProductModel> {
  const product = await firstValueFrom(this.http.get<ProductModel>(environment.getOneProductUrl + _id));
  return product;

}


public async addProduct(product:ProductModel):Promise<ProductModel> {
  const formData = new FormData();
  formData.append('categoryId', product.categoryId);
  formData.append('name', product.name);
  formData.append('price', product.price.toString());
  formData.append('image', product.image);
  const addedProduct = await firstValueFrom(this.http.post<ProductModel>(environment.addProductUrl, formData));
  console.log(formData);
  store.dispatch(addProductsAction(addedProduct));
  return addedProduct;
}


public async updateProduct(product:ProductModel):Promise<ProductModel> {
  const formData = new FormData();
  formData.append('_id', product._id);
  formData.append('name', product.name);
  formData.append('price', product.price.toString());
  formData.append('image', product.image);

  const updatedProduct = await firstValueFrom(this.http.put<ProductModel>(environment.updateProductUrl + product._id, formData));
  store.dispatch(updateProductsAction(updatedProduct));
  
  return updatedProduct;


}




}
