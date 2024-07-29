import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ContractService } from 'app/services/contract.service';
import { Contract } from 'app/models/contract.model';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgFor, NgIf } from '@angular/common';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatListModule} from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { contractType } from 'app/models/contractType.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contrat-collaborater',
  standalone: true,
  imports: [FormsModule, MatDatepickerModule,ReactiveFormsModule,MatOptionModule,MatSelectModule, MatNativeDateModule, MatInputModule, NgIf,NgFor, MatButtonModule,MatListModule, MatCardModule],
  templateUrl: './contrat-collaborater.component.html',
  styleUrls: ['./contrat-collaborater.component.scss']
})
export class ContratCollaboraterComponent implements OnInit{
  @Input() contract!:Contract;
  @Input() mode!:string;
  contractTypes!: contractType[];
  addMode!: Boolean;
  editMode: boolean = false;
  formGroup!: FormGroup;

  constructor(private fb: FormBuilder,private contractService: ContractService,private router: Router) { }

  ngOnInit(): void {
    if(this.mode==="editMode"){
      this.editMode=true;
    }else if(this.mode==="addMode")
    {this.addMode=true;}
    this.formGroup = this.fb.group({
      contractType: [{ value: '', disabled: !this.addMode && !this.editMode }, Validators.required],
      contractRef: [{ value: '', disabled: !this.addMode && !this.editMode }, Validators.required],
      motifRecrutement: [{ value: '', disabled: !this.addMode && !this.editMode }, Validators.required],
      periodNegocible: [{ value: '', disabled: !this.addMode && !this.editMode }, Validators.required],
      regimeFiscal: [{ value: '', disabled: !this.addMode && !this.editMode }, Validators.required],
      exonerationFiscale: [{ value: '', disabled: !this.addMode && !this.editMode }, Validators.required],
      motifDepart: [{ value: '', disabled: !this.addMode && !this.editMode }, Validators.required],
      dateEntree: [{ value: '', disabled: !this.addMode && !this.editMode }, Validators.required],
      dateFin: [{ value: '', disabled: !this.addMode && !this.editMode }, Validators.required],
    });
    this.contractService.getAllTypes().subscribe({
      next: (value) => {
        this.contractTypes = value;
      },
      error: (err) => {
        console.error('Error fetching Countries :', err);
      }
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['contract'] && this.contract&& this.formGroup) {
      this.formGroup.patchValue(this.contract);
    }
  }

  openEditMode(): void {
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
    
  }

  back() {
    this.router.navigate(['/client/collaborateur']);
  }

  cancel(): void {
    this.editMode = false;
    this.disableFormControls();
  }
}
