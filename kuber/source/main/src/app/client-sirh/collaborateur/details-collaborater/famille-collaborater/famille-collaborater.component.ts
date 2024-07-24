import { NgIf } from '@angular/common';
import { Component, Input, model, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { Collaborater } from 'app/models/collaborater.model';
import { CollaboraterService } from 'app/services/collaborater.service';
import { MatRadioModule } from '@angular/material/radio';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Router } from '@angular/router';
import { SnackBarService } from 'app/services/snackBar.service';

@Component({
  selector: 'app-famille-collaborater',
  standalone: true,
  imports: [FormsModule, MatDatepickerModule,ReactiveFormsModule, MatNativeDateModule, MatInputModule, NgIf, MatButtonModule, MatRadioModule, MatListModule, MatCardModule, MatCheckboxModule],
  templateUrl: './famille-collaborater.component.html',
  styleUrl: './famille-collaborater.component.scss'
})
export class FamilleCollaboraterComponent implements OnInit {
  @Input() collaborater!:Collaborater;
  @Input() mode!:string;
  addMode!: Boolean;
  editMode: boolean = false;
  formGroup!: FormGroup;


  constructor(private fb: FormBuilder, private collaboraterService: CollaboraterService, private router: Router, private snackBarService: SnackBarService) { }

  ngOnInit(): void {
    if(this.mode==="editMode"){
      this.editMode=true;
    }else if(this.mode==="addMode")
    {this.addMode=true;}
    this.formGroup = this.fb.group({
      nbEpousesSaisi: [{ value: '', disabled: !this.addMode && !this.editMode }, Validators.required],
      nbEpouses: [{ value: '', disabled: !this.addMode && !this.editMode }, Validators.required],
      nbEnfantsSaisi: [{ value: '', disabled: !this.addMode && !this.editMode }, Validators.required],
      nbEnfants: [{ value: '', disabled: !this.addMode && !this.editMode }, Validators.required],
      nbEnfantsChargeSaisi: [{ value: '', disabled: !this.addMode && !this.editMode }, Validators.required],
      nbEnfantsCharge: [{ value: '', disabled: !this.addMode && !this.editMode }, Validators.required],
      nbPersCharge: [{ value: '', disabled: !this.addMode && !this.editMode }, Validators.required],
    });
  }

  openEditMode() {
    this.editMode = true;
    this.addMode = false;
    this.enableFormControls();
  }

  enableFormControls(): void {
    for (let control in this.formGroup.controls) {
      this.formGroup.controls[control].enable();
    }
  }

  disableFormControls(): void {
    for (let control in this.formGroup.controls) {
      this.formGroup.controls[control].disable();
    }
  }

  addCollaborater(): void {
    const newCollaborater = { ...this.collaborater, ...this.formGroup.value };
    this.collaboraterService.addCollaborateur(newCollaborater).subscribe({
      next: () => {
        this.snackBarService.showSuccess('Collaborator created successfully!');
        this.back();
      },
      error: (err) => {
        console.error('Error Adding Collaborator:', err);
      }
    });
  }

  editCollaborater(): void {
    const newCollaborater = { ...this.collaborater, ...this.formGroup.value };
    this.collaboraterService.editCollaborateur(newCollaborater).subscribe({
      next: () => {
        this.snackBarService.showSuccess('Collaborator updated successfully!');
        this.back();
      },
      error: (err) => {
        console.error('Error Updating Collaborator:', err);
      }
    });
  }

  back(): void {
    this.router.navigate(['/client/collaborateur']);
  }

  cancel(): void {
    this.editMode = false;
    this.disableFormControls();
  }
}
