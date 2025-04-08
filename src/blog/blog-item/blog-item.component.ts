import {Component, effect, inject, Injector, input, OnInit, runInInjectionContext, signal} from '@angular/core';
import {IPost} from "../../interfaces/i-post";
import {RouterLink} from "@angular/router";
import {BlogService} from "../../services/blog.service";
import {IUser} from "../../interfaces/i-user";

@Component({
    selector: 'app-blog-item',
    imports: [
        RouterLink
    ],
    templateUrl: './blog-item.component.html',
    styleUrl: './blog-item.component.css'
})
export class BlogItemComponent implements OnInit {
    public injector = inject(Injector);
    public blogService = inject(BlogService);
    
    public post = input.required<IPost>();
    public imageUrl = signal("");
    public userResource = signal<ReturnType<BlogService["GetUser"]>| undefined>(undefined);
    public user = signal<IUser | undefined>(undefined);

    private userEffect = effect(() => {
        const resource = this.userResource();
        if (resource) {
            const userData = resource.value();
            if (userData) {
                this.user.set(userData);
            }
        }
    });
    
    ngOnInit(): void {
        this.imageUrl.set(`https://picsum.photos/id/${this.getImageId()}/400`);
        runInInjectionContext(this.injector, () => {
            this.userResource.set(this.blogService.GetUser(this.post().userId.toString()));
        });
    }

    getImageId(): string {
        let id = this.post().id;
        let result = 155 + id;
        return result.toString();
    }
}
