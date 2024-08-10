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
import { Fete } from "app/models/fete.model";
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
  FormGroup!: FormGroup;
  typeFetes!: TypeFete[];
  fetes!: Fete[];

  constructor(private fb: FormBuilder,private jrferieService:JourferierService,private snackBarService:SnackBarService) { }

  ngOnInit() {
    this.initializeForm();
    this.loadFetes();
    this.loadTypesFetes();
  }

  initializeForm(): void {
    this.FormGroup = this.fb.group({
      datefete: ['', Validators.required],
      fete: ['', Validators.required],
      nbrJour: ['', Validators.required],
      code: ['', Validators.required],
      typefete: ['', Validators.required],
      libelle: ['', Validators.required],
      libelleTypeFete: ['', Validators.required],
      reconduction: ['', Validators.required],
    });
  }

  loadFetes() {
    this.jrferieService.getFetes().subscribe({
      next: (data) => {
        this.fetes=data;
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
        this.typeFetes=data;
      },
      error: (err) => {
        console.error('Error fetching jour feries:', err);
        this.snackBarService.showError(err);
      }
    });
  }

  addJrFerier() {
    throw new Error('Method not implemented.');
  }

  onFeteSelectionChange(event: any) {
    this.addFete = event.value.includes('new-fete');
    this.addTypeFete = event.value.includes('new-type-fete');
    this.FormGroup.get('typefete')?.setValue([]);
  }


  onTypeFeteSelectionChange(event: any) {
    this.addTypeFete = event.value.includes('new-type-fete');
  }

  close() {
    throw new Error('Method not implemented.');
  }

}
