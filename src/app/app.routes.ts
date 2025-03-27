import { Routes } from '@angular/router';
import {HomeComponent} from "../home/home.component";
import {MarketComponent} from "../market/market.component";
import {LoginComponent} from "../login/login.component";
import {ProductDetailsComponent} from "../product-details/product-details.component";
import {CartComponent} from "../cart/cart/cart.component";
import {BlogComponent} from "../blog/blog/blog.component";
import { BlogDetailsComponent } from '../blog/blog-details/blog-details.component';

export const routes: Routes = [

  /*{
    path: '',
    redirectTo: '/home', pathMatch: 'full',
  },*/
  {
    path: '',
    component: HomeComponent, data: { breadcrumb: 'Home' }
  },
  {
    path: 'market',
    component: MarketComponent, data: { breadcrumb: 'Market' }
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'market/product-details/:id',
    component: ProductDetailsComponent, data: { breadcrumb: 'Product Details' }
  },
  {
    path: 'cart/product-details/:id',
    component: ProductDetailsComponent, data: { breadcrumb: 'Product Details' }
  },
  {
    path: 'cart',
    component: CartComponent, data: { breadcrumb: 'Cart' }
  },
  {
    path: 'blog',
    component: BlogComponent, data: { breadcrumb: 'Blog' }
  },
  {
    path: 'blog/blog-post/:id',
    component: BlogDetailsComponent, data: { breadcrumb: 'Blog Details' }
  }
];
