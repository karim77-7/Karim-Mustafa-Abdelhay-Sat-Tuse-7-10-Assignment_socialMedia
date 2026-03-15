import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private readonly httpClient = inject(HttpClient);
  private readonly router = inject(Router);

  signUp(data:any) : Observable<any> {

    return this.httpClient.post('https://route-posts.routemisr.com/users/signup',data)

  }


  login(data:any) : Observable<any> {

    return this.httpClient.post('https://route-posts.routemisr.com/users/signin',data)

  }


  getMyData() : Observable<any> {

    return this.httpClient.get(`https://route-posts.routemisr.com/users/profile-data`)

  }
  getUserPosts(userId:string) : Observable<any> {
    return this.httpClient.get(`https://route-posts.routemisr.com/users/${userId}/posts`)
  }

  changePassword(data: { password: string, newPassword: string }): Observable<any> {
    return this.httpClient.patch(
      `https://route-posts.routemisr.com/users/change-password`,
      data
    );
  }


  logOut(){
    this.router.navigate(['/login'])
    localStorage.removeItem('token')

  }

  
}
