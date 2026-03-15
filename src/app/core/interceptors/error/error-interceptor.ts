import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  let platformId = inject(PLATFORM_ID)
  let toastr = inject(ToastrService)

  return next(req).pipe(catchError(err=>{

    if(isPlatformBrowser(platformId)){
    toastr.error(err.error.message, 'Errorrrrr')

    }
    return throwError(() => err) 
  }))
  ;
};
