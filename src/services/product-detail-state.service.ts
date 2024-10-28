import {inject, Injectable} from '@angular/core';
import {Product} from "../interfaces/Product";
import {ProductService} from "./product.service";
import {signalSlice} from "ngxtension/signal-slice";
import {map, Observable, of, switchMap} from "rxjs";

interface State
{
  product: Product | null;
  status: 'loading' | 'error' | 'success';
}

@Injectable({
  providedIn: 'root',
})
export class ProductDetailStateService {

  private productService: ProductService = inject(ProductService);
  private productLoaded = false;

  private initialState: State = {
    product:null,
    status: "loading" as const,
  };

  /*state = signalSlice({
    initialState: this.initialState,
    actionSources: {
      getById: (_state, $: Observable<string>) => $.pipe(
        switchMap((id) => this.productService.GetProduct(id)),
        map(data => ({ product: data, status: 'success' as const }))
        ),
    },
  });*/

  state = signalSlice({
    initialState: this.initialState,
    actionSources: {
      getById: (_state, $: Observable<string>): Observable<any> => $.pipe(
        switchMap((id) => {
          console.log(this.productLoaded);
          if (this.productLoaded){
            return of (_state().product);
          } else {
            return this.productService.GetProduct(id).pipe(
              map(data => {
                this.productLoaded = true;
                console.log(this.productLoaded);
                return { product: data, status: 'success' as const }
              })
            );
          }
        })
      ),
    },
  });

}
