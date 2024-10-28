import {inject, Injectable} from '@angular/core';
import {Product} from "../interfaces/Product";
import {signalSlice} from "ngxtension/signal-slice";
import {ProductService} from "./product.service";
import {map} from "rxjs";

interface State
{
  products: Product[];
  status: 'loading' | 'error' | 'success';
}

@Injectable({
  providedIn: 'root',
})
export class ProductStateService
{
  private productService: ProductService = inject(ProductService);
  private productLoaded = false;

  private initialState: State = {
    products: [],
    status: "loading" as const,
  };

  /*state = signalSlice({
    initialState: this.initialState,
    sources: [
      this.productService.GetProducts().pipe(
        map(products => ({products, status: 'success' as const}))
      )
    ]

  });*/
  state = signalSlice({
    initialState: this.initialState,
    sources: [
      // Solo hacemos la llamada a la API si los productos no se han cargado previamente
      this.productService.GetProducts().pipe(
        map((products):State => {
          // Verificamos si ya se cargaron los productos para no volver a cargarlos
          if (!this.productLoaded) {
            this.productLoaded = true; // Marcamos los productos como cargados
            return { products, status: 'success' as const };
          }
          // Si ya están cargados, devolvemos el estado actual sin hacer nada.
          return this.state();
        })
      )
    ]
  });
}
