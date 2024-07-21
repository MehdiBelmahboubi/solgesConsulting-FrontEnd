import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { Collaborater } from 'app/models/collaborater.model';
import { CollaboraterService } from 'app/services/collaborater.service';
import { MatCardModule } from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import { Router } from '@angular/router';
import { SnackBarService } from 'app/services/snackBar.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-coordonnees-collaborater',
  standalone: true,
  imports: [FormsModule, MatDatepickerModule, MatNativeDateModule,ReactiveFormsModule, MatInputModule, NgIf, MatButtonModule, MatCardModule,MatListModule ],
  templateUrl: './coordonnees-collaborater.component.html',
  styleUrl: './coordonnees-collaborater.component.scss'
})
export class CoordonneesCollaboraterComponent implements OnInit{
  collaborater: Collaborater = new Collaborater();
  addMode!: Boolean;
  editMode: boolean = false;
  formGroup!: FormGroup;


  constructor(private fb: FormBuilder, private collaboraterService: CollaboraterService, private router: Router, private snackBarService: SnackBarService) {
    if (history.state && history.state.collaborater) {
      this.collaborater = history.state.collaborater;
    } else if (history.state && history.state.collaboraterEdit) {
      this.collaborater = history.state.collaboraterEdit;
      this.editMode = true;
    } else {
      this.addMode = true;
    }


  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      telephone: [{ value: '', disabled: !this.addMode && !this.editMode }, Validators.required],
      tel1: [{ value: '', disabled: !this.addMode && !this.editMode }, Validators.required],
      tel2: [{ value: '', disabled: !this.addMode && !this.editMode }, Validators.required],
      tel3: [{ value: '', disabled: !this.addMode && !this.editMode }, Validators.required],
      email1: [{ value: '', disabled: !this.addMode && !this.editMode }, Validators.required],
      email2: [{ value: '', disabled: !this.addMode && !this.editMode }, Validators.required],
      email3: [{ value: '', disabled: !this.addMode && !this.editMode }, Validators.required],
      adresse: [{ value: '', disabled: !this.addMode && !this.editMode }, Validators.required],
      adresse2: [{ value: '', disabled: !this.addMode && !this.editMode }, Validators.required],
      adresse3: [{ value: '', disabled: !this.addMode && !this.editMode }, Validators.required],
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
    this.collaboraterService.addCollaborateur(this.collaborater).subscribe({
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
    this.collaboraterService.editCollaborateur(this.collaborater).subscribe({
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
