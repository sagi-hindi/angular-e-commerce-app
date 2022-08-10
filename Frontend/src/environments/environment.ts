// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  productsUrl: "http://localhost:3001/api/products",
  addProductUrl: "http://localhost:3001/api/addProduct",
  updateProductUrl: "http://localhost:3001/api/products/",
  getProductByCategoryUrl: "http://localhost:3001/api/products/",
  imageUrl: "http://localhost:3001/api/products/images/",
  categoriesUrl: "http://localhost:3001/api/categories/",
  registerUrl:"http://localhost:3001/api/auth/register",
  loginUrl:"http://localhost:3001/api/auth/login",
  checkUrl:"http://localhost:3001/api/auth/check",
  getOneProductUrl: "http://localhost:3001/api/product/",
  createCart:"http://localhost:3001/api/cart",
  addCartItem:"http://localhost:3001/api/addCartItem",
  getCartItems:"http://localhost:3001/api/cartItems/",
  checkCartUrl:"http://localhost:3001/api/checkCart",
  deleteCarItemUrl:"http://localhost:3001/api/cartItem/",
  addOrderUrl:"http://localhost:3001/api/addOrder/",


  




  

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
