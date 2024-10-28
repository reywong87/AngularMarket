import {Component, input, output} from '@angular/core';
import {IProductItemCart} from "../../interfaces/Product";
import {CurrencyPipe} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [
    CurrencyPipe,
    RouterLink
  ],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css'
})
export class CartItemComponent {
  productCartItem = input.required<IProductItemCart>();

  onRemove = output<number>();
  onIncrease = output<IProductItemCart>();
  onDecrease = output<IProductItemCart>();
}
