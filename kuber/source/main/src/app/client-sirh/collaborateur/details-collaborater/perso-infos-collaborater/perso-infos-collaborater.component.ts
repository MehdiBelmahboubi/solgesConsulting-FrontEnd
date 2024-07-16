import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { Collaborater } from 'app/models/collaborater.model';
import { CollaboraterService } from 'app/services/collaborater.service';
import { SnackBarService } from 'app/services/snackBar.service';

@Component({
  selector: 'app-perso-infos-collaborater',
  standalone: true,
  imports: [FormsModule, MatDatepickerModule, MatNativeDateModule, MatInputModule, NgIf, MatButtonModule],
  templateUrl: './perso-infos-collaborater.component.html',
  styleUrl: './perso-infos-collaborater.component.scss'
})
export class PersoInfosCollaboraterComponent implements OnInit {
  collaborater: Collaborater = new Collaborater();
  addMode!: Boolean;
  editMode: boolean = false;


  constructor(private collaboraterService: CollaboraterService, private snackBarService: SnackBarService) { }

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
        this.snackBarService.showSuccess('Collaborator est créé avec succès ! ');
      },
      error: () => {
        console.error('Error Adding Collaborateur:');
      }
    });
  }

  editCollaborater() {
    this.collaboraterService.editCollaborateur(this.collaborater).subscribe({
      next: () => {
        this.snackBarService.showSuccess('Collaborator est Mofidié avec succès ! ');
      },
      error: () => {
        console.error('Error Updating Collaborateur:');
      }
    })
  }
}
