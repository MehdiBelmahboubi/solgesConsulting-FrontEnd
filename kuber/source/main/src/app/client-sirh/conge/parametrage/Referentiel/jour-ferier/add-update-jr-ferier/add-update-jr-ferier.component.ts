import { CdkTextareaAutosize } from "@angular/cdk/text-field";
import { NgFor, NgIf } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatIconButton, MatButton } from "@angular/material/button";
import { MatCard, MatCardTitle, MatCardContent, MatCardActions } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatOptgroup, MatOptionModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatLabel, MatFormField, MatError, MatSuffix, MatHint } from "@angular/material/form-field";
import { MatIcon } from "@angular/material/icon";
import { MatInput } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatSelect, MatSelectChange } from "@angular/material/select";
import { MatTooltip } from "@angular/material/tooltip";
import { Router } from "@angular/router";
import { Fete } from "app/models/fete.model";
import { JourFerier } from "app/models/jourferier.model";
import { TypeFete } from "app/models/typefete.model";
import { JourferierService } from "app/services/jourferier.service";
import { SnackBarService } from "app/services/snackBar.service";


@Component({
  selector: 'app-add-update-jr-ferier',
  standalone: true,
  imports: [MatCard,
    MatCardTitle,
    MatCardContent,
    MatLabel,
    MatListModule,
    MatSelect,
    MatCheckboxModule,
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
    NgFor],
  templateUrl: './add-update-jr-ferier.component.html',
  styleUrl: './add-update-jr-ferier.component.scss'
})
export class AddUpdateJrFerierComponent implements OnInit {
  newTypeError = '';
  addFete: Boolean = false;
  addTypeFete: Boolean = false;
  FormGroup1!: FormGroup;
  FormGroup2!: FormGroup;
  FormGroup3!: FormGroup;
  typeFetes!: TypeFete[];
  fetes!: Fete[];
  jourFerie!: JourFerier;
  fete!: Fete;
  typeFete!: TypeFete;

  constructor(private router: Router, private fb: FormBuilder, private jrferieService: JourferierService, private snackBarService: SnackBarService) { }

  ngOnInit() {
    this.initializeForm();
    this.loadFetes();
    this.loadTypesFetes();
  }

  initializeForm(): void {
    this.FormGroup1 = this.fb.group({
      dateFete: ['', Validators.required],
      feteId: ['', Validators.required],
      nbrJour: ['', Validators.required],
    });

    this.FormGroup2 = this.fb.group({
      code: ['', Validators.required],
      typeId: ['', Validators.required],
      libelle: ['', Validators.required],
    })
    this.FormGroup3 = this.fb.group({
      libelle: ['', Validators.required],
      reconduction: [false, Validators.required],
    })
  }

  loadFetes() {
    this.jrferieService.getFetes().subscribe({
      next: (data) => {
        this.fetes = data;
      },
      error: (err) => {
        console.error('Error fetching jour feries:', err);
        this.snackBarService.showError(err);
      }
    });
  }

  loadTypesFetes() {
    this.jrferieService.getTypesFetes().subscribe({
      next: (data) => {
        this.typeFetes = data;
      },
      error: (err) => {
        console.error('Error fetching jour feries:', err);
        this.snackBarService.showError(err);
      }
    });
  }

  addJrFerier(): void {
    const newJourFerie = { ...this.jourFerie, ...this.FormGroup1.value };
    this.jrferieService.addJrFeries(newJourFerie).subscribe({
      next: (value) => {
        this.snackBarService.showSuccess('Jour férié created successfully!');
      },
      error: (err) => {
        console.error('Error Adding Jour férié:', err);
        this.snackBarService.showError(err);
      }
    });
  }

  addFetes(): void {
    const newFete = { ...this.fete, ...this.FormGroup2.value };
    this.jrferieService.addFete(newFete).subscribe({
      next: (value) => {
        this.snackBarService.showSuccess('Fete created successfully!');
        this.loadFetes();
        this.FormGroup1.get('feteId')?.setValue(value.id);
        this.addFete=false;
      },
      error: (err) => {
        console.error('Error Adding Fete:', err);
        this.snackBarService.showError(err);
      }
    });
  }

  addTypeFetes(): void {
    const newTypeFete = { ...this.typeFete, ...this.FormGroup3.value };
    this.jrferieService.addTypeFete(newTypeFete).subscribe({
      next: (value) => {
        this.snackBarService.showSuccess('TypeFete created successfully!');
        this.loadTypesFetes();
        this.FormGroup2.get('typeId')?.setValue(value.id);
        this.addTypeFete=false;
      },
      error: (err) => {
        console.error('Error Adding TypeFete:', err);
        this.snackBarService.showError(err);
      }
    });
  }

  onFeteSelectionChange(event: any) {
    const selectedValue = event.value;
    this.addFete = selectedValue === 'new-fete';
    this.addTypeFete = selectedValue === 'new-type-fete';


    if (this.addFete) {
      this.FormGroup1.get('typefete')?.setValue(null);
    }
  }



  onTypeFeteSelectionChange(event: any) {
    const selectedValue = event.value;
    this.addTypeFete = selectedValue === 'new-type-fete';
  }

  back() {
    this.router.navigate(['/client/conge/referentiel/jourferier']);
  }
}
