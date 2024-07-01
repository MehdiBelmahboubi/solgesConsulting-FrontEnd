import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators,FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '@core';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { LocalStorageService } from '../../services/storage/local-storage.service';
import { CommonModule,NgIf } from '@angular/common';
import {User} from "../../models/User.model";
import {StylesService} from "../../services/stylesService";
@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss'],
    standalone: true,
    imports: [
        RouterLink,
        MatButtonModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        CommonModule,
        NgIf
    ],
})
export class SigninComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  authForm!: UntypedFormGroup;
  submitted = false;
  loading = false;
  error = '';
  hide = true;
  email = '';
  passWord = '';
  isLoginErrors = false;
  isLoading = false;
  currentUser! :User;
  isLoginIn: boolean = false ;
  backgroundColorBlue='';
  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private stylesService:StylesService
  ) {
    super();
  }

  ngOnInit() {
    this.authForm = this.formBuilder.group({

    });
    this.backgroundColorBlue=this.stylesService.getBlueColor();
  }
  get f() {
    return this.authForm.controls;
  }
  loginForm:FormGroup=new FormGroup({
    email:new FormControl(this.email,[Validators.required]),
    password:new FormControl(this.passWord,[Validators.required]),
    rememberMe:new FormControl(false)
  });

  login(){

    if (this.loginForm.valid){
      this.isLoading = true;
      this.authService.loginApi(this.loginForm.value.email, this.loginForm.value.password).subscribe({
        next: (res) => {
          this.loadProfile(res);
        },
        error: (error) => {
          console.log(error.error);
          this.isLoginErrors = true;
          this.isLoading = false;
          this.localStorageService.setIsUserLoggedIn(false);
          this.localStorageService.removeToken();
          this.error = 'email ou mot de passe n\'est pas valider !';
          console.log("email ou mot de passe n'est pas valider COTE SERVER  !")
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
      this.error = 'email ou mot de passe n\'est pas valider !';
      return;
    }
  }

  private loadProfile(res: any) {
    console.log("response : ",res);
    if (res) {
      setTimeout(() => {
        console.log("user :",res)
        this.currentUser=new User(res.firstName,res.lastName,res.email,res.roles,res.urlImage);
        this.currentUser.id=res.id;
        this.currentUser.accessToken=res.accessToken;
        this.currentUser.refreshToken=res.refreshToken;
        this.localStorageService.setCurrentCompany(res.companies[0]);
        console.log("company response is :",this.localStorageService.getCurrentCompany()?.id)
        this.localStorageService.setIsUserLoggedIn(true);
        this.localStorageService.setId(res.id);
        this.localStorageService.setAccessToken(res.accessToken);
        this.localStorageService.setRefreshToken(res.refreshToken);
        this.localStorageService.setCptRefresh(0);
        this.localStorageService.setUser(this.currentUser);
        this.isLoading = false;
        if (res.roles.includes("admin")) {
          this.localStorageService.setIsAdmin(true);
        } else {
          this.localStorageService.setIsAdmin(false);
        }
        //const roles = res.roles.map((role: string) => role.toLowerCase());
        const contientMot = res.roles.some((str: string) => str.toLowerCase() === "client");
        console.log("roles : ",res.roles)

        if (contientMot) {
          console.log("contient client")
          this.router.navigate(['/client/dashboard']).then(r =>console.log("lien not found :",r));
        } else {
          this.router.navigate(['/authentication/signin']);
        }
        this.loading = false;
      }, 1000);
    } else {
      this.error = 'Invalid Login';
    }
  }

}
