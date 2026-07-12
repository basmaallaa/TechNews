import { inject,Injectable,signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../Models/post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
    private apiUrl = 'https://json-server-api-production-7c07.up.railway.app/posts';
      
    posts = signal<any>([]);

    constructor(private http : HttpClient){}

    getAllPosts(){
      return this.http.get<Post[]>(this.apiUrl).subscribe({
        next:(data) => this.posts.set(data.reverse()),
      error:(err) => console.log('Error',err)
      });
    }

    getPostById(id:string){
      return this.http.get<Post>(`${this.apiUrl}/${id}`)
    }

    addPost(post : Post){
      return this.http.post<Post>(this.apiUrl,post).subscribe({
        next:(newPost)=>{
          this.posts.update(posts => [newPost,...posts]),
         console.log('Post Added Successfully', newPost);
        },
        error: (err) => console.error(err)
      })
    }
}
