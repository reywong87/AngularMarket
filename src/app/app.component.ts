import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {initFlowbite} from "flowbite";
import {HomeComponent} from "../home/home.component";
import {HeaderComponent} from "../header/header.component";
import {FooterComponent} from "../footer/footer.component";
import {BreadcrumbComponent} from "../breadcrumb/breadcrumb.component";
import {Breadcrumb, BreadcrumbService} from "../services/breadcrumb.service";
import {Observable} from "rxjs";
import {AsyncPipe} from "@angular/common";

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, HomeComponent, HeaderComponent, FooterComponent, BreadcrumbComponent, AsyncPipe],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'AngularMarket';
  isHome: boolean = false;
  breadcrumbs$: Observable<Breadcrumb[]>;

  constructor(private breadcrumbService: BreadcrumbService) {

    this.breadcrumbs$ = this.breadcrumbService.breadcrumbs$;

  }

  ngOnInit(): void {
    initFlowbite();
    this.breadcrumbs$.subscribe((breadcrumbs: Breadcrumb[]) => {
      this.isHome = breadcrumbs.length === 1;
    })
  }


}
