import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BaseHttpService {

  http = inject(HttpClient);
  apiUrl = environment.API_URL;
  blogUrl = environment.BLOG_URL;
}
