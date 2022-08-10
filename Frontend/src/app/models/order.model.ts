export class OrderModel {
    _id:string;
    cartId: string;
    totalPrice: number;
    cityToDelivery: string;
    streetToDelivery: string;
    deliveryDate: string;
    orderDate:string;
    fourDigitCode:number;
    constructor(cartId: string, totalPrice: number, cityToDelivery: string, streetToDelivery: string, deliveryDate: string, orderDate:string, fourDigitCode:number) {
        this.cartId = cartId;
        this.totalPrice = totalPrice;
        this.cityToDelivery = cityToDelivery;
        this.streetToDelivery = streetToDelivery;
        this.deliveryDate = deliveryDate;
        this.orderDate = orderDate;
        this.fourDigitCode = fourDigitCode;
    }
    }