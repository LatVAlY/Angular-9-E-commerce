import { ShoppingCartService } from './../shopping-cart.service';
import { Products } from 'src/app/models/products';
import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent  {
 @Input('product') product: Products;
 @Input('show-actions') showActions = true;
 @Input('shopping-cart') ShoppingCart: ShoppingCart;

  constructor(private serviceCart: ShoppingCartService) { }

  addToCart(){
    this.serviceCart.addtoCart(this.product);
  }

  getQuantity() {
    if (!this.ShoppingCart){return 0; }
    const item = this.ShoppingCart.itemsMap[this.product.key];
    return item ? item.quantity : 0;
  }
}
