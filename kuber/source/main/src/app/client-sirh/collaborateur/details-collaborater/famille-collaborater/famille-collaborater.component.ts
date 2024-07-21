import { NgIf } from '@angular/common';
import { Component, model, OnInit } from '@angular/core';
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
  labelPosition: any;
  labelPosition2: any;
  labelPosition3: any;
  readonly enable = model(false);
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
