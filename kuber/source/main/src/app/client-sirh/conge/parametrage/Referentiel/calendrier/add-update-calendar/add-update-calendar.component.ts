import { Component } from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatCard, MatCardActions, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MatChip} from "@angular/material/chips";
import {MatError, MatFormField, MatHint, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatOptgroup, MatSelect} from "@angular/material/select";
import {MatTooltip} from "@angular/material/tooltip";
import {NgForOf, NgIf} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatOptionModule} from "@angular/material/core";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {CdkTextareaAutosize} from "@angular/cdk/text-field";
import {MatCheckbox} from "@angular/material/checkbox";

@Component({
  selector: 'app-add-update-calendar',
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
    MatChip, MatCheckbox, NgForOf],
  templateUrl: './add-update-calendar.component.html',
  styleUrl: './add-update-calendar.component.scss'
})
export class AddUpdateCalendarComponent {
  newTypeError = '';
  formGroup!: FormGroup;
  jrFeries: any;
  daysOfWeekOptions: string[] = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm(): void {
    this.formGroup = this.fb.group({
      code: ['', Validators.required],
      feteType: ['', Validators.required],
      jrFerier: ['', Validators.required],
      Lundi: ['', Validators.required],
      Mardi: ['', Validators.required],
      Mercredi: ['', Validators.required],
      Jeudi: ['', Validators.required],
      Vendredi: ['', Validators.required],
      Samedi: ['', Validators.required],
      Dimanche: ['', Validators.required],
    });
  }
  close() {
    throw new Error('Method not implemented.');
  }
}
