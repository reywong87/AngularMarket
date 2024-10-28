import {inject, Injectable, Signal} from '@angular/core';
import {IProductItemCart} from "../interfaces/Product";
import {signalSlice} from "ngxtension/signal-slice";
import {StorageService} from "./storage.service";
import {map, Observable} from "rxjs";

interface State{
  products: IProductItemCart[];
  loading: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CartStateService {

  private _storageService = inject(StorageService);

  private inicialState: State = {
    products: [],
    loading: false,
  };

  loadProducts$ = this._storageService.loadProducts().pipe(
    map((products) => ({products, loading: true})),
  )

  state = signalSlice({
    initialState: this.inicialState,
    sources: [this.loadProducts$],
    selectors: (state) => ({
      count: () => state().products.reduce((acc, product) => acc + product.quantity, 0),
      price: () => state().products.reduce((acc, product) => acc + product.product.price * product.quantity, 0),
    }),
    actionSources: {
      add: (state, action$: Observable<IProductItemCart>) =>
        action$.pipe(
          map((product):any => this.add(state, product)),
        ),
      remove: (state, action$: Observable<number>) =>
        action$.pipe(
          map((id) => this.remove(state, id)),
        ),
      update: (state, action$: Observable<IProductItemCart>) =>
        action$.pipe(
          map((product):any => this.update(state, product)),
        ),
    },
    effects: (state) => ({
      load: () => {
        if (state().loading){
          this._storageService.saveProducts(state().products);
        }
        console.log(this.state().products);
      }
    })
  });

  private add(state: Signal<State>, product: IProductItemCart) {
    const isInCart = state().products.find(
      (productInCart) => productInCart.product.id === product.product.id);
    if (!isInCart) {
      return{
        products: [...state().products, {...product, quantity: 1}],
      }

    }
    isInCart.quantity += 1;
    return {
      products: [...state().products],
    }
  }

  private remove(state: Signal<State>, id: number)
  {
    return {
      products: state().products.filter((product) => product.product.id !== id),
    };
  }

  private update(state: Signal<State>, product: IProductItemCart)
  {
    const products = state().products.map((productInCart) => {
      if (productInCart.product.id === product.product.id) {
        return {...productInCart, quantity: product.quantity};
      }
      return productInCart;
    });
    return { products };
  }
}
