import {Component, inject, OnInit} from '@angular/core';
import {initFlowbite} from "flowbite";
import {CategoriesStateService} from "../services/categories-state.service";

@Component({
    selector: 'app-filter',
    imports: [],
    templateUrl: './filter.component.html',
    styleUrl: './filter.component.css',
    providers: []
})
export class FilterComponent implements OnInit {

  /*constructor(private filterService: FilterService) {}

  categories: string[] = [];


  ngOnInit(): void {
    initFlowbite();
    this.filterService.GetCategories().subscribe(
      {
        next: (data: string[]) => {
          this.categories = data;
        },
        error: (error: any) => {
          console.log(error);
        },
        complete: ()=> {
          console.log('complete');
        }
      }
    )
  }*/
  categoriesState = inject(CategoriesStateService);

  ngOnInit(): void {
    initFlowbite();
  }

}
