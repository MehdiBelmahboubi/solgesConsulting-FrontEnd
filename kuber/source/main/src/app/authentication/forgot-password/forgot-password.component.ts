import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatStep, MatStepLabel, MatStepper, MatStepperNext, MatStepperPrevious} from "@angular/material/stepper";
import {NgIf} from "@angular/common";
@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss'],
    standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    MatStep,
    MatStepLabel,
    MatStepper,
    MatStepperNext,
    MatStepperPrevious,
    NgIf,
  ],
})
export class ForgotPasswordComponent implements OnInit {
  authForm!: UntypedFormGroup;
  authFormEmail!: UntypedFormGroup;
  submitted = false;
  returnUrl!: string;
  chide = true;
  hide = true;
  isLinear = false;


  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit() {
    this.authFormEmail = this.formBuilder.group({
      email: ['',[Validators.required, Validators.email, Validators.minLength(5)]]});

    this.authForm = this.formBuilder.group({
      uuid : ['',
        [ Validators.required,
          Validators.maxLength(8),
          Validators.minLength(8)
        ]],
      passWord : ['',
        [ Validators.required,
          Validators.maxLength(14),
          Validators.minLength(4)
        ]],
      confirmPassWord : ['',
        [ Validators.required,
          Validators.maxLength(14),
          Validators.minLength(4)
        ]],
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  get f() {
    return this.authForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.authForm.invalid) {
      return;
    } else {
      this.router.navigate(['/dashboard/main']);
    }
  }

  sendUuidToUser() {

  }
}
