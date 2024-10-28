import {inject, Injectable, signal} from '@angular/core';
import {ProductService} from "./product.service";
import {signalSlice} from "ngxtension/signal-slice";
import {map} from "rxjs";

interface State
{
  categories: string[];
  status: 'loading' | 'error' | 'success';
}

@Injectable({
  providedIn: 'root',
})

export class CategoriesStateService {
  private productService: ProductService = inject(ProductService);
  private selectedCategorySignal = signal<string>('All');

  private initialState: State = {
    categories: [],
    status: "loading" as const,
  };

  state = signalSlice({
    initialState: this.initialState,
    sources: [
      this.productService.GetCategories().pipe(
        map(categories => ({
          categories: ['All', ...categories],
          status: 'success' as const,
      })))
    ]
  });

  getSelectedCategory() {
    return this.selectedCategorySignal;
  }

  filterByCategory(category: string){
    this.selectedCategorySignal.set(category);
  }

}
