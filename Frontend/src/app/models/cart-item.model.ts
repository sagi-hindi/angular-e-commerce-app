export class CartItemModel {
    _id?: string | undefined;
    name: string;
    totalPrice: number;
    quantity: number;
    productId: string;
    cartId: string | null;;
    constructor(name: string, totalPrice: number, quantity: number, productId: string, cartId?: string) {
        this.name = name;
        this.totalPrice = totalPrice;
        this.quantity = quantity;
        this.productId = productId;
        this.cartId = cartId;
    }
    }