import { Component, Output,EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { PostService } from '../../Services/post.service';


@Component({
  selector: 'app-add-post',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './add-post.html',
  styleUrl: './add-post.css',
})
export class AddPost {

  constructor(private postService : PostService){}


  title = 'Add New Post';
  titlePlaceholder = 'Enter article title...';
  contentPlaceholder = 'Write your article content here...';

  category1 = 'AI';
  category2 = 'Cybersecurity';
  category3 = 'Web Development';
  category4 = 'Mobile';
  category5 = 'Cloud Computing';
  category6 = 'Hardware';

  selectedFileName = '';
  postImage= '';
  private imageLoading = false;
  private compressedImage: string | null = null;

  postForm = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(5)
    ]),

    category: new FormControl('', [
      Validators.required
    ]),

    content: new FormControl('', [
      Validators.required,
      Validators.minLength(20)
    ])
  });

    get titleRequired() {
    return this.postForm.get('title')?.errors?.['required'];
  }

  get titleMinLength() {
    return this.postForm.get('title')?.errors?.['minlength'];
  }

  get contentRequired() {
    return this.postForm.get('content')?.errors?.['required'];
  }

  get contentMinLength() {
    return this.postForm.get('content')?.errors?.['minlength'];
  }

  get categoryRequired() {
    return this.postForm.get('category')?.errors?.['required'];
  }


  publishPost() {

  if (this.postForm.invalid) {
    this.postForm.markAllAsTouched();
    return;
  }

  if(this.imageLoading){
    alert('Please eait, image is still loading...');
    return;
  }
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  const post = {
    //id: Date.now(),
    title: this.postForm.value.title ??'',
    content: this.postForm.value.content??'',
    category: this.postForm.value.category?? '',
    image: this.compressedImage ?? null,
    publishedAt: new Date().toISOString(),

    user:{
      firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
    avatar: localStorage.getItem(`profileImage_${currentUser.email}`) || ''

    }
  };

  this.postService.addPost(post);

  this.postForm.reset();
  this.selectedFileName = '';
  this.imageLoading = false;

}


  onImageSelected(event: Event) :void {

    const input = event.target as HTMLInputElement;

    if (!input.files?.length) {
      return;
    }

    const file = input.files[0];

    if(file.size > 5*1024*1024){
      alert('Image must be less than 5MB');
      return;
    }
    this.selectedFileName = file.name;
    this.imageLoading = true ;
    this.postImage = '';

    const reader = new FileReader();

     reader.onload = (e) => {
      const originalDataUrl = e.target!.result as string;
      // ضغط الصورة على Canvas قبل الحفظ
      this.compressImage(originalDataUrl, 800, 0.7)
        .then(compressed => {
          this.compressedImage = compressed;
          this.imageLoading = false;
 
          const originalKB  = Math.round(originalDataUrl.length  / 1024);
          const compressedKB = Math.round(compressed.length / 1024);
          console.log(`Image: ${originalKB}KB → ${compressedKB}KB`);
        })
        .catch(() => {
          // لو فشل الضغط، استخدم الأصلية
          this.compressedImage = originalDataUrl;
          this.imageLoading = false;
        });
    };

    reader.onerror = () => {
      this.imageLoading=false;
      this.selectedFileName = '';
      this.postImage = '';
      alert('Failed to read image. Please try again.')
    }

    reader.readAsDataURL(file);
  }

  //compress image 
  private compressImage(
    dataUrl: string,
    maxWidth: number,
    quality: number
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image();
 
      img.onload = () => {
        // احسب الأبعاد الجديدة مع الحفاظ على النسبة
        let { width, height } = img;
 
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
 
        const canvas = document.createElement('canvas');
        canvas.width  = width;
        canvas.height = height;
 
        const ctx = canvas.getContext('2d');
        if (!ctx) { reject('Canvas not supported'); return; }
 
        ctx.drawImage(img, 0, 0, width, height);
 
        // JPEG أصغر بكثير من PNG للصور الطبيعية
        const compressed = canvas.toDataURL('image/jpeg', quality);
        resolve(compressed);
      };
 
      img.onerror = reject;
      img.src = dataUrl;
    });
  }
 
}
