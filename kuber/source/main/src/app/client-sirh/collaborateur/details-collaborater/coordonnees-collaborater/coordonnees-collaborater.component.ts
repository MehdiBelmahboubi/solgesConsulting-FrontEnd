import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
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
  @Input() collaborater!:Collaborater;
  @Input() mode!:string;
  @Output() collaboratorUpdated = new EventEmitter<any>();
  addMode!: Boolean;
  editMode: boolean = false;
  formGroup!: FormGroup;


  constructor(private fb: FormBuilder, private collaboraterService: CollaboraterService, private router: Router, private snackBarService: SnackBarService) {}

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
      telephone: [{ value: '', disabled: !this.addMode && !this.editMode }, [Validators.required, Validators.pattern(/^(?:\+212|0)[5-7]\d{8}$/)]],
      tel1: [{ value: '', disabled: !this.addMode && !this.editMode }, [Validators.required, Validators.pattern(/^(?:\+212|0)[5-7]\d{8}$/)]],
      tel2: [{ value: '', disabled: !this.addMode && !this.editMode }, [Validators.required, Validators.pattern(/^(?:\+212|0)[5-7]\d{8}$/)]],
      tel3: [{ value: '', disabled: !this.addMode && !this.editMode }, [Validators.required, Validators.pattern(/^(?:\+212|0)[5-7]\d{8}$/)]],
      email1: [{ value: '', disabled: !this.addMode && !this.editMode }, Validators.required],
      email2: [{ value: '', disabled: !this.addMode && !this.editMode }, Validators.required],
      email3: [{ value: '', disabled: !this.addMode && !this.editMode }, Validators.required],
      adresse1: [{ value: '', disabled: !this.addMode && !this.editMode }, Validators.required],
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
