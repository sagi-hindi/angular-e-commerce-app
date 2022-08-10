import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { LayoutComponent } from './components/layout-area/layout/layout.component';
import { HeaderComponent } from './components/layout-area/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FooterComponent } from './components/layout-area/footer/footer.component';
import { ProductListComponent } from './components/products-area/product-list/product-list.component';
import { AboutComponent } from './components/about-area/about/about.component';
import { HomeComponent } from './components/home-area/home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProductCardComponent } from './components/products-area/product-card/product-card.component';
import { CategoriesComponent } from './components/products-area/categories/categories.component';
import { ProductDialogComponent } from './components/products-area/product-dialog/product-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './components/auth-area/register/register.component';
import { LoginComponent } from './components/auth-area/login/login.component';
import { LogoutComponent } from './components/auth-area/logout/logout.component';
import { AuthMenuComponent } from './components/auth-area/auth-menu/auth-menu.component';
import { JwtInterceptor } from './services/jwt.interceptor';
import { UpdateProductComponent } from './components/products-area/update-product/update-product.component';
import { ShoppingCartComponent } from './components/products-area/shopping-cart/shopping-cart.component';
import { CartItemComponent } from './components/products-area/cart-item/cart-item.component';
import { OrderComponent } from './components/order-area/order/order.component';
import { OrderItemsComponent } from './components/order-area/order-items/order-items.component';
import { AddProductComponent } from './components/products-area/add-product/add-product.component';
import { ReceiptComponent } from './components/order-area/receipt/receipt.component';
import { SearchProductsComponent } from './components/products-area/search-products/search-products.component';




@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    ProductListComponent,
    AboutComponent,
    HomeComponent,
    ProductCardComponent,
    CategoriesComponent,
    ProductDialogComponent,
    RegisterComponent,
    LoginComponent,
    LogoutComponent,
    AuthMenuComponent,
    UpdateProductComponent,
    ShoppingCartComponent,
    CartItemComponent,
    OrderComponent,
    OrderItemsComponent,
    AddProductComponent,
    ReceiptComponent,
    SearchProductsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [{
    useClass: JwtInterceptor,
    provide: HTTP_INTERCEPTORS,
    multi: true
  }],
  bootstrap: [LayoutComponent]
})
export class AppModule { }
