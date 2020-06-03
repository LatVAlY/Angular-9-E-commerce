import { ShoppingCart } from './models/shopping-cart';
import { take, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Products } from 'src/app/models/products';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  async addtoCart(product: Products) {
    this.updateItem(product, 1);
  }
  async removeFromCart(product: Products) {
    this.updateItem(product, -1);
  }

  async getCart(): Promise<Observable<ShoppingCart>> {
    const cartId = await this.getCreatCartId();
    return this.db.object<Products>('/shopping-carts/' + cartId)
    .snapshotChanges()
    .pipe(map((x: any) => {
      {
       const items = x.payload.val().items;
       return new ShoppingCart(items);
      }
    }));
   }

   async clearCart() {
     const cartId = await this.getCreatCartId();
     return this.db.object('/shopping-carts/' + cartId + '/items/').remove();
   }
  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getCreatCartId(): Promise<string> {
    const cartId = localStorage.getItem('cartId');
    if (cartId) { return cartId; }
    else {
      const result = await this.create();
      localStorage.setItem('cartId', result.key);
      return result.key;
    }
  }
 
  private async updateItem(product: Products, change: number) {
    let cartId = await this.getCreatCartId();
    let item$ = this.getItem(cartId, product.key);
    item$.snapshotChanges().pipe(take(1)).subscribe((item: any) => {
      if (item.payload.val())
       { item$.update({ quantity: item.payload.val().quantity + change});
         if (item.payload.val().quantity + change === 0) {item$.remove(); } }
      else { item$.set({
        title: product.title,
        imageUrl: product.url,
        price: product.price,
        quantity: 1 }); }
    });
  }
}
