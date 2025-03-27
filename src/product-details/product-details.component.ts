import {Component, effect, inject, input} from '@angular/core';
import {ProductService} from "../services/product.service";
import {ProductDetailStateService} from "../services/product-detail-state.service";
import {Product} from "../interfaces/Product";
import {CartStateService} from "../services/cart-state.service";
import {Observable} from "rxjs";

@Component({
    selector: 'app-product-details',
    imports: [],
    templateUrl: './product-details.component.html',
    styleUrl: './product-details.component.css',
    providers: [ProductService, ProductDetailStateService]
})
export class ProductDetailsComponent {

  /*product?: Product;
  product_id?: number;

  constructor(private route: ActivatedRoute, private productService: ProductService) { }
    ngOnInit(): void {
    this.product_id = +this.route.snapshot.params['id'];
        console.log(this.product_id);
        this.productService.GetProducts().subscribe({
          next: (product: Product[]) => {
            this.product = product.find(p => p.id === this.product_id);
            console.log(this.product);
          },
          error: (error: any) => {
            console.log(error);
          },
          complete: ()=> {
            console.log('complete');
          }
        })
    }*/

  productDetailState = inject(ProductDetailStateService).state;
  cartState = inject(CartStateService).state;

  id = input.required<string>();

  constructor() {
    effect(() => {
      this.productDetailState.getById(this.id());
    });
  }

  addToCart() {
    this.cartState.add({
      product: this.productDetailState().product!,
      quantity: 1
    })
  }
}
