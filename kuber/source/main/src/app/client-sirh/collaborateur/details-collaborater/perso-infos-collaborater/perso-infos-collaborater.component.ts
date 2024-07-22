import { NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
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
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-perso-infos-collaborater',
  standalone: true,
  imports: [FormsModule, MatDatepickerModule, ReactiveFormsModule, MatListModule,MatIconModule, MatCardModule, MatNativeDateModule, MatInputModule, NgIf, MatButtonModule, MatOptionModule, MatFormFieldModule, MatFormFieldModule, NgFor, MatSelectModule],
  templateUrl: './perso-infos-collaborater.component.html',
  styleUrls: ['./perso-infos-collaborater.component.scss']
})
export class PersoInfosCollaboraterComponent implements OnInit {
  @Input() collaborater!:Collaborater;
  @Input() mode!:string;
  countries!: Country[];
  addMode!: boolean;
  editMode!: boolean;
  formGroup!: FormGroup;

  constructor(private fb: FormBuilder, private collaboraterService: CollaboraterService, private router: Router, private snackBarService: SnackBarService, private countryService: CountryService) {}

  ngOnInit(){
    if(this.mode==="editMode"){
      this.editMode=true;
    }else if(this.mode==="addMode")
    {
      this.addMode=true;
    }
    this.formGroup = this.fb.group({
      matricule: [{ value: '', disabled: !this.addMode && !this.editMode }, Validators.required],
      firstName: [{ value: '', disabled: !this.addMode && !this.editMode }, Validators.required],
      lastName: [{ value: '', disabled: !this.addMode && !this.editMode }, Validators.required],
      lieuNaissance: [{ value: '', disabled: !this.addMode && !this.editMode }, Validators.required],
      dateNaissance: [{ value: '', disabled: !this.addMode && !this.editMode }, Validators.required],
      sexe: [{ value: '', disabled: !this.addMode && !this.editMode }, Validators.required],
      countryCode1: [{ value: '', disabled: !this.addMode && !this.editMode }, Validators.required],
      countryCode2: [{ value: '', disabled: !this.addMode && !this.editMode }, Validators.required],
      initiales: [{ value: '', disabled: !this.addMode && !this.editMode }, Validators.required],
      nomJeuneFille: [{ value: '', disabled: !this.addMode && !this.editMode }, Validators.required],
    });
    
    this.countryService.getAllNationalities().subscribe({
      next: (value) => {
        this.countries = value;
      },
      error: (err) => {
        console.error('Error fetching Countries:', err);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['collaborater'] && this.collaborater&& this.formGroup) {
      this.formGroup.patchValue(this.collaborater);
    }
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
    const newCollaborater = { ...this.collaborater, ...this.formGroup.value };
    this.collaboraterService.addCollaborateur(newCollaborater).subscribe({
      next: () => {
        this.snackBarService.showSuccess('Collaborator created successfully!');
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
