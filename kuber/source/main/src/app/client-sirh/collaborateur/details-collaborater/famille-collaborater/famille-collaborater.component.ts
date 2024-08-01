import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, model, OnInit, Output, SimpleChanges } from '@angular/core';
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
  styleUrls: ['./famille-collaborater.component.scss']
})
export class FamilleCollaboraterComponent implements OnInit {
  @Input() collaborater!: Collaborater;
  @Input() mode!: string;
  @Output() collaboratorUpdated = new EventEmitter<any>();
  addMode!: boolean;
  editMode: boolean = false;
  formGroup!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private collaboraterService: CollaboraterService,
    private router: Router,
    private snackBarService: SnackBarService
  ) { }

  ngOnInit(): void {
    this.setMode();
    this.initializeForm();
    this.addCheckboxListeners();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['collaborater'] && this.collaborater && this.formGroup) {
      this.formGroup.patchValue(this.collaborater);
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
      nbEpousesSaisi: [{ value: '', disabled: !this.addMode && !this.editMode }],
      nbEpouses: [{ value: '', disabled: true }, Validators.required],
      nbEnfantsSaisi: [{ value: '', disabled: !this.addMode && !this.editMode }],
      nbEnfants: [{ value: '', disabled: true }, Validators.required],
      nbEnfantsChargeSaisi: [{ value: '', disabled: !this.addMode && !this.editMode }],
      nbEnfantCharge: [{ value: '', disabled: true }, Validators.required],
      nbPersCharge: [{ value: '', disabled: !this.addMode && !this.editMode }, Validators.required],
    });
  }

  addCheckboxListeners(): void {
    this.formGroup.get('nbEpousesSaisi')?.valueChanges.subscribe(value => {
      this.toggleControl('nbEpouses', value);
    });
    this.formGroup.get('nbEnfantsSaisi')?.valueChanges.subscribe(value => {
      this.toggleControl('nbEnfants', value);
    });
    this.formGroup.get('nbEnfantsChargeSaisi')?.valueChanges.subscribe(value => {
      this.toggleControl('nbEnfantCharge', value);
    });
  }

  toggleControl(controlName: string, enable: boolean): void {
    if (enable) {
      this.formGroup.get(controlName)?.enable();
    } else {
      this.formGroup.get(controlName)?.disable();
    }
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
        this.snackBarService.showError(err);
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
