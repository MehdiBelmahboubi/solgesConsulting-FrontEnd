import { Component } from '@angular/core';
import {MatCard, MatCardActions, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MatError, MatFormField, MatHint, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatOptgroup, MatOption, MatSelect} from "@angular/material/select";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CdkTextareaAutosize} from "@angular/cdk/text-field";
import {MatInput} from "@angular/material/input";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";
import {MatIcon} from "@angular/material/icon";
import {NgIf} from "@angular/common";
import {MatOptionModule} from "@angular/material/core";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatChip} from "@angular/material/chips";

@Component({
  selector: 'app-add-edit-droitlegal',
  standalone: true,
  imports: [MatCard,
    MatCardTitle,
    MatCardContent,
    MatLabel,
    MatSelect,
    MatOptgroup,
    MatHint,
    MatOptionModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    CdkTextareaAutosize,
    MatInput,
    MatFormField,
    MatCardActions,
    MatIconButton,
    MatTooltip,
    MatButton,
    MatError,
    MatIcon,
    MatSuffix,
    NgIf,
    MatChip],
  templateUrl: './add-edit-droitlegal.component.html',
  styleUrl: './add-edit-droitlegal.component.scss'
})
export class AddEditDroitlegalComponent {
  newTypeError = '';
  formGroup!: FormGroup;
  contraintes: any[] = [];
  champs: string[] = ['Champ 1', 'Champ 2', 'Champ 3'];

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm(): void {
    this.formGroup = this.fb.group({
      code: ['', Validators.required],
      feteType: ['', Validators.required],
      libelle: ['', Validators.required],
    });
  }

  addFete() {
    throw new Error('Method not implemented.');
  }
  close() {
    throw new Error('Method not implemented.');
  }

  removeContrainte(contrainte:any) {
    throw new Error('Method not implemented.');
  }

  addContrainte() {
    throw new Error('Method not implemented.');
  }
}
