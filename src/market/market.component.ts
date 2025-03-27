import {Component} from '@angular/core';
import {ProductListComponent} from "../product-list/product-list.component";
import {RouterOutlet} from "@angular/router";
import {BreadcrumbComponent} from "../breadcrumb/breadcrumb.component";
import {FilterComponent} from "../filter/filter.component";

@Component({
    selector: 'app-market',
    imports: [
        ProductListComponent,
        RouterOutlet,
        BreadcrumbComponent,
        FilterComponent,
    ],
    templateUrl: './market.component.html',
    styleUrl: './market.component.css'
})
export class MarketComponent{

}
