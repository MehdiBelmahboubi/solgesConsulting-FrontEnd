import {HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '@core/service/auth.service';
import { LocalStorageService } from 'app/services/storage/local-storage.service';
import { catchError, throwError } from 'rxjs';

export const errorInterceptInterceptor: HttpInterceptorFn =
  (request, next) => {

    const authenticationService =inject(AuthService);
    const localStorageService =inject(LocalStorageService);
    const refreshToken=localStorageService.getRefreshToken();
    const cptRefreshStr: string | null = localStorageService.getCptRefresh();
    let cptRefresh: number = cptRefreshStr ? parseInt(cptRefreshStr, 10) : 0;

    return next(request).pipe(
      catchError((err) => {
        console.log("Error Interceptor-----------------------",err.error.error);
        if (err instanceof HttpErrorResponse) {
          if (err.status === 403 && cptRefresh < 2 && !request.url.includes('/authenticate')) {

            console.error('Unauthorized request Interceptor --*--- :', err);
            authenticationService.getRefreshToken(refreshToken).subscribe({
              next : (res:any) =>{
                localStorageService.setAccessToken(res.accessToken);
                console.log("Votre Refresh Token   est mis a jours",localStorageService.getAccessToken())
                return next(request);
              },
              error : err => {
                console.log("err dans refresh token !")
                localStorageService.setIsUserLoggedIn(false);
                localStorageService.removeToken();
                return throwError(() => err);
              }
            });
            console.log("Attempting to refrech token",cptRefresh)
            cptRefresh=cptRefresh+1;
            localStorageService.setCptRefresh(cptRefresh);
          }
          else {
            return throwError(()=> new Error(err.error.error))
          }
        } else {
          console.error('An error occurred:', err);
        }
        return throwError(() => err);
      })
    );
  };
