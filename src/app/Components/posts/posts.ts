import { Component,Input,OnInit, signal, SimpleChanges } from '@angular/core';
import {CommonModule  } from '@angular/common';
import {CategoryColor} from '../../Directives/category-color'
import {PostHover} from '../../Directives/post-hover'
import { CustomContentPipe } from '../../Pipes/custom-content-pipe';
import { Router } from '@angular/router';
import { PostService } from '../../Services/post.service';
@Component({
  selector: 'app-posts',
  imports: [CommonModule ,CategoryColor,PostHover,CustomContentPipe],
  templateUrl: './posts.html',
  styleUrl: './posts.css',
})
export class Posts implements OnInit {
  sectionTitle = 'Latest Articles';

  constructor(private router: Router , public postService:PostService){}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void{
    this.postService.getAllPosts();
  }


  openPost(id:string){
      console.log('POST ID = ', id);
    this.router.navigate(['/post',id]);
  }

}
