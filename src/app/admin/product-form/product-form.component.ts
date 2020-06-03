import { Products } from 'src/app/models/products';
import { map, take } from 'rxjs/operators';
import { ProductService } from './../../product.service';
import { CategoryService } from './../../category.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
    categories$;
    id;
    products;
    form: FormGroup = new FormGroup({});
    @Input('product') product: Products;
    @Input('show-actions') showActions = true;

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private productService: ProductService,
    private fb: FormBuilder,
    private router: Router,
    ) {
    this.categories$ = categoryService.getAll().snapshotChanges();
    const reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
    this.form = fb.group({
      url: ['', [Validators.required, Validators.pattern(reg)]],
      price: ['', [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
      title: ['', Validators.required]

    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) { this.productService.get(id)
      .pipe(take(1))
      .subscribe(p => { this.products = p; });
    }
   }

   get f() {
     return this.form.controls;
   }
   save() {
     if (this.id) {this.productService.update(this.id, this.form.value); }
     else { this.productService.create(this.form.value); }

     this.router.navigate(['/admin/products']);
   }
   delete() {
    if (confirm('Are you sure you want to delete this product')) {

    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']); }

    return;
   }
  ngOnInit(): void {
  }
}
