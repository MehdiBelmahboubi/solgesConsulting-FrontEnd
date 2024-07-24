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



@Component({
  selector: 'app-classification-collaborater',
  standalone: true,
  imports: [FormsModule, MatDatepickerModule,ReactiveFormsModule,MatSelectModule, MatNativeDateModule, MatInputModule,NgFor, NgIf,MatListModule,MatCardModule, MatButtonModule],
  templateUrl: './classification-collaborater.component.html',
  styleUrl: './classification-collaborater.component.scss'
})
export class ClassificationCollaboraterComponent implements OnInit{
  @Input() classification!:Classification;
  @Input() mode!:string;
  classificationTypes!: classificationType[];
  addMode!: Boolean;
  editMode: boolean = false;
  formGroup!: FormGroup;
  
  constructor(private fb: FormBuilder,private router: Router,private classificationService: ClassificationService) { }

  ngOnInit(): void {
    if(this.mode==="editMode"){
      this.editMode=true;
    }else if(this.mode==="addMode")
    {this.addMode=true;}
    this.formGroup = this.fb.group({
      classificationType: [{ value: '', disabled: !this.addMode && !this.editMode }, Validators.required],
      refClassification: [{ value: '', disabled: !this.addMode && !this.editMode }, Validators.required],
      dateClassification: [{ value: '', disabled: !this.addMode && !this.editMode }, Validators.required],
      DateFinClf: [{ value: '', disabled: !this.addMode && !this.editMode }, Validators.required],
      numPasseport: [{ value: '', disabled: !this.addMode && !this.editMode }, Validators.required],
      passeportDelivreLe: [{ value: '', disabled: !this.addMode && !this.editMode }, Validators.required],
    });
    this.classificationService.getAllTypes().subscribe({
      next: (value) => {
        this.classificationTypes = value;
      },
      error: (err) => {
        console.error('Error fetching Classifications :', err);
      }
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['classification'] && this.classification&& this.formGroup) {
      this.formGroup.patchValue(this.classification);
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

  back() {
    this.router.navigate(['/client/collaborateur']);
  }

  cancel(): void {
    this.editMode = false;
    this.disableFormControls();
  }
}
