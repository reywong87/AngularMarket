import {Injectable} from '@angular/core';
import {BaseHttpService} from "./base-http.service";
import {IPost} from "../interfaces/i-post";
import {catchError, map, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BlogService extends BaseHttpService
{
  private _cachePosts: IPost[] | null = null;

  GetPosts(): Observable<IPost[]>
  {
    if (this._cachePosts){
      return of (this._cachePosts);
    }
    else{
      return this.http.get<IPost[]>(this.blogUrl + "/posts").pipe(
        map(posts => {
          this._cachePosts = posts;
          return posts
        }),
        catchError((error: any) => {
          console.error('Error fetching posts:', error);
          return of([]);
        })
      );
    }
  }

  /* GetPost(id: string): Observable<IPost>
  {
    return this.http.get<IPost>(this.blogUrl + "/posts/" + id);
  } */

  GetPost(slug: string): Observable<IPost | null>
  {

    return this.GetPosts().pipe(
      map(posts => {
        return posts.find(p => p.slug === slug) || null;
      }),
      catchError((error: any) => {
        console.error('Error fetching posts:', error);
        return of(null);
      })
    )

  }

}
