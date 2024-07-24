import { NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { Collaborater } from 'app/models/collaborater.model';
import { CollaboraterService } from 'app/services/collaborater.service';
import {MatListModule} from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { SnackBarService } from 'app/services/snackBar.service';
@Component({
  selector: 'app-autreinfo-collaborater',
  standalone: true,
  imports: [FormsModule,MatCheckboxModule, MatDatepickerModule, ReactiveFormsModule, MatIconModule, MatNativeDateModule, MatInputModule, NgIf, MatButtonModule,MatListModule, MatCardModule],
  templateUrl: './autreinfo-collaborater.component.html',
  styleUrl: './autreinfo-collaborater.component.scss'
})
export class AutreinfoCollaboraterComponent implements OnInit {
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
      dateDeces: [{ value: '', disabled: !this.addMode && !this.editMode }, Validators.required],
      dateCertifDeces: [{ value: '', disabled: !this.addMode && !this.editMode }, Validators.required],
      dateNaturalisation: [{ value: '', disabled: !this.addMode && !this.editMode }, Validators.required],
      active: [{ value: '', disabled: !this.addMode && !this.editMode }, Validators.required],
      recrutable: [{ value: '', disabled: !this.addMode && !this.editMode }, Validators.required],
      excluDeclaration: [{ value: '', disabled: !this.addMode && !this.editMode }, Validators.required],
      matriculeRecrutement: [{ value: '', disabled: !this.addMode && !this.editMode }, Validators.required],
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
