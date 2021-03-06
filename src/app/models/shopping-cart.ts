import { Products } from 'src/app/models/products';
import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart {
    items: ShoppingCartItem[] = [];

constructor(public itemsMap: { [productId: string]: ShoppingCartItem }) {
    this.itemsMap = itemsMap || {};
    // tslint:disable-next-line: forin
    for (let productId in itemsMap) {
        let item = itemsMap[productId];
        let x = new ShoppingCartItem();
        Object.assign(x, item);
        x.key = productId;
        this.items.push(x);
      }
}
getQuantity(product: Products) {

    const item = this.itemsMap[product.key];
    return item ? item.quantity : 0;
  }
get totalPrice() {
    let sum = 0;
    // tslint:disable-next-line: forin
    for (const productId in this.items) {
        sum += this.items[productId].totalPrice;
    }
    return sum;
}

    get totalItemsCount() {
        let count = 0;
        // tslint:disable-next-line: forin
        for (const productId in this.itemsMap) {
            count += this.itemsMap[productId].quantity;
        }
        return count;
    }
}
