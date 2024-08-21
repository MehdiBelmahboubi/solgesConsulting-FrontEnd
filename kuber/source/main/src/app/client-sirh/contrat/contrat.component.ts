import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SnackBarService } from 'app/services/snackBar.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { CommonModule } from '@angular/common'; // Ajoutez cette ligne
import { Collaborater } from 'app/models/collaborater.model';
import { HeaderSirhClientComponent } from "../header-sirh-client/header-sirh-client.component";

@Component({
  selector: 'app-contrat',
  standalone: true,
  imports: [
    CommonModule,  // Ajoutez CommonModule ici
    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatCardModule,
    MatCheckboxModule,
    MatIconModule,
    MatNativeDateModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatRadioModule,
    HeaderSirhClientComponent
  ],
  templateUrl: './contrat.component.html',
  styleUrls: ['./contrat.component.scss']
})
export class ContratComponent implements OnInit {
  formGroup!: FormGroup;
  @Input() collaborater!: Collaborater;
  @Input() mode!: string;
  addMode!: boolean;
  editMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBarService: SnackBarService
  ) {}

  ngOnInit(): void {
    this.setMode();
    this.initializeForm();
    this.addCheckboxListeners();
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
      refcontrat: ['', Validators.required],
      contractType: ['', Validators.required],
      dateentree: ['', Validators.required],
      Motifdepart: ['', Validators.required],
      datesortie: ['', Validators.required],
      depdifinitif: [false],
      depnego: [false],
      depretrete: [false],
      depinvalid: [false],
      deplicence: [false],
      deceagent: [false],
      stc: [false],
      datedecetagent: [{ value: '', disabled: true }, Validators.required],
      stctraite: [''],
      civnonpren: [''],
      datestc: [''],
      datecertifdece: [{ value: '', disabled: true }, Validators.required]
    });

    this.formGroup.get('Motifdepart')?.valueChanges.subscribe(value => {
      if (value === 'deceagent') {
        this.enableDateControls();
      } else {
        this.disableDateControls();
      }
    });
  }

  addCheckboxListeners(): void {
    // Existing checkbox listener logic
  }

  enableDateControls(): void {
    this.formGroup.get('datedecetagent')?.enable();
    this.formGroup.get('datecertifdece')?.enable();
  }

  disableDateControls(): void {
    this.formGroup.get('datedecetagent')?.disable();
    this.formGroup.get('datecertifdece')?.disable();
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
      if (control.endsWith('Saisi')) continue; // Keep the checkboxes enabled
      this.formGroup.controls[control].disable();
    }
  }
}
