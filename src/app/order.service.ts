import { Observable } from 'rxjs';
import { ShoppingCartService } from './shopping-cart.service';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase, private shoppingCartService: ShoppingCartService) { }

  async placeOrder(order) {
  const result = await this.db.list('/orders').push(order);
  this.shoppingCartService.clearCart();
  return result;
  }

  getOrder() {
    return this.db.list('/orders/').valueChanges();
  }

  getOrdersByUser(userId: string){
    return this.db.list<any>
    ('/orders', ref =>
        ref.orderByChild('userId')
        .equalTo(userId)).valueChanges();
  }
}

