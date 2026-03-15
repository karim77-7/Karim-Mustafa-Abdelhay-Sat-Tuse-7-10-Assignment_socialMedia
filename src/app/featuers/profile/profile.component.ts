import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from '../../core/services/auth/auth.service';
import { PostService } from '../../core/services/post/post.service';
import { CommentsService } from '../../core/services/comments/comments.service';

import { IMyposts } from '../../core/models/IMyposts/imyposts.interface';
import { IPost } from '../../core/models/IPost/ipost.interface';
import { CommentsComponent } from "../../shared/components/comments/comments.component";
import { RouterLink } from "@angular/router";
import { NgxSpinnerService, NgxSpinnerComponent } from 'ngx-spinner';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, CommentsComponent, RouterLink, NgxSpinnerComponent , FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  private spinner = inject(NgxSpinnerService);

  private readonly authService = inject(AuthService);
  private readonly postService = inject(PostService);
  private readonly commentsService = inject(CommentsService);
  private readonly toastr = inject(ToastrService);

  data!: IMyposts;
  postData: IPost[] = [];

  commentDescription: FormControl = new FormControl(null, Validators.required);

  uploadedFile: File | null = null;

  ngOnInit(): void {
    this.getMyProfile();
  }


  getMyProfile() {

    this.spinner.show(); // 👈 يبدأ اللودينج
  
    this.authService.getMyData().subscribe({
  
      next: (res) => {
  
        if (res.success) {
  
          console.log('Profile data:', res.data.user);
  
          this.data = res.data.user;
  
          if (this.data._id) {
            this.getMyPosts(this.data._id);
          }
  
        }
  
        this.spinner.hide(); // 👈 يقفل اللودينج
  
      },
  
      error: (err) => {
  
        console.log(err);
        this.spinner.hide(); // 👈 يقفل لو حصل error
  
      }
  
    });
  }


  getMyPosts(userId: string) {

    this.spinner.show();
  
    this.authService.getUserPosts(userId).subscribe({
  
      next: (res) => {
  
        console.log(res);
  
        if (res.success) {
          this.postData = res.data.posts; // 👈 التصحيح هنا
        }
  
        this.spinner.hide();
  
      },
  
      error: (err) => {
  
        console.log(err);
        this.spinner.hide();
  
      }
  
    });
  
  }

  prepareUploadedFile(e: Event) {

    let input = e.target as HTMLInputElement;

    if (input.files) {
      this.uploadedFile = input.files[0];
    }

  }



  createComment(e: SubmitEvent, postId: string) {

    e.preventDefault();

    let formData = new FormData();

    formData.append('content', this.commentDescription.value);

    if (this.uploadedFile) {
      formData.append('image', this.uploadedFile);
    }

    this.commentsService.createComments(postId, formData).subscribe({

      next: (res) => {

        if (res.success) {

          this.commentDescription.reset();
          this.uploadedFile = null;

          this.toastr.success('Comment added successfully');

        }

      },

      error: (err) => {
        console.log(err);
      }

    });

  }



  handleCover(event: Event) {

    const file = (event.target as HTMLInputElement).files?.[0];

    if (!file) return;

    const img = document.getElementById('coverImg') as HTMLImageElement;

    img.src = URL.createObjectURL(file);
    img.classList.remove('hidden');

  }

  editingPostId: string | null = null;
  postContent: string = '';
  openUpdate(post: any) {
    this.editingPostId = post._id;
    this.postContent = post.body;
  }

  saveUpdate(postId: string) {
    let formData = new FormData();
    formData.append('body', this.postContent);
  
    this.spinner.show(); // 👈 ابدأ الـ spinner
  
    this.postService.updatePost(postId, formData).subscribe({
      next: (res) => {
        console.log(res);
        this.editingPostId = null;
        this.getMyPosts(this.data._id); // 👈 جيب الداتا تاني
      },
      error: (err) => {
        console.log(err);
        this.spinner.hide(); // 👈 قفل لو حصل error
      }
    });
  }


  deletePost(postId: string) {

    this.postService.deletePost(postId).subscribe({
      next: (res) => {
        console.log(res);
  
        this.postData = this.postData.filter(p => p._id !== postId);
  
      },
      error: (err) => {
        console.log(err);
      }
    });
  
  }


}