import {Component} from '@angular/core';
import {Breadcrumb, BreadcrumbService} from '../services/breadcrumb.service';
import {RouterLink} from "@angular/router";
import {Observable} from "rxjs";
import {AsyncPipe} from "@angular/common";

@Component({
    selector: 'app-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    imports: [
        RouterLink,
        AsyncPipe
    ],
    styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent{
  breadcrumbs$: Observable<Breadcrumb[]>;

  constructor(private breadcrumbService: BreadcrumbService) {
    this.breadcrumbs$ = this.breadcrumbService.breadcrumbs$;

  }
}
