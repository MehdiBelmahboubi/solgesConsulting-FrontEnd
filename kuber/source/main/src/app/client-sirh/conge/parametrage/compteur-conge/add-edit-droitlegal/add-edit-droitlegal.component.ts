import { Component } from '@angular/core';
import {MatCard, MatCardActions, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MatError, MatFormField, MatHint, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatOptgroup, MatSelect} from "@angular/material/select";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CdkTextareaAutosize} from "@angular/cdk/text-field";
import {MatInput} from "@angular/material/input";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";
import {MatIcon} from "@angular/material/icon";
import {NgFor, NgIf} from "@angular/common";
import {MatOptionModule} from "@angular/material/core";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatChip} from "@angular/material/chips";
import {ContractService} from "../../../../../services/contract.service";
import {ClassificationService} from "../../../../../services/classification.service";
import {contractType} from "../../../../../models/contractType.model";
import {classificationType} from "../../../../../models/classificationType.model";
import {SnackBarService} from "../../../../../services/snackBar.service";

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
    NgFor,
    MatChip, FormsModule],
  templateUrl: './add-edit-droitlegal.component.html',
  styleUrl: './add-edit-droitlegal.component.scss'
})
export class AddEditDroitlegalComponent {
  newTypeError = '';
  formGroup!: FormGroup;
  contractTypes!: contractType[];
  classificationTypes!: classificationType[];
  contraintes: any[] = [];
  sexeOptions:any[]=[];
  filteredOptions: any[] = [];
  contractOptions: any[] = [];
  classificationOptions: any[] = [];
  selectedType: string = '';
  selectedOption: string = '';
  champs: string[] = ['Champ 1', 'Champ 2', 'Champ 3'];

  constructor(private fb: FormBuilder,
              private contractService:ContractService,
              private classificationService:ClassificationService,
              private snackBarService:SnackBarService) { }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm(): void {
    this.formGroup = this.fb.group({
      nbJour: ['', Validators.required],
      champContrainte: ['', Validators.required],
      valeurContrainte: ['', Validators.required],
    });
  }

  loadContractTypes(): void {
    this.contractService.getAllTypes().subscribe({
      next: (value) => {
        this.contractTypes = value;
        this.updateFilteredOptions();
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
        this.updateFilteredOptions();
      },
      error: (err) => {
        console.error('Error fetching Classifications :', err);
        this.snackBarService.showError(err);
      }
    })
  }

  updateFilteredOptions(): void {
    if (this.selectedType === 'contract') {
      this.filteredOptions = this.contractOptions.map(option => ({
        id: option.id,
        label: option.code,
        type: 'contract'
      }));
    } else if (this.selectedType === 'classification') {
      this.filteredOptions = this.classificationOptions.map(option => ({
        id: option.id,
        label: option.nom,
        type: 'classification'
      }));
    } else if (this.selectedType === 'sexe') {
      this.filteredOptions = this.sexeOptions;
    }else {
      this.filteredOptions = [];
    }
  }

  onTypeChange(event: any): void {
    this.selectedType = event.value.trim().toLowerCase();
    this.formGroup.get('valeurContrainte')?.reset(); // Reset the selected option

    if (this.selectedType === 'contract') {
      this.loadContractTypes();
    } else if (this.selectedType === 'classification') {
      this.loadClassificationTypes();
    } else if (this.selectedType === 'sexe') {
      this.filteredOptions = this.sexeOptions;
    } else {
      this.filteredOptions = [];
    }
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
