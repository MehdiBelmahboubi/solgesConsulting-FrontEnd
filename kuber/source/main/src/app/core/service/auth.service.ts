import { Injectable,Inject } from '@angular/core';
import { HttpClient, HttpResponse,HttpParams,HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { User } from '../models/user';
import { Role } from '@core/models/role';
import { LocalStorageService } from './../../services/storage/local-storage.service';
import {AppConfig,CONFIG_TOKEN} from './../../config/config';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  private users = [
    {
      id: 1,
      img: 'assets/images/user/admin.jpg',
      username: 'admin@software.com',
      password: 'admin@123',
      firstName: 'Sarah',
      lastName: 'Smith',
      role: Role.Admin,
      token: 'admin-token',
    },
    {
      id: 2,
      img: 'assets/images/user/employee.jpg',
      username: 'employee@software.com',
      password: 'employee@123',
      firstName: 'Ashton',
      lastName: 'Cox',
      role: Role.Employee,
      token: 'employee-token',
    },
    {
      id: 3,
      img: 'assets/images/user/client.jpg',
      username: 'client@solges.com',
      password: 'client@123',
      firstName: 'EL Miraouy',
      lastName: 'Outman',
      role: Role.Client,
      token: 'client-token',
    },
  ];

  constructor(private http: HttpClient,
              private localStorageService:LocalStorageService,
              @Inject(CONFIG_TOKEN) private  config:AppConfig) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser') || '{}')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }


  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }


  loginApi(email :string,passWord :string){
   console.log("im in login api service .")
    let params =new HttpParams()
      .set('email',email)
      .set('passWord',passWord);
    let options ={
      headers :new HttpHeaders().set("Content-Type","application/x-www-form-urlencoded")
    }
    return this.http.post(this.config.apiUrl+'/auth/authenticate',params,options);

  }

  error(message: string) {
    return throwError(message);
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(this.currentUserValue);
    return of({ success: false });
  }

  getRefreshToken(obj :any){
    console.log("on est dans methode refresh token : ",obj)
    return this.http.post(this.config.apiUrl+'/auth/refresh',obj)
  }
  fetchAllUser():Observable<User[]>  {

    return this.http.get<User[]>(this.config.apiUrl+'/users')
  }
  /*logout() {
    return this.http.get(this.config.apiUrl+'/auth/logout')
  }*/
  save(user: User): Observable<User> {
    return this.http.post<User>(this.config.apiUrl+'/auth/register',user);
  }
  sendUuidToUser(user: User): Observable<User> {
    return this.http.post<User>(this.config.apiUrl+'/auth/sendUuidToUser',user);
  }
  confirmedEmail(user :User){
    return this.http.post<User>(this.config.apiUrl+'/auth/confirmedEmail',user);
  }
  changePassWord(user :User){
    return this.http.post<User>(this.config.apiUrl+'/auth/changePassWord',user);
  }
  validUser(user :User){
    return this.http.post<User>(this.config.apiUrl+'/auth/validUser',user);
  }
}
