import { switchMap } from 'rxjs/operators';
import { ProductService } from './../../product.service';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Products } from 'src/app/models/products';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  products: Products[];
  filteredProducts: any[];
  subscription: Subscription;
  tableResouce: MatTableDataSource<Products>;
  items: Products[] = [];
  itemCount: number;
  displayedColumns: string[] = ['index', 'title', 'price', 'edit'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;



  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAll()
    .subscribe((products) => {
      this.filteredProducts = this.products = products.map(
        product => {
          return {
            title: product.payload.val()['title'],
            category: product.payload.val()['category'],
            url: product.payload.val()['url'],
            price: product.payload.val()['price'],
            key: product.key
          } as Products;
        });
      this.tableResouce = new MatTableDataSource(this.products);
      this.tableResouce.paginator = this.paginator;
      this.tableResouce.sort = this.sort;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  ngOnInit(): void {

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tableResouce.filter = filterValue.trim().toLowerCase();

    if (this.tableResouce.paginator) {
      this.tableResouce.paginator.firstPage();
    }
  }
}
