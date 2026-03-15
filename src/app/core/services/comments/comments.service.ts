import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {


  private readonly httpClient = inject(HttpClient)

  getPostsComments(postId:any) : Observable<any>{
    return this.httpClient.get(`https://route-posts.routemisr.com/posts/${postId}/comments`)
  }
  createComments(postId:any , data:any) : Observable<any>{
    return this.httpClient.post(`https://route-posts.routemisr.com/posts/${postId}/comments`,data)
  }

  updateComment(postId: string, commentId: string, formData: FormData) : Observable<any> {
    return this.httpClient.put(
      `https://route-posts.routemisr.com/posts/${postId}/comments/${commentId}`,
      formData 
    );
  }

  deleteComment(postId: string, commentId: string) : Observable<any> {

    return this.httpClient.delete(
      `https://route-posts.routemisr.com/posts/${postId}/comments/${commentId}`,
      
    );
    
  }
  
}
