import {Component, input} from '@angular/core';
import {IPost} from "../../interfaces/i-post";
import {NgStyle} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
    selector: 'app-blog-item',
    imports: [
        NgStyle,
        RouterLink
    ],
    templateUrl: './blog-item.component.html',
    styleUrl: './blog-item.component.css'
})
export class BlogItemComponent {
  post = input.required<IPost>();

}
