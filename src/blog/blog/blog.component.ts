import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {BlogItemComponent} from "../blog-item/blog-item.component";
import {BlogService} from "../../services/blog.service";
import {IPost} from "../../interfaces/i-post";

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [
    BlogItemComponent
  ],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent implements OnInit
{
  protected readonly POSTS_PER_PAGE = 10;

  public currentPage = signal<number>(1);
  public posts = signal<IPost[]>([]);
  public blogService = inject(BlogService);


  public visiblePost = computed(() =>
  {
    const startIndex = (this.currentPage() - 1) * this.POSTS_PER_PAGE;
    return this.posts().slice(startIndex, startIndex + this.POSTS_PER_PAGE);
  })

  ngOnInit(): void
  {
    this.blogService.GetPosts().subscribe(data =>
      {
      this.posts.set(data);
      console.log(this.posts())
    });
      
  }

  nextPage()
  {
    const totalPage = Math.ceil(this.posts().length / this.POSTS_PER_PAGE);
    if (this.currentPage() < totalPage)
    {
      this.currentPage.update(page => page + 1);
    }
  }

  prevPage()
  {
    if (this.currentPage() > 1)
    {
      this.currentPage.update(page => page - 1);
    }
  }

  protected readonly Math = Math;
}