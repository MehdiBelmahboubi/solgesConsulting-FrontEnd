import { CdkTextareaAutosize } from "@angular/cdk/text-field";
import { NgIf } from "@angular/common";
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
    NgIf],
  templateUrl: './add-update-jr-ferier.component.html',
  styleUrl: './add-update-jr-ferier.component.scss'
})
export class AddUpdateJrFerierComponent implements OnInit {
  newTypeError = '';
  addFete: Boolean = false;
  addTypeFete: Boolean = false;
  FormGroup!: FormGroup;
  feteTypes: any;
  fetes: any;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.initializeForm();
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
      reduction: ['', Validators.required],
    });
  }

  onSubmit() {
    throw new Error('Method not implemented.');
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
