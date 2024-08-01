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
import { SnackBarService } from 'app/services/snackBar.service';



@Component({
  selector: 'app-classification-collaborater',
  standalone: true,
  imports: [FormsModule, MatDatepickerModule,ReactiveFormsModule,MatSelectModule, MatNativeDateModule, MatInputModule,NgFor, NgIf,MatListModule,MatCardModule, MatButtonModule],
  templateUrl: './classification-collaborater.component.html',
  styleUrl: './classification-collaborater.component.scss'
})
export class ClassificationCollaboraterComponent implements OnInit{
  @Input() classification!:Classification;
  @Input() collaborater!: Collaborater;
  @Input() mode!:string;
  classificationTypes!: classificationType[];
  addMode!: Boolean;
  editMode: boolean = false;
  formGroup!: FormGroup;
  
  constructor(private fb: FormBuilder,private router: Router,private classificationService: ClassificationService, private snackBarService: SnackBarService) { }

  ngOnInit(): void {
    this.setMode();
    this.initializeForm();
    this.loadClassificationTypes();
    
   
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['classification'] && this.classification&& this.formGroup) {
      this.formGroup.patchValue(this.classification);
    }
  }

  setMode(): void {
    if (this.mode === 'editMode') {
      this.editMode = true;
    } else if (this.mode === 'addMode') {
      this.addMode = true;
    }
  }

  initializeForm(): void {
    this.formGroup = this.fb.group({
      dateClassification: [{ value: '', disabled: !this.addMode && !this.editMode }, Validators.required],
      refClassification: [{ value: '', disabled: !this.addMode && !this.editMode }, Validators.required],
      categorieProf: [{ value: '', disabled: !this.addMode && !this.editMode }, Validators.required],
      dateCategorieProf: [{ value: '', disabled: !this.addMode && !this.editMode }, Validators.required],
      dateFin: [{ value: '', disabled: !this.addMode && !this.editMode }, Validators.required],
      classificationType: [{ value: '', disabled: !this.addMode && !this.editMode }, Validators.required],
    });
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

  addClassification():void{
    this.classification.collaboraterId = this.collaborater.id;
    const newClassification = { ...this.classification, ...this.formGroup.value };
    this.classificationService.addClassification(newClassification).subscribe({
      next: (value) => {
        this.snackBarService.showSuccess('Contract Classification successfully!');
        this.classification = value;
      },
      error: (err) => {
        console.error('Error Add Classification to Collaborator:', err);
        this.snackBarService.showError(err);
      }
    });
  }

  updateClassification(): void {
    if (this.classification.id === undefined) {
      this.addClassification();
    } else {
      this.classification.collaboraterId = this.collaborater.id;
      const newClassification = { ...this.classification, ...this.formGroup.value };
      this.classificationService.updateClassification(newClassification).subscribe({
        next: (value) => {
          this.snackBarService.showSuccess('Classification updated successfully!');
          this.classification = value;
        },
        error: (err) => {
          console.error('Error Updating Classification to Collaborator:', err);
          this.snackBarService.showError(err);
        }
      });
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
