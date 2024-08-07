import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { HeaderSirhClientComponent } from "../../../header-sirh-client/header-sirh-client.component";
import { contractType } from 'app/models/contractType.model';
import { ContractService } from 'app/services/contract.service';
import { SnackBarService } from 'app/services/snackBar.service';
import { ClassificationService } from 'app/services/classification.service';
import { classificationType } from 'app/models/classificationType.model';

@Component({
  selector: 'app-parametrage',
  standalone: true,
  imports: [FormsModule, MatDatepickerModule, MatCheckboxModule, MatIconModule, ReactiveFormsModule, MatSelectModule, MatNativeDateModule, MatInputModule, NgFor, NgIf, MatListModule, MatCardModule, MatButtonModule, HeaderSirhClientComponent],
  templateUrl: './parametrage.component.html',
  styleUrl: './parametrage.component.scss'
})
export class ParametrageComponent implements OnInit {
  formGroup!: FormGroup;
  contractTypes!: contractType[];
  classificationTypes!: classificationType[];


  constructor(private fb: FormBuilder,private dialog:MatDialog,private contractService:ContractService,private classificationService:ClassificationService,private snackBarService:SnackBarService) { }

  ngOnInit(): void {
    this.initializeForm();
    this.loadContractTypes();
    this.loadClassificationTypes();
    this.addCheckboxListeners();
  }

  initializeForm(): void {
    this.formGroup = this.fb.group({
      conteur: ['', Validators.required],
      bulletinpaie: [false, Validators.required], 
      datevalidite: ['', Validators.required],
      finValidite: ['', Validators.required],
      unite: ['', Validators.required],
      calendrierType: ['', Validators.required],
      Statut: ['', Validators.required],
      Droitlegal: [false, Validators.required], 
      Droitentreprise: [false, Validators.required], 
      autoriseDefalcation: [false, Validators.required], 
      nbrDefalcation: [{ value: '', disabled: true }, Validators.required],
      autorisationRencondiction: [false, Validators.required], 
      Delai: [{ value: '', disabled: true }, Validators.required],
      Minjours: ['', Validators.required],
      Maxjours: ['', Validators.required],
      Reliquat: [false, Validators.required], 
      nbrAnnee: [{ value: '', disabled: true }, Validators.required],
      sexe: ['', Validators.required],
      nbrJour: ['', Validators.required],
      contractType: ['', Validators.required],
      classificationType: ['', Validators.required],
    });
  }

  loadContractTypes(): void {
    this.contractService.getAllTypes().subscribe({
      next: (value) => {
        this.contractTypes = value;
      },
      error: (err) => {
        console.error('Error fetching Countries :', err);
        this.snackBarService.showError(err);
      }
    })
  }

  loadClassificationTypes(): void {
    this.classificationService.getAllTypes().subscribe({
      next: (value) => {
        this.classificationTypes = value;
      },
      error: (err) => {
        console.error('Error fetching Classifications :', err);
        this.snackBarService.showError(err);
      }
    })
  }

  addCheckboxListeners(): void {
    this.formGroup.get('autoriseDefalcation')?.valueChanges.subscribe(value => {
      this.toggleControl('nbrDefalcation', value);
    });
    this.formGroup.get('autorisationRencondiction')?.valueChanges.subscribe(value => {
      this.toggleControl('Delai', value);
    });
    this.formGroup.get('reliquat')?.valueChanges.subscribe(value => {
      this.toggleControl('nbrAnnee', value);
    });
  }

  toggleControl(controlName: string, enable: boolean): void {
    if (enable) {
      this.formGroup.get(controlName)?.enable();
    } else {
      this.formGroup.get(controlName)?.disable();
    }
  }

}
