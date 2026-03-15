import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../core/services/post/post.service';
import { IPost } from '../../core/models/IPost/ipost.interface';
import { CommentsComponent } from "../../shared/components/comments/comments.component";
import { CommentsService } from '../../core/services/comments/comments.service';
import { FormControl, ReactiveFormsModule, Validators, ɵInternalFormsSharedModule } from '@angular/forms';

@Component({
  selector: 'app-post-details',
  imports: [CommentsComponent, ɵInternalFormsSharedModule , ReactiveFormsModule],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.css',
})
export class PostDetailsComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly postService = inject(PostService)
    private readonly commentsService = inject(CommentsService)
  

  postId:string | null =null;

  post!:IPost

  ngOnInit() : void{
    this.getPostIdFromRoute()
  }
  getPostIdFromRoute(){
    this.activatedRoute.paramMap.subscribe((urlPath)=>{
      if(urlPath.has('id')){
        this.postId = urlPath.get('id')  
        this.getPostDetails();
      }    
  
      })
  }


  getPostDetails(){
    this.postService.getSinglePost(this.postId).subscribe({
        next:(res)=>{
          console.log(res)
          this.post = res.data.post
        },
        error:(err)=>{
          console.log(err)
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
