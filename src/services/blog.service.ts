import {computed, Injectable, Signal} from '@angular/core';
import {BaseHttpService} from "./base-http.service";
import {IPost} from "../interfaces/i-post";
import {httpResource} from "@angular/common/http";
import {IUser} from "../interfaces/i-user";

interface ApiResponse {
    posts: IPost[];
    total: number;
    skip: number;
    limit: number;
}

@Injectable({
    providedIn: 'root'
})
export class BlogService extends BaseHttpService {
    //private _cachePosts: IPost[] | null = null;

    /*GetPosts(): Observable<IPost[]>
    {
      if (this._cachePosts){
        return of (this._cachePosts);
      }
      else{
        return this.http.get<ApiResponse>(this.blogUrl + "/posts").pipe(
          map(response => {
            this._cachePosts = response.posts;
            return response.posts
          }),
          catchError((error: any) => {
            console.error('Error fetching posts:', error);
            return of([]);
          })
        );
      }
    }*/

    /*GetPost(id: string): Observable<IPost | null>
    {
  
      return this.GetPosts().pipe(
        map(posts => {
          return posts.find(p => p.id.toString() === id) || null;
        }),
        catchError((error: any) => {
          console.error('Error fetching posts:', error);
          return of(null);
        })
      )
  
    }*/

    GetPostsRs() {
        const resource = httpResource<ApiResponse>(
            {
                url: this.blogUrl + "/posts",
                method: "GET",
            },
            {
                defaultValue: {posts: [], total: 0, skip: 0, limit: 0},
            }
        );
        return computed(() => resource.value()?.posts);
    }

    GetSinglePostRs(id: Signal<string>) {
        return httpResource<IPost | undefined>(() => ({
            url: this.blogUrl + "/posts/" + id(),
        }));
    }
    
    GetUser(id: string){
        return httpResource<IUser | undefined>(() => ({
            url: this.blogUrl + "/users/" + id,
        }));
    }

}
