
import { Component, inject } from '@angular/core';
import { Form, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostService } from '../../../core/services/post/post.service';


@Component({
  selector: 'app-create-post',
  imports: [ReactiveFormsModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css',
})
export class CreatePostComponent {

  private readonly postService = inject(PostService)


  // prepareUploadedFile

  postDescription:FormControl = new FormControl(null , Validators.required);

  uploadedFile:any ;

  prepareUploadedFile(e:Event){

    let input = e.target as HTMLInputElement;

    if(input){
      if(input.files){
       this.uploadedFile = input.files[0];

      }
    }

  }

  createPost(e:SubmitEvent){
    e.preventDefault();


    let formData = new FormData();
    formData.append('body' , this.postDescription.value);
    formData.append('image' , this.uploadedFile);

    this.postService.createPost(formData).subscribe({
      next:(res)=>{
        console.log(res);
      },
      error:(err)=>{
        console.log(err);
      }
    })

  }

}
