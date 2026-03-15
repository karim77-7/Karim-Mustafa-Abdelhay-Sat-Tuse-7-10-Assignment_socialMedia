import { isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CreatePostComponent } from "../../shared/components/create-post/create-post.component";
import { RightSidebarComponent } from "../../shared/components/right-sidebar/right-sidebar.component";
import { LeftSidebarComponent } from "../../shared/components/left-sidebar/left-sidebar.component";
import { SinglePostComponent } from "../../shared/components/single-post/single-post.component";
import { PostService } from '../../core/services/post/post.service';
import { IPost } from '../../core/models/IPost/ipost.interface';

@Component({
  selector: 'app-home',
  imports: [CreatePostComponent, RightSidebarComponent, LeftSidebarComponent, SinglePostComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {

  

  private readonly platFormId = inject(PLATFORM_ID)

  ngOnInit(): void {
 
    this.getToken();
    
  }


  getToken(){

    if(isPlatformBrowser(this.platFormId)){
      let token = localStorage.getItem('token');
      console.log('token : ',token);
    }

  }


}
