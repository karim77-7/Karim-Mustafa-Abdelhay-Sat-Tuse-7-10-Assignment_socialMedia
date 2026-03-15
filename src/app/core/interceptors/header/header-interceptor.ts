import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';


export const headerInterceptor: HttpInterceptorFn = (req, next) => {

  let platformId = inject(PLATFORM_ID)
  
  if(isPlatformBrowser(platformId)){
    if(localStorage.getItem('token') ){
      req = req.clone({
        setHeaders : {
          authorization : `Bearer ${localStorage.getItem('token')}`
        }
      })
     }
  }

  return next(req);
};
