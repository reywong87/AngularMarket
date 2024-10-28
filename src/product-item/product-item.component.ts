import {Component, input, OnInit, output} from '@angular/core';
import {Product} from "../interfaces/Product";
import {CurrencyPipe, DecimalPipe} from "@angular/common";
import {RouterLink} from "@angular/router";


@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [
    CurrencyPipe,
    DecimalPipe,
    RouterLink
  ],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css',
  providers: []
})
export class ProductItemComponent implements OnInit {
  //@Input() product!: Product;
  product = input.required<Product>();
  stars: number[] = [];
  addToCard = output<Product>();

  ngOnInit(): void
  {
    this.stars = Array(Math.round(this.product().rating.rate)).fill(0);
  }

  add()
  {
    this.addToCard.emit(this.product());
  }
}
