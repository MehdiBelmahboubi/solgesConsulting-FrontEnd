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

@Component({
  selector: 'app-parametrage',
  standalone: true,
  imports: [FormsModule, MatDatepickerModule,MatCheckboxModule,ReactiveFormsModule,MatSelectModule, MatNativeDateModule, MatInputModule,NgFor, NgIf,MatListModule,MatCardModule, MatButtonModule],
  templateUrl: './parametrage.component.html',
  styleUrl: './parametrage.component.scss'
})
export class ParametrageComponent implements OnInit{
  formGroup!: FormGroup;

  constructor(private fb: FormBuilder){}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      Conteur: ['', Validators.required],
      bulletinpaie: ['', Validators.required],
      datevalidite: ['', Validators.required],
      Finvalidite: ['', Validators.required],
      unite: ['', Validators.required],
      calendrierType: ['', Validators.required],
      Statut: ['', Validators.required],
      Droitlegal: ['', Validators.required],
      Droitentreprise: ['', Validators.required],
      deviser: ['', Validators.required],
      Combient: ['', Validators.required],
      Autorisationrencondiction: ['', Validators.required],
      Delai: ['', Validators.required],
      Minjours: ['', Validators.required],
      Maxjours: ['', Validators.required],
      Reliquat: ['', Validators.required],
      Nombreannee: ['', Validators.required],
    });
  }
}
