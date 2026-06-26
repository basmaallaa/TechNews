import { Component , OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";
import {CategoryColor} from '../../Directives/category-color'
import {PostHover} from '../../Directives/post-hover'
import { PostService } from '../../Services/post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink,CategoryColor,PostHover,CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit{
  constructor(private router:Router,public postService: PostService){}
  ngOnInit(): void {
      this.postService.getAllPosts();
  }
  openPost(id:string){
      console.log('POST ID = ', id);
    this.router.navigate(['/post',id]);
  }

}
