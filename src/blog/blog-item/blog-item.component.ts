import {Component, input, OnInit, signal} from '@angular/core';
import {IPost} from "../../interfaces/i-post";
import {RouterLink} from "@angular/router";

@Component({
    selector: 'app-blog-item',
    imports: [
        RouterLink
    ],
    templateUrl: './blog-item.component.html',
    styleUrl: './blog-item.component.css'
})
export class BlogItemComponent implements OnInit {
    public post = input.required<IPost>();
    public imageUrl = signal("");
        
    ngOnInit(): void {
        this.imageUrl.set(`https://picsum.photos/id/${this.getRandomNumber()}/400`)
    }
    
    getRandomNumber(): string{
        let id = this.post().id
        let result = 155 + id
        return result.toString();
    }
}
