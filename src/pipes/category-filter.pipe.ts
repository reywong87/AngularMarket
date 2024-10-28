import { Pipe, PipeTransform } from '@angular/core';
import {Product} from "../interfaces/Product";

@Pipe({
  name: 'categoryFilter',
  standalone: true
})
export class CategoryFilterPipe implements PipeTransform {

  transform(products: Product[], selectedCategory: string): Product[] {
    if (!products || !selectedCategory || selectedCategory === 'All') {
      return products;
    }
    return products.filter(product => product.category === selectedCategory);
  }

}
