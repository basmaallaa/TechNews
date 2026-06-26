import { Component } from '@angular/core';
import {Posts} from "../../Components/posts/posts";
import { AddPost } from '../../Components/add-post/add-post';
@Component({
  selector: 'app-all-posts',
  imports: [Posts, AddPost],
  templateUrl: './all-posts.html',
  styleUrl: './all-posts.css',
})
export class AllPosts {
 
  }
