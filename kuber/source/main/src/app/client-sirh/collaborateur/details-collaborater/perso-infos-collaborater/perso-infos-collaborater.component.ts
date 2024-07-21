import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { Collaborater } from 'app/models/collaborater.model';
import { Country } from 'app/models/country.model';
import { CollaboraterService } from 'app/services/collaborater.service';
import { CountryService } from 'app/services/country.service';
import { SnackBarService } from 'app/services/snackBar.service';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-perso-infos-collaborater',
  standalone: true,
  imports: [FormsModule, MatDatepickerModule, ReactiveFormsModule, MatListModule, MatCardModule, MatNativeDateModule, MatInputModule, NgIf, MatButtonModule, MatOptionModule, MatFormFieldModule, MatFormFieldModule, NgFor, MatSelectModule],
  templateUrl: './perso-infos-collaborater.component.html',
  styleUrls: ['./perso-infos-collaborater.component.scss']
})
export class PersoInfosCollaboraterComponent implements OnInit {
  collaborater: Collaborater = new Collaborater();
  countries!: Country[];
  addMode: boolean = false;
  editMode: boolean = false;
  formGroup!: FormGroup;

  constructor(private fb: FormBuilder, private collaboraterService: CollaboraterService, private router: Router, private snackBarService: SnackBarService, private countryService: CountryService) {
    if (history.state && history.state.collaborater) {
      this.collaborater = history.state.collaborater;
    } else if (history.state && history.state.collaboraterEdit) {
      this.collaborater = history.state.collaboraterEdit;
      this.editMode = true;
    } else {
      this.addMode = true;
    }

    this.countryService.getAllNationalities().subscribe({
      next: (value) => {
        this.countries = value;
      },
      error: (err) => {
        console.error('Error fetching Countries:', err);
      }
    });
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      matricule: [{ value: '', disabled: !this.addMode && !this.editMode }, Validators.required],
      firstName: [{ value: '', disabled: !this.addMode && !this.editMode }, Validators.required],
      lastName: [{ value: '', disabled: !this.addMode && !this.editMode }, Validators.required],
      lieuNaissance: [{ value: '', disabled: !this.addMode && !this.editMode }, Validators.required],
      dateNaissance: [{ value: '', disabled: !this.addMode && !this.editMode }, Validators.required],
      sexe: [{ value: '', disabled: !this.addMode && !this.editMode }, Validators.required],
      nationalite1: [{ value: '', disabled: !this.addMode && !this.editMode }, Validators.required],
      nationality2: [{ value: '', disabled: !this.addMode && !this.editMode }, Validators.required],
      initiales: [{ value: '', disabled: !this.addMode && !this.editMode }, Validators.required],
      nomJeuneFille: [{ value: '', disabled: !this.addMode && !this.editMode }, Validators.required],
    });
  }

  openEditMode(): void {
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
