import { HttpInterceptorFn } from '@angular/common/http';
import {
  inject

} from '@angular/core';
import { LocalStorageService } from 'app/services/storage/local-storage.service';


export const appHttpInterceptor: HttpInterceptorFn =
  (request, next) => {
    console.log("on est dans Interceptor-----")
    const localStorageService =inject(LocalStorageService);
    if(
         !request.url.includes("/authenticate")
      && !request.url.includes("/register")
      && !request.url.includes("/confirmedEmail")
      && !request.url.includes("/validUser")
      && !request.url.includes("/sendUuidToUser")
      && !request.url.includes("/changePassWord")
      && !request.url.includes("/cloudinary/upload")
    ) {
      if(!request.url.includes("/refresh")){// All API
        console.log(' appel pour d\'autre lien sont refresh : ')
        let newRequest = request.clone({
          headers: request.headers.set('Authorization', 'Bearer ' + localStorageService.getAccessToken())
        })
        console.log("accessToken :",localStorageService.getAccessToken())
        return next(newRequest);
      }
      else {
        console.log(' appel backend refresh : ')
        const newRequest = request.clone({
          headers: request.headers.set('Authorization', 'Bearer ' + localStorageService.getRefreshToken())
        })
        return next(newRequest);
      }
    }
    else {
      console.log('  authentication : ')
      console.log("url est ",request.url)
      return next(request)
    }

};
