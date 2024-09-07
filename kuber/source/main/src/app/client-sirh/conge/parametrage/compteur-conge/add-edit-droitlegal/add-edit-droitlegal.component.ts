import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MatCard, MatCardActions, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MatError, MatFormField, MatHint, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatOptgroup, MatSelect, MatSelectChange} from "@angular/material/select";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CdkTextareaAutosize} from "@angular/cdk/text-field";
import {MatInput} from "@angular/material/input";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";
import {MatIcon} from "@angular/material/icon";
import {NgFor, NgIf} from "@angular/common";
import {MatOptionModule} from "@angular/material/core";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatChip, MatChipGrid, MatChipInput, MatChipRow, MatChipsModule} from "@angular/material/chips";
import {ContractService} from "../../../../../services/contract.service";
import {ClassificationService} from "../../../../../services/classification.service";
import {SnackBarService} from "../../../../../services/snackBar.service";
import {Droit} from "../../../../../models/droit.model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

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
    MatChip,MatChipsModule, FormsModule, MatChipGrid, MatChipRow, MatChipInput],
  templateUrl: './add-edit-droitlegal.component.html',
  styleUrl: './add-edit-droitlegal.component.scss'
})
export class AddEditDroitlegalComponent implements OnInit{
  newTypeError = '';
  formGroup!: FormGroup;
  contraintes: any[] = [];
  sexeOptions:any[]=[];
  filteredOptions: any[] = [];
  contractOptions: any[] = [];
  classificationOptions: any[] = [];
  selectedType: string = '';
  selectedOption: string = '';
  updateMode!:boolean;

  constructor(private fb: FormBuilder,
              private contractService:ContractService,
              private classificationService:ClassificationService,
              private snackBarService:SnackBarService,
              private dialogRef: MatDialogRef<AddEditDroitlegalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Droit) { }

  ngOnInit() {
    this.initializeForm();
    this.sexeOptions = [
      { id: 'Homme', label: 'Homme' },
      { id: 'Femme', label: 'Femme' }
    ];
    if (this.data.nbrJour!=undefined) {
      this.loadDroitData(this.data);
      this.updateMode=true;
    }
  }

  initializeForm(): void {
    this.formGroup = this.fb.group({
      nbJour: ['', Validators.required],
      champContrainte: [''],
      valeurContrainte: [''],
    });
  }

  loadDroitData(droit: Droit): void {
    this.formGroup.patchValue({
      nbJour: droit.nbrJour
    });

    // Populate the contraintes array based on existing data
    this.contraintes = [
      ...droit.contractTypes.map(ct => ({ champ: 'contract', valeur: ct })),
      ...droit.classificationTypes.map(ct => ({ champ: 'classification', valeur: ct })),
      ...droit.sexes.map(sexe => ({ champ: 'sexe', valeur: sexe }))
    ];

    this.updateFilteredOptions();
  }

  loadContractTypes(): void {
    this.contractService.getAllTypes().subscribe({
      next: (value) => {
        this.contractOptions = value;
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
        this.classificationOptions = value;
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

  onTypeChange(event: MatSelectChange) {
    this.selectedType = event.value.trim().toLowerCase();
    this.filteredOptions=[];
    this.newTypeError ='';

    if (this.selectedType === 'contract') {
      this.loadContractTypes();
    } else if (this.selectedType === 'classification') {
      this.loadClassificationTypes();
    } else if (this.selectedType === 'sexe') {
      this.updateFilteredOptions();
    } else {
      this.filteredOptions = [];
    }
  }

  addContrainte() {
    const champContrainte = this.formGroup.get('champContrainte')?.value;
    const valeurContrainteId = this.formGroup.get('valeurContrainte')?.value;

    // Find the label for the selected option
    const selectedOption = this.filteredOptions.find(option => option.id === valeurContrainteId);
    const valeurContrainte = selectedOption ? selectedOption.label : '';

    if (champContrainte && valeurContrainte) {
      // Add the constraint to the array
      this.contraintes.push({
        champ: champContrainte,
        valeur: valeurContrainte
      });

      // Clear the form fields after adding
      this.formGroup.get('champContrainte')?.reset();
      this.formGroup.get('valeurContrainte')?.reset();
      this.filteredOptions = [];
    } else {
      this.newTypeError = 'Veuillez sélectionner une contrainte valide.';
    }
  }

  removeContrainte(contrainte: any) {
    const index = this.contraintes.indexOf(contrainte);
    if (index >= 0) {
      this.contraintes.splice(index, 1);
    }
  }

  addDroit() {
    if (this.formGroup.invalid) {
      this.newTypeError = 'Veuillez remplir tous les champs requis.';
      return;
    }

    const droit: Droit = {
      nbrJour: this.formGroup.get('nbJour')?.value,
      sexes: this.contraintes.filter(c => c.champ === 'sexe').map(c => c.valeur),
      contractTypes: this.contraintes.filter(c => c.champ === 'contract').map(c => c.valeur),
      classificationTypes: this.contraintes.filter(c => c.champ === 'classification').map(c => c.valeur),
      droitType: 'Legal'
    };

    this.dialogRef.close(droit);

    this.formGroup.reset();
    this.contraintes = [];
    this.filteredOptions = [];
    this.selectedType = '';
    this.newTypeError = '';
  }


  close() {
    this.dialogRef.close();
  }
}
