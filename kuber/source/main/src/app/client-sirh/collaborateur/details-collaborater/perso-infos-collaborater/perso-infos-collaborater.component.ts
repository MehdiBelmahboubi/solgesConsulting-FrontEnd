import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
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
  imports: [FormsModule, MatDatepickerModule, ReactiveFormsModule, MatListModule,MatIconModule, MatCardModule, MatNativeDateModule, MatInputModule, NgIf, MatButtonModule, MatOptionModule, MatFormFieldModule, NgFor, MatSelectModule],
  templateUrl: './perso-infos-collaborater.component.html',
  styleUrls: ['./perso-infos-collaborater.component.scss']
})
export class PersoInfosCollaboraterComponent implements OnInit {
  @Input() collaborater!: Collaborater;
  @Input() mode!: string;
  @Output() collaboratorUpdated = new EventEmitter<any>();
  countries!: Country[];
  addMode!: boolean;
  editMode!: boolean;
  formGroup!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private collaboraterService: CollaboraterService,
    private router: Router,
    private snackBarService: SnackBarService,
    private countryService: CountryService
  ) {}

  ngOnInit() {
    this.setMode();
    this.initializeForm();
    this.loadCountries();

    if (this.collaborater) {
      this.populateForm();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['collaborater'] && this.collaborater && this.formGroup) {
      this.populateForm();
    }
  }

  setMode(): void {
    if (this.mode === 'editMode') {
      this.editMode = true;
    } else if (this.mode === 'addMode') {
      this.addMode = true;
    }
  }

  initializeForm(): void {
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
  }

  loadCountries(): void {
    this.countryService.getAllNationalities().subscribe({
      next: (value) => {
        this.countries = value;
      },
      error: (err) => {
        console.error('Error fetching Countries:', err);
      }
    });
  }

  populateForm(): void {
    this.formGroup.patchValue(this.collaborater);
    if (this.collaborater.countries) {
      const countries = this.collaborater.countries;
      if (countries.length > 0) {
        this.formGroup.patchValue({
          countryCode1: countries[0].code,
          countryCode2: countries.length > 1 ? countries[1].code : ''
        });
      }
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
      next: (value) => {
        this.snackBarService.showSuccess('Collaborator created successfully!');
        this.collaboratorUpdated.emit(value);
      },
      error: (err) => {
        console.error('Error Adding Collaborator:', err);
      }
    });
  }

  editCollaborater(): void {
    const newCollaborater = { ...this.collaborater, ...this.formGroup.value };
    this.collaboraterService.editCollaborateur(newCollaborater).subscribe({
      next: (value) => {
        this.snackBarService.showSuccess('Collaborator updated successfully!');
        this.collaborater = value;
        this.collaboratorUpdated.emit(this.collaborater);
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
