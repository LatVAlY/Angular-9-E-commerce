import { Products } from 'src/app/models/products';

export class ShoppingCartItem {
    title: string;
    imageUrl: string;
    price: number;
    quantity: number;
    key: string;


    get totalPrice() {return this.price * this.quantity; }
}
