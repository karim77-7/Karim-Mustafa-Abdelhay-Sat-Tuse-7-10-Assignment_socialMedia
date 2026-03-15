import { Component, inject, Input, OnInit } from '@angular/core';
import { CommentsService } from '../../../core/services/comments/comments.service';
import { IComments } from '../../../core/models/IComments/icomments.interface';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-comments',
  imports: [FormsModule , ReactiveFormsModule],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css',
})export class CommentsComponent implements OnInit {

  commentsList: IComments[] = [];

  @Input({ required: true }) postId!: string;
  private readonly commentsService = inject(CommentsService);


  editingCommentId: string | null = null;
  commentContent: string = '';

  ngOnInit() {
    this.getPostsComments();
  }

  getPostsComments() {
    this.commentsService.getPostsComments(this.postId).subscribe({
      next: (res) => {
        if (res.success) {
          this.commentsList = res.data.comments;
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }


  openEditComment(comment: any) {
    this.editingCommentId = comment._id;
    this.commentContent = comment.content;
  }

  updateComment(commentId: string) {
    let formData = new FormData();
    formData.append('content', this.commentContent);

    this.commentsService.updateComment(this.postId, commentId, formData).subscribe({
      next: (res) => {
        console.log(res);
        this.editingCommentId = null;
        this.getPostsComments(); 
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  deleteComment(commentId: string) {
    this.commentsService.deleteComment(this.postId, commentId).subscribe({
      next: (res) => {
        console.log(res);
        this.getPostsComments(); 
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}