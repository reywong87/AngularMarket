import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

export interface Breadcrumb {
  label: string;
  url: string;
}

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  // Subject emitting the breadcrumb hierarchy
  private readonly _breadcrumbs$ = new BehaviorSubject<Breadcrumb[]>([]);

  // Observable exposing the breadcrumb hierarchy
  readonly breadcrumbs$ = this._breadcrumbs$.asObservable();

  constructor(private router: Router) {
    this.router.events
      .pipe(
        // Filter the NavigationEnd events as the breadcrumb is updated only when the route reaches its end
        filter((event) => event instanceof NavigationEnd)
      )
      .subscribe((event) => {
        // Get the url "/page-1/page-2"
        const root = this.router.routerState.snapshot.root;

        // Create empty breadcrumb array
        const breadcrumbs: Breadcrumb[] = [];

        // Make first call to addBreadcrumb function
        this.addBreadcrumb(root.firstChild!, [], breadcrumbs);

        // Emit the new hierarchy
        this._breadcrumbs$.next(breadcrumbs);

      });
  }

  buildDepth(iterations: number, constituentFolders: string[]) {
    // This module builds links from the various preceeding folders
    // /page-1
    // /page-1/page-2
    // /page-1/page-2/page-3

    let depthStr = '';

    for (let i = 1; i <= iterations; i++) {
      // Add each of the folders to the string
      depthStr = depthStr + '/' + constituentFolders[i];
    }

    return depthStr;
  }

  private addBreadcrumb(
    route: ActivatedRouteSnapshot,
    parentUrl: string[],
    breadcrumbs: Breadcrumb[]
  ) {
    if (route) {
      // Get the route url
      const routeUrl = parentUrl.concat(route.url.map((url) => url.path));

      // Break the route into seperate folders /page-1/page-2/ becomes and array of [page-1], [page-2]
      let constituentFolders: string[];
      constituentFolders = routeUrl.toString().split(',');

      // Verificar si 'home' ya está presente al inicio
      if (constituentFolders[0] !== 'home') {
        constituentFolders.splice(0, 0, 'home');
      }

      // Remove the id (if it's a number) from the folders
      constituentFolders = constituentFolders.filter(folder => isNaN(Number(folder)) );

      // Remove repeated 'home' from the folders
      //constituentFolders = constituentFolders.filter(folder => folder !== 'home');

      // Iterate over the folders, building breadcrumb links for each part of the url.
      // Don't do the last folder as that's the current page.
      for (let i = 0; i < constituentFolders.length; i++) {
        // Add a breadcrumb link
        const breadcrumb = {
          label: constituentFolders[i],
          url: this.buildDepth(i, constituentFolders),
        };
        breadcrumbs.push(breadcrumb);
        console.log(breadcrumbs);
        // Recursive call to next element in the route.
        // pass in the route's first child.
        this.addBreadcrumb(route.firstChild!, routeUrl, breadcrumbs);
      }
    }
  }

  // Function to check if the route has a dynamic parameter like 'id'
  private isDynamicRoute(route: ActivatedRouteSnapshot): boolean {
    return route.paramMap.keys.length > 0 && route.paramMap.has('id');
  }
}
