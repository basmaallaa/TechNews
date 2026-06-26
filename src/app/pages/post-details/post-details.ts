import { Component , OnInit,signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import {CategoryColor} from '../../Directives/category-color'
import { PostService } from '../../Services/post.service';
import { Post } from '../../Models/post';
@Component({
  selector: 'app-post-details',
  imports: [CommonModule,CategoryColor],
  templateUrl: './post-details.html',
  styleUrl: './post-details.css',
})
export class PostDetails implements OnInit {
  postId! : string;
  post = signal< Post | null> (null);
  constructor(private route: ActivatedRoute,private postService: PostService){}
  ngOnInit(): void {
      this.postId=  this.route.snapshot.paramMap.get('id') ?? '';
      console.log(this.postId);
      this.loadPost();
  }

  loadPost():void{
    this.postService.getPostById(this.postId).subscribe({
      next : (data) => {
      console.log('POST FROM API:', data); 
        this.post.set(data);
      },
       error: (err) => {
        console.log('Error loading post', err);
      }
    })

  }
}
