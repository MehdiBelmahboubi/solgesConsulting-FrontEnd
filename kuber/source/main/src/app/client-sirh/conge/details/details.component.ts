import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { Collaborater } from 'app/models/collaborater.model';
import {MatListModule} from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { ClassificationService } from 'app/services/classification.service';
import { classificationType } from 'app/models/classificationType.model';
import { Classification } from 'app/models/classification.model';
import { Router } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HeaderSirhClientComponent } from "../../header-sirh-client/header-sirh-client.component";
@Component({
  selector: 'app-details',
  standalone: true,
  imports: [FormsModule, MatDatepickerModule, MatCheckboxModule, ReactiveFormsModule, MatSelectModule, MatNativeDateModule, MatInputModule, NgFor, NgIf, MatListModule, MatCardModule, MatButtonModule, HeaderSirhClientComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit{
  formGroup!: FormGroup;
  constructor(private fb: FormBuilder){}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      conge: ['', Validators.required],
      collaborateur: ['', Validators.required],
      debut: ['', Validators.required],
      Fin: ['', Validators.required],
      jrsconge: ['', Validators.required],
      jrscld: ['', Validators.required],
      jrsreel: ['', Validators.required],
     
    });
  }

  
}
