import {Component, OnInit, ViewChild} from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import {CommonModule } from '@angular/common';
import { ImageService } from 'app/services/image.service';
import  { Image } from '../../models/image.model';
import { MatInputModule } from '@angular/material/input';
import { FileUploadComponent } from '@shared/components/file-upload/file-upload.component';
import { LocalStorageService } from 'app/services/storage/local-storage.service';
import { Client } from 'app/models/client.model';
import { StylesService } from 'app/services/stylesService';
import {MatStepper, MatStepperModule} from '@angular/material/stepper';
import { ClientService} from "../../services/client.service";
import {SnackBarService} from "../../services/snackBar.service";
import {Company} from "../../models/company.model";


@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        RouterLink,
        MatButtonModule,
        CommonModule,
        FileUploadComponent,
        MatStepperModule
    ],
})
export class SignupComponent implements OnInit {
  @ViewChild(MatStepper) stepper!: MatStepper;
  authForm!: UntypedFormGroup;
  formStepTo!: UntypedFormGroup;
  submitted = false;
  returnUrl!: string;
  hide = true;
  chide = true;
  file: File | null = null;
  imageFileCompany: File | null = null;
  images: Image[] = [];
  error = '';
  user! :Client;
  company! :Company;
  fileUploadForm: UntypedFormGroup ;
  backgroundColorGreen = "";
  backgroundColorBlue = "";
  backgroundColorGray = "";
  isLinear = false;
  uuidIsValid = false;
  stepTwoIsValid =false;
  stepOneIsValid =false;
  registerProcess: boolean=false;
  confirmationProcess :boolean =false;


  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService :ClientService,
    private imageService: ImageService,
    private localStorageService:LocalStorageService,
    private stylesService:StylesService,
    private snackBarService:SnackBarService)
  {
    this.fileUploadForm = formBuilder.group({
      fileUpload: [''],
    });
  }
  ngOnInit() {

    this.backgroundColorGreen=this.stylesService.getGreenColor();
    this.backgroundColorBlue=this.stylesService.getBlueColor();
    this.backgroundColorGray=this.stylesService.getGrayColor();

    this.localStorageService.removeToken();
    this.authForm = this.formBuilder.group({
       firstName: ['',[Validators.required,Validators.maxLength(20),Validators.minLength(4)]],
       lastName: ['', [Validators.required,Validators.maxLength(20),Validators.minLength(4)]],
       email: ['', [Validators.required, Validators.email, Validators.minLength(10)]],
       companyName : ['',[Validators.required,Validators.minLength(4),Validators.maxLength(20)]],
       companyCode : ['',[Validators.required,Validators.minLength(3),Validators.maxLength(6)]],
       companyAddress : ['',[Validators.required,Validators.minLength(5),Validators.maxLength(30)]],
       companyPhone : ['',[Validators.required,Validators.minLength(8),Validators.pattern(/^06\d{8}$/)]],
       //companyImageId : ['',Validators.required]
    });
    this.formStepTo =this.formBuilder.group({
        uuid : ['', [ Validators.required, Validators.maxLength(8),Validators.minLength(8)]],
        passWord : ['', [ Validators.required,Validators.maxLength(14), Validators.minLength(4)]],
        confirmPassWord : ['', [ Validators.required, Validators.maxLength(14), Validators.minLength(4)]],
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  get f() {
    return this.authForm.controls;
  }
  onSubmitStpOne() {
    console.log("on est dans onsubmet  Component ")
    this.submitted = true;
    if (this.authForm.valid) {
      this.registerProcess=true;
      this.company=new Company(this.authForm.value.companyName,this.authForm.value.companyCode,this.authForm.value.companyAddress,this.authForm.value.companyPhone);
      this.user =new Client(this.authForm.value.firstName,this.authForm.value.lastName,this.authForm.value.email,this.company);
      console.log('user information :', this.user);
      this.saveUser(this.user);
    } else {
      this.authForm.markAllAsTouched();
      this.error = 'les informations ne sont pas valider !';
      return;
    }
  }

  saveUser(user :Client){
    console.log("on est dans Register Component ")
    this.userService.save(user).subscribe({
      next: (response) => {
        console.log("response register user :",response);
        this.stepOneIsValid=true;
        this.registerProcess=true;
        this.snackBarService.showSuccess('Consulter votre Email !.');
      },
      error: (error) => {
        console.log("response : ",error);
        this.stepOneIsValid=false;
        this.registerProcess=false;
        console.log("on est dans Register Component erreur ");
        this.snackBarService.showError('Une erreur est produite. Veuillez réessayer plus tard.');
      },
      complete :() => {
        if(this.stepOneIsValid){
          this.stepper.next();
        }
        else{
          this.registerProcess=false;
        }
      }
    });
  }

  onFileSelected(file: File) {
    this.imageFileCompany=file;
    console.log('File received :', this.imageFileCompany);
  }

  onUploadImage(image :File): void {
    if (image) {
      this.imageService.upload(image).subscribe({
          next: (result:Image) => {
            console.log("image is saved in cloudinary ! ",result)
            this.user.imageCompanyId=result.id;
            this.user.company.image=result;
            console.log("user send in image Upload in cloudinary! ",this.user);
          },
          error: (error) => {
            this.confirmationProcess=false;
            this.error='erreur dans l\'import de l\'image : '+error;
          },
          complete: () => {
            this.registerUser(this.user);
          }
        });
    }
  }

  checkMail(user:Client){
    this.userService.checkMail(user).subscribe({
      next: (result:Client) => {
        console.log("response  confirmation :",result)
        this.uuidIsValid=true;
      },
      error: (error) => {
        console.log("response : ",error)
        this.uuidIsValid=false;
        this.confirmationProcess=false;
        this.error="code de confirmation est errone ! "
        this.snackBarService.showError('code de confirmation est errone ! ')
      },
      complete: () => {
        if (this.uuidIsValid) {
          if (this.imageFileCompany) {
            this.onUploadImage(this.imageFileCompany);
            console.log("image est enregistrer ");
          } else {
            console.log("image n'est pas importer!");
          }

        } else {
          this.error = "Code de confirmation n'est pas valide !"
          this.snackBarService.showError("Code de confirmation n'est pas valide !")
        }

      }
    });
  }

  onSubmitStpTwo() {
    this.stepTwoIsValid = false;
    if (this.formStepTo.valid) {
      if (this.formStepTo.value.confirmPassWord === this.formStepTo.value.passWord) {
        this.confirmationProcess=true;
        this.user.uuid = this.formStepTo.value.uuid;
        this.user.confirmPassWord = this.formStepTo.value.confirmPassWord;
        this.user.passWord = this.formStepTo.value.passWord;
        console.log('user in sended in  submit two :', this.user);
        this.checkMail(this.user);
      } else {
        this.error = "les mots de passe ne sont pas egaux";
      }
    }
    if (this.stepTwoIsValid) {
      this.stepper.next();
      this.confirmationProcess=false;
    }
  }
  registerUser(user :Client){
    console.log('user a stocker finalement est :',user)
    this.userService.register(user).subscribe({
      next :(data) => {
        console.log("resultat est : ",data);
        this.snackBarService.showSuccess("Bienvenu "+data.lastName+" "+data.firstName)
        this.stepTwoIsValid=true;
      },
      error :(err) =>{
        this.stepTwoIsValid=false;
        this.confirmationProcess=false;
        this.error="erreur dans l'enregistrement de user !"
        console.log("erreur cote server !",err)
        this.snackBarService.showError(" vérifier les informations et réessayer une autre fois !")
      },
      complete :()=>{
        if(this.stepTwoIsValid){
          this.confirmationProcess=true;
          this.stepper.next();
        }
      }
    })
  }
 /* deleteImage(id: number
  ): void {
    Swal.fire({
      title: 'Confirmation',
      text: 'Are you sure you want to continue?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non',
    }).then((result) => {
      if (result.isConfirmed) {
        this.imageService.delete(id).subscribe(
          () => {

            Swal.fire('Image deleted !');

          },
          error => {
            console.error('Error deleting image:', error);
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Operation canceled', '', 'error');
      }
    });
  }
  fetchImages(): void {
    this.imageService.list().subscribe(
      (images) => {
        this.images = images;
      },
      (error) => {
        console.error('Error fetching images:', error);
      }
    );
  }*/

  authenticate() {
    this.router.navigate(["/authentication/signin"])
  }
}
