import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {

  private readonly httpClient = inject(HttpClient)

  getAllPosts(): Observable<any>{
    return this.httpClient.get(`https://route-posts.routemisr.com/posts`)
  }
  createPost(data:any): Observable<any>{
    return this.httpClient.post(`https://route-posts.routemisr.com/posts` , data)
  }

  getSinglePost(postId:any): Observable<any>{
    return this.httpClient.get(`https://route-posts.routemisr.com/posts/${postId}`)
  }
  updatePost(postId: string, data: FormData): Observable<any> {
    return this.httpClient.put(`https://route-posts.routemisr.com/posts/${postId}`, data);
  }
 
  deletePost(postId: string) {
    return this.httpClient.delete(`https://route-posts.routemisr.com/posts/${postId}`);
  }
  
  
}
