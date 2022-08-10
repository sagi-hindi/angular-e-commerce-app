import { ICategoryModel } from '../03-models/category-model';
import ErrorModel from "../03-models/error-model";
import { IProductModel, ProductModel } from "../03-models/product-model";
import  {v4 as uuid} from "uuid";
import { CategoryModel } from "../03-models/category-model";
import path from 'path';

async function getAllProducts():Promise<IProductModel[]>{
    return ProductModel.find({}).exec();
}

async function getAllCategories():Promise<ICategoryModel[]>{
    return CategoryModel.find({}).exec();
}

async function getProductsByCategory(categoryId:string):Promise<IProductModel[]>{
    return ProductModel.find({categoryId}).exec();
}

async function addProduct(product:IProductModel):Promise<IProductModel>{
    if(product.image){
    const extension = product.image.name.substring(product.image.name.lastIndexOf("."))    
    product.imageName = uuid() + extension;
    await product.image.mv(path.join(__dirname, "..", "assets", "images", product.imageName));
    product.image = undefined;
    const errors = product.validateSync();
    if(errors) throw new ErrorModel(400, errors.message);
    }
    return ProductModel.create(product);

}

async function updateProduct(product:IProductModel):Promise<IProductModel>{
    const errors = product.validateSync();
    if(errors) throw new ErrorModel(400, errors.message);
    if(product.image){
        const extension = product.image.name.substring(product.image.name.lastIndexOf("."))    
        product.imageName = uuid() + extension;
        await product.image.mv("./src/assets/images/" + product.imageName);
        product.image = undefined;
    }
    const updatedProduct = await ProductModel.findByIdAndUpdate(product._id, product, {returnOriginal:false}).exec();
    if(!updatedProduct) throw new ErrorModel(404, "Product not found");
    return updatedProduct;
}

async function deleteProduct(_id:string):Promise<void>{
    const deletedProduct = await ProductModel.findByIdAndDelete(_id).exec();
    if(!deletedProduct) throw new ErrorModel(404, "Product not found");
}

async function getOneProduct(_id:string):Promise<IProductModel>{
    const product = await ProductModel.findById(_id).exec();
    if(!product) throw new ErrorModel(404, "Product not found");
    return product;
}


export default {
    getAllProducts,
    getProductsByCategory,
    addProduct,
    updateProduct,
    deleteProduct,
    getAllCategories,
    getOneProduct
};

