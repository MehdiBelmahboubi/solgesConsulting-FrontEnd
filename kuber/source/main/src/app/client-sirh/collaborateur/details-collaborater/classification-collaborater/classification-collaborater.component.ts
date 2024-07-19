import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
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



@Component({
  selector: 'app-classification-collaborater',
  standalone: true,
  imports: [FormsModule, MatDatepickerModule,MatSelectModule, MatNativeDateModule, MatInputModule,NgFor, NgIf,MatListModule,MatCardModule, MatButtonModule],
  templateUrl: './classification-collaborater.component.html',
  styleUrl: './classification-collaborater.component.scss'
})
export class ClassificationCollaboraterComponent {
cancel() {
throw new Error('Method not implemented.');
}
  collaborater: Collaborater = new Collaborater();
  classification: Classification = new Classification();
  classificationTypes!: classificationType[];
  addMode!: Boolean;
  editMode: boolean = false;
  constructor(private classificationService: ClassificationService) { }

  ngOnInit(): void {
    if (history.state && history.state.collaborater) {
      this.collaborater = history.state.collaborater;
    } else if (history.state && history.state.collaboraterEdit) {
      this.collaborater = history.state.collaboraterEdit;
      this.openEditMode();
    }
    else {
      this.addMode = true;
    }

    this.classificationService.getAllTypes().subscribe({
      next: (value) => {
        this.classificationTypes = value;
      },
      error: (err) => {
        console.error('Error fetching Classifications :', err);
      }
    })
  }

  openEditMode() {
    this.editMode = true;
    this.addMode = false;
  }
}
