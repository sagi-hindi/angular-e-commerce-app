import { AddProductComponent } from './components/products-area/add-product/add-product.component';
import { OrderComponent } from './components/order-area/order/order.component';
import { ShoppingCartComponent } from './components/products-area/shopping-cart/shopping-cart.component';
import { UpdateProductComponent } from './components/products-area/update-product/update-product.component';
import { AboutComponent } from './components/about-area/about/about.component';
import { ProductListComponent } from './components/products-area/product-list/product-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home-area/home/home.component';
import { RegisterComponent } from './components/auth-area/register/register.component';
import { LoginComponent } from './components/auth-area/login/login.component';
import { LogoutComponent } from './components/auth-area/logout/logout.component';
import { AuthGuard } from './services/auth.guard';
import { ReceiptComponent } from './components/order-area/receipt/receipt.component';

const routes: Routes = [
  {path:"home", component: HomeComponent},
  {path:"products", component: ProductListComponent, canActivate: [AuthGuard]},
  {path:"about", component: AboutComponent},
  {path:"register", component: RegisterComponent},
  {path:"login", component: LoginComponent},
  {path:"logout", component: LogoutComponent},
  {path:"add-product", component: AddProductComponent},
  {path:"products/update/:id", component: UpdateProductComponent},
  {path:"order", component: OrderComponent},
  {path:"cart", component: ShoppingCartComponent},
  {path:"", redirectTo:"home", pathMatch:"full"},
  {path:"invoice", component: ReceiptComponent},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
