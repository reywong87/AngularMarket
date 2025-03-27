import {Component, inject} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {CartStateService} from "../services/cart-state.service";

@Component({
    selector: 'app-header',
    imports: [
        RouterOutlet,
        RouterLink,
        RouterLinkActive
    ],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
})
export class HeaderComponent {
  cartState = inject(CartStateService).state;
}
