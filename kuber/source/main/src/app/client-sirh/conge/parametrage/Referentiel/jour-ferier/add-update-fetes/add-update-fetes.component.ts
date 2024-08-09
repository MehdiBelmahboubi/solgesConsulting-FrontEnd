import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatIconButton, MatButton } from '@angular/material/button';
import { MatCard, MatCardTitle, MatCardContent, MatCardActions } from '@angular/material/card';
import { MatOptgroup, MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatLabel, MatHint, MatFormField, MatError, MatSuffix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-add-update-fetes',
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
    NgIf],
  templateUrl: './add-update-fetes.component.html',
  styleUrl: './add-update-fetes.component.scss'
})
export class AddUpdateFetesComponent {
  newTypeError = '';
  FormGroup!: FormGroup;
  feteTypes: any;
  fetes: any;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm(): void {
    this.FormGroup = this.fb.group({
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
}
