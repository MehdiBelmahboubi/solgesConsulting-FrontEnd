import { NgIf } from '@angular/common';
import { Component, model, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { Collaborater } from 'app/models/collaborater.model';
import { CollaboraterService } from 'app/services/collaborater.service';
import {MatRadioModule} from '@angular/material/radio';
import {MatListModule} from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';


@Component({
  selector: 'app-famille-collaborater',
  standalone: true,
  imports: [FormsModule, MatDatepickerModule, MatNativeDateModule, MatInputModule, NgIf, MatButtonModule,MatRadioModule,MatListModule, MatCardModule,MatCheckboxModule],
  templateUrl: './famille-collaborater.component.html',
  styleUrl: './famille-collaborater.component.scss'
})
export class FamilleCollaboraterComponent implements OnInit {
labelPosition: any;
labelPosition2: any;
labelPosition3: any;
readonly enable = model(false);

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

  addCollaborater() {
    this.collaboraterService.addCollaborateur(this.collaborater).subscribe({
      next: () => {
        console.log('Collaborateur Added');
      },
      error: () => {
        console.error('Error Adding Collaborateur:');
      }
    });
  }
}
