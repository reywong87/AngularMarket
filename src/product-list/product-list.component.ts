import {Component, inject} from '@angular/core';
import {ProductItemComponent} from "../product-item/product-item.component";
import {ProductStateService} from "../services/product-state.service";
import {CategoryFilterPipe} from "../pipes/category-filter.pipe";
import {CategoriesStateService} from "../services/categories-state.service";
import {CartStateService} from "../services/cart-state.service";
import {Product} from "../interfaces/Product";

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    ProductItemComponent,
    CategoryFilterPipe,
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
  providers: []
})
export class ProductListComponent {
  productState = inject(ProductStateService);
  categoriesState = inject(CategoriesStateService);
  cartState = inject(CartStateService).state;

  addToCart(product: Product)
  {
    this.cartState.add({
      product: product,
      quantity: 1,
    })
  }
}
