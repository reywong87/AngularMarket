import {Component, inject, input, OnInit, signal} from '@angular/core';
import { BlogService } from '../../services/blog.service';

@Component({
    selector: 'app-blog-details',
    imports: [],
    templateUrl: './blog-details.component.html',
    styleUrl: './blog-details.component.css'
})
export class BlogDetailsComponent implements OnInit{
  
  private _blogService = inject(BlogService);

  //public post = signal<IPost | null>(null);

  public id = input.required<string>();
  
  public postRs = this._blogService.GetSinglePostRs(this.id);
  public imageUrl = signal("");


  ngOnInit(): void {
    //this.loadPost();
      this.imageUrl.set(`https://picsum.photos/id/${this.getImageId()}/400/200`);
  }
  
   /* private loadPost(): void {
      this._blogService.GetPost(this.id()).subscribe(data => {
        this.post.set(data);
        console.log(this.post);
      });
    }*/

    getImageId(): string{
        let id = parseInt(this.id());
        let result = 155 + id
        return result.toString();
    }

}
