import { CartModel } from './../03-models/cart-model';
import express, { NextFunction, Request, Response } from "express";
import logic from "../05-logic/cart-logic";
import { CartItemModel } from '../03-models/cart-item-model';
import cyber from '../01-utils/cyber';
import { OrderModel } from '../03-models/order-model';
import path from 'path';

const router = express.Router();

// DONT FORGET TO WRITE THE CORRECT PATH


router.get("/cartItems", async (request: Request, response: Response, next: NextFunction) => {
    try {
        let user = cyber.getUserFromToken(request.headers.authorization);
        let isOpen = true
        const cart = await logic.checkOpenCart(user._id, isOpen);
        if(!cart){
            const newCart = new CartModel()
            newCart.userId = user._id
            const date = new Date().toISOString().slice(0, 10);
            newCart.date = date
            newCart.isOpen = true
            await logic.createCart(newCart);
            const cartItems = await logic.getCartItems(newCart._id);
            response.json(cartItems);  
        }
        else{
            const cartItems = await logic.getCartItems(cart._id);
            response.json(cartItems);
        }
    }
    catch (err: any) {
        next(err);
    }
});

router.post("/cart", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const cart = new CartModel();
        let user = cyber.getUserFromToken(request.headers.authorization);
        cart.userId = user._id;
        const date = new Date().toISOString().slice(0, 10);
        cart.date = date;

        const addedCart = await logic.createCart(cart);
        response.status(201).json(addedCart);
        
    }
    catch (err: any) {
        next(err);
    }
});

router.post("/checkCart", async (request: Request, response: Response, next: NextFunction) => {
    try {
        let user = cyber.getUserFromToken(request.headers.authorization);
        let isOpen = true;
        const cart = await logic.checkOpenCart(user._id, isOpen);
        response.json(cart);
        
    }
    catch (err: any) {
        next(err);
    }
});

router.post("/addCartItem", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const cartItem = new CartItemModel(request.body)  ;
        const addedCartItem = await logic.addCartItem(cartItem);
        response.status(201).json(addedCartItem);
    }
    catch (err: any) {
        next(err);
    }
});

router.post("/addOrder", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const order = new OrderModel(request.body)  ;

        const addedCartItem = await logic.addOrder(order);
        response.status(201).json(addedCartItem);
    }
    catch (err: any) {
        next(err);
    }
});


router.delete("/cartItem/:productId", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const _id = request.params.productId;
        await logic.deleteCartItem(_id);
        response.sendStatus(204);
        
    }
    catch (err: any) {
        next(err);
    }
});


export default router;