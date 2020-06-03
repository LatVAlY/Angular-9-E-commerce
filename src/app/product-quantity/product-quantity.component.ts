import { Products } from 'src/app/models/products';
import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent {
  @Input('product') product: Products;
  @Input('shopping-cart') ShoppingCart;

   constructor(private serviceCart: ShoppingCartService) { }

   addToCart(){
     this.serviceCart.addtoCart(this.product);
   }

   removeFromCart() {
     this.serviceCart.removeFromCart(this.product);
   }
}
