import { Products } from 'src/app/models/products';
import { ShoppingCart } from './../models/shopping-cart';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-shopping-cart-summery',
  templateUrl: './shopping-cart-summery.component.html',
  styleUrls: ['./shopping-cart-summery.component.css']
})
export class ShoppingCartSummeryComponent implements OnInit {
  @Input('cart') cart: ShoppingCart;

  ngOnInit() {
  }


}
