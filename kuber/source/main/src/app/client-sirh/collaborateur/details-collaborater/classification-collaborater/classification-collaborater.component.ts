import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { Collaborater } from 'app/models/collaborater.model';
import { CollaboraterService } from 'app/services/collaborater.service';
import {MatListModule} from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';



@Component({
  selector: 'app-classification-collaborater',
  standalone: true,
  imports: [FormsModule, MatDatepickerModule,MatSelectModule, MatNativeDateModule, MatInputModule, NgIf,MatListModule,MatCardModule, MatButtonModule],
  templateUrl: './classification-collaborater.component.html',
  styleUrl: './classification-collaborater.component.scss'
})
export class ClassificationCollaboraterComponent {
cancel() {
throw new Error('Method not implemented.');
}
  collaborater: Collaborater = new Collaborater();
  addMode!: Boolean;
  editMode: boolean = false;
  constructor(private collaboraterService: CollaboraterService) { }

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
  }

  openEditMode() {
    this.editMode = true;
    this.addMode = false;
  }
}
