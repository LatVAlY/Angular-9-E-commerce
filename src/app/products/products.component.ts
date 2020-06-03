import { Subscription } from 'rxjs';
import { ShoppingCartService } from './../shopping-cart.service';
import { Products } from 'src/app/models/products';
import { ProductService } from './../product.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Products[] = [];
  filteredProducts: Products[] = [];
  category: string;
  cart: any;
  subscription: Subscription;
  @Input('product') product;
  @Input('shopping-cart') ShoppingCart;

  constructor(
    route: ActivatedRoute,
    productService: ProductService,
    private serviceCart: ShoppingCartService
    ) {
    productService.getAll().subscribe(
      products => {this.products = products.map(
          product => {
            return {
              title: product.payload.val()['title'],
              category: product.payload.val()['category'],
              url: product.payload.val()['url'],
              price: product.payload.val()['price'],
              key: product.key
            } as Products;
          });
                   route.queryParamMap.subscribe(params => {
          this.category = params.get('category');

          this.filteredProducts = (this.category) ?
          this.products.filter(p => p.category === this.category) :
          this.products;
      });
    });
  }
  async ngOnInit() {
    this.subscription = (await this.serviceCart.getCart())
    .subscribe(cart => this.cart = cart);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
