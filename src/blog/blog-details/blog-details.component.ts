import { Component, effect, inject, input, OnInit, signal } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { IPost } from '../../interfaces/i-post';

@Component({
    selector: 'app-blog-details',
    imports: [],
    templateUrl: './blog-details.component.html',
    styleUrl: './blog-details.component.css'
})
export class BlogDetailsComponent implements OnInit{
  
  private _blogService = inject(BlogService);

  public post = signal<IPost | null>(null);

  public post_title = input.required<string>();


  ngOnInit(): void {
    this.loadPost();
  }
  
    private loadPost(): void {
      this._blogService.GetPost(this.post_title()).subscribe(data => {
        this.post.set(data);
        console.log(this.post);
      });
    }

}
