import { ProductModel } from "../models/product.model";

// products state - products data needed in the application level
export class ProductsState{
    public products: ProductModel[] = [];
}

//products action type - any action which can be done on the above products state:
export enum ProductsActionType{
    FetchProducts = "FetchProducts",
    AddProducts = "AddProducts",
    UpdateProducts = "UpdateProducts",
    DeleteProducts = "DeleteProducts",
}

export interface ProductsAction{
    type: ProductsActionType;
    payload: any;
}

export function fetchProductsAction(products: ProductModel[]): ProductsAction{
    return {type: ProductsActionType.FetchProducts, payload: products}

}
export function addProductsAction(product: ProductModel): ProductsAction{
    return {type: ProductsActionType.AddProducts, payload: product}

}

export function updateProductsAction(product: ProductModel): ProductsAction{
    return{type: ProductsActionType.UpdateProducts, payload:product}

}

export function deleteProductsAction(id: number): ProductsAction{
    return {type: ProductsActionType.DeleteProducts, payload: id}

}

export function productsReducer(currentState = new ProductsState(),  action: ProductsAction): ProductsState{

    const newState = {...currentState};
    switch(action.type){
        case ProductsActionType.FetchProducts:
            newState.products = action.payload;
            break;
        case ProductsActionType.AddProducts:
            newState.products.push(action.payload)
        break;
        case ProductsActionType.UpdateProducts:
            const indexToUpdate = newState.products.findIndex(p => p._id === action.payload._id)
            if(indexToUpdate >= 0) {
            newState.products[indexToUpdate] = action.payload;
            }
        break;
        case ProductsActionType.DeleteProducts:
        const indexToDelete = newState.products.findIndex(p => p._id === action.payload.id)
        if(indexToDelete >= 0){
              newState.products.splice(indexToDelete, 1)
            }
        break;
    }

    return newState

}