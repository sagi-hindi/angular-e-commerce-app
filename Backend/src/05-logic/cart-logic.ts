import { CartItemModel } from './../03-models/cart-item-model';
import { CartModel, ICartModel } from '../03-models/cart-model';
import ErrorModel from "../03-models/error-model";
import  {v4 as uuid} from "uuid";
import { ICartItemModel } from '../03-models/cart-item-model';
import { IOrderModel, OrderModel } from '../03-models/order-model';


async function createCart(cart:ICartModel):Promise<ICartModel>{
    const errors = cart.validateSync();
    if(errors) throw new ErrorModel(400, errors.message);
    cart.isOpen = true;
    return CartModel.create(cart);
}
async function getCartItems(cartId:string):Promise<ICartItemModel[]>{
    return CartItemModel.find({cartId}).exec();
}

async function checkOpenCart(userId:string,isOpen:boolean):Promise<ICartModel>{
   let cart = await CartModel.find({userId,isOpen}).exec(); 
   return cart[0];

}

async function addCartItem(cartItem:ICartItemModel):Promise<ICartItemModel>{
    const errors = cartItem.validateSync();
    if(errors) throw new ErrorModel(400, errors.message);
    return CartItemModel.create(cartItem);  
}

async function addOrder(order:IOrderModel):Promise<IOrderModel>{
    const errors = order.validateSync();
    if(errors) throw new ErrorModel(400, errors.message);
    CartModel.findOneAndUpdate({_id:order.cartId},{isOpen:false}).exec();
    return OrderModel.create(order);  
}

async function deleteCartItem(_id:string):Promise<void>{
    const deletedProduct = await CartItemModel.findOneAndDelete({_id}).exec();
    if(!deletedProduct) throw new ErrorModel(404, "Product not found");
}




export default {
    checkOpenCart,
    createCart,
    addCartItem,
    deleteCartItem,
    getCartItems,
    addOrder
}


