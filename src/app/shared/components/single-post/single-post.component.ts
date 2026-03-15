import { Component, inject, Input, OnInit } from '@angular/core';
import { IPost } from '../../../core/models/IPost/ipost.interface';
import { CommentsComponent } from "../comments/comments.component";
import { PostService } from '../../../core/services/post/post.service';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommentsService } from '../../../core/services/comments/comments.service';
import { RouterLink } from "@angular/router";
import {ToastrService } from 'ngx-toastr';
import { error } from 'console';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-single-post',
  imports: [CommentsComponent, ReactiveFormsModule, RouterLink , FormsModule],
  templateUrl: './single-post.component.html',
  styleUrl: './single-post.component.css',
})
export class SinglePostComponent implements OnInit {
  private readonly postService = inject(PostService)
  private readonly commentsService = inject(CommentsService)
  private readonly toastr = inject(ToastrService)
 

  postList : IPost[] = [];



  ngOnInit(): void {
    this.getAllPosts();
    
  }

  getAllPosts(){
   
    this.postService.getAllPosts().subscribe({
        next : (res) => { 
          console.log(res);
          if(res.success){
            this.postList = res.data.posts;
            this.toastr.success(res.message, 'Success')
      


          }
         


        } ,
        error : (err) => {
          console.log(err);
        

        }
    })
  }


commentDescription:FormControl = new FormControl(null , Validators.required);

uploadedFile:any ;

prepareUploadedFile(e:Event){

  let input = e.target as HTMLInputElement;

  if(input){
    if(input.files){
     this.uploadedFile = input.files[0];

    }
  }

}

createComment(e: SubmitEvent, postId: any) {
  e.preventDefault();

  let formData = new FormData();
  formData.append('content', this.commentDescription.value);
  formData.append('image', this.uploadedFile);

  this.commentsService.createComments( postId ,formData).subscribe({
    next: (res) => {
      console.log(res);
      if (res.success) {
        this.commentDescription.reset();
        this.uploadedFile = null;

      }
    },
    error: (err) => {
      console.log(err);
    }
  });
}
}