import {Component, inject} from '@angular/core';
import {CartItemComponent} from "../cart-item/cart-item.component";
import {RouterLink} from "@angular/router";
import {CartStateService} from "../../services/cart-state.service";
import {IProductItemCart} from "../../interfaces/Product";
import {CurrencyPipe} from "@angular/common";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CartItemComponent,
    RouterLink,
    CurrencyPipe
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  state = inject(CartStateService).state;
  saving: number = 2.50;

  onRemove(id: number) {
    this.state.remove(id);
  }

  onDecrease(product: IProductItemCart)
  {
    this.state.update({
      product: product.product,
      quantity: product.quantity - 1,
    });
  }

  onIncrease(product: IProductItemCart)
  {
    this.state.update({
      product: product.product,
      quantity: product.quantity + 1,
    });
  }
}
