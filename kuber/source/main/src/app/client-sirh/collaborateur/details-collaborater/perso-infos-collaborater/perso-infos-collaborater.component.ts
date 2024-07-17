import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { Collaborater } from 'app/models/collaborater.model';
import { Country } from 'app/models/country.model';
import { CollaboraterService } from 'app/services/collaborater.service';
import { CountryService } from 'app/services/country.service';
import { SnackBarService } from 'app/services/snackBar.service';

@Component({
  selector: 'app-perso-infos-collaborater',
  standalone: true,
  imports: [FormsModule, MatDatepickerModule, MatNativeDateModule, MatInputModule, NgIf, MatButtonModule,MatOptionModule,MatFormFieldModule, MatFormFieldModule,NgFor,MatSelectModule,],
  templateUrl: './perso-infos-collaborater.component.html',
  styleUrl: './perso-infos-collaborater.component.scss'
})
export class PersoInfosCollaboraterComponent implements OnInit {
  collaborater: Collaborater = new Collaborater();
  countries!: Country[];
  addMode!: Boolean;
  editMode: boolean = false;


  constructor(private collaboraterService: CollaboraterService,private router: Router, private snackBarService: SnackBarService,private countryService:CountryService) { }

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

    this.countryService.getAllNationalities().subscribe({
      next: (value) => {
        this.countries = value;
      },
      error: (err) => {
        console.error('Error fetching Countries:', err);
      }
    });
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

  cancel() {
    this.router.navigate(['/client/collaborateur']);
  }
}
