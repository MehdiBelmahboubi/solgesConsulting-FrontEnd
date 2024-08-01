import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { Collaborater } from 'app/models/collaborater.model';
import { CollaboraterService } from 'app/services/collaborater.service';
import {ChangeDetectionStrategy} from '@angular/core';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { SnackBarService } from 'app/services/snackBar.service';

@Component({
  selector: 'app-immatriculation-collaborater',
  standalone: true,
  imports: [FormsModule, MatDatepickerModule,ReactiveFormsModule, MatNativeDateModule, MatInputModule,MatIconModule, NgIf, MatButtonModule,MatListModule, MatDividerModule, MatCardModule],
  templateUrl: './immatriculation-collaborater.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './immatriculation-collaborater.component.scss'
})
export class ImmatriculationCollaboraterComponent implements OnInit {
  @Input() collaborater!:Collaborater;
  @Input() mode!:string;
  @Output() collaboratorUpdated = new EventEmitter<any>();
  addMode!: Boolean;
  editMode: boolean = false;
  formGroup!: FormGroup;
  constructor(private fb: FormBuilder, private collaboraterService: CollaboraterService, private router: Router, private snackBarService: SnackBarService) { 
  }

  ngOnInit(): void {
    this.setMode();
    this.initializeForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['collaborater'] && this.collaborater&& this.formGroup) {
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
      cnie: [{ value: '', disabled: !this.addMode && !this.editMode }, Validators.required],
      cnieDelivreePar: [{ value: '', disabled: !this.addMode && !this.editMode }, Validators.required],
      cnieDelivreeLe: [{ value: '', disabled: !this.addMode && !this.editMode }, Validators.required],
      cnieExpireLe: [{ value: '', disabled: !this.addMode && !this.editMode }, Validators.required],
      numPassePort: [{ value: '', disabled: !this.addMode && !this.editMode }, Validators.required],
      passePortDelivreLe: [{ value: '', disabled: !this.addMode && !this.editMode }, Validators.required],
      passePortExpireLe: [{ value: '', disabled: !this.addMode && !this.editMode }, Validators.required],
      numPermisSejour: [{ value: '', disabled: !this.addMode && !this.editMode }, Validators.required],
      initiales: [{ value: '', disabled: !this.addMode && !this.editMode }, Validators.required],
      nomJeuneFille: [{ value: '', disabled: !this.addMode && !this.editMode }, Validators.required],
      natPermisSejour: [{ value: '', disabled: !this.addMode && !this.editMode }, Validators.required],
      permisSejourDelivreLe: [{ value: '', disabled: !this.addMode && !this.editMode }, Validators.required],
      permisSejourDebVal: [{ value: '', disabled: !this.addMode && !this.editMode }, Validators.required],
      permisSejourFinVal: [{ value: '', disabled: !this.addMode && !this.editMode }, Validators.required],
      numPermisTravail: [{ value: '', disabled: !this.addMode && !this.editMode }, Validators.required],
      natPermisTravail: [{ value: '', disabled: !this.addMode && !this.editMode }, Validators.required],
      permisTravailDelivreLe: [{ value: '', disabled: !this.addMode && !this.editMode }, Validators.required],
      permisTravailDebVal: [{ value: '', disabled: !this.addMode && !this.editMode }, Validators.required],
      permisTravailFinVal: [{ value: '', disabled: !this.addMode && !this.editMode }, Validators.required],
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

  editCollaborater(): void {
    const newCollaborater = { ...this.collaborater, ...this.formGroup.value };
    this.collaboraterService.editCollaborateur(newCollaborater).subscribe({
      next: (value) => {
        this.snackBarService.showSuccess('Collaborator updated successfully!');
        this.collaborater=value;
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
