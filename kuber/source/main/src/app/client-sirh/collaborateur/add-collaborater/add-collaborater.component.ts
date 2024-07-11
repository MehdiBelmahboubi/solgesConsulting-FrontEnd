import { Component, OnInit } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CountryService } from 'app/services/country.service';
import { Country } from 'app/models/country.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderSirhClientComponent } from 'app/client-sirh/header-sirh-client/header-sirh-client.component';
import { CollaboraterService } from 'app/services/collaborater.service';
import { Collaborater } from 'app/models/collaborater.model';

@Component({
  selector: 'app-add-collaborater',
  standalone: true,
  imports: [MatDatepickerModule,HeaderSirhClientComponent, MatInputModule, MatSelectModule, MatButtonModule, MatCardModule, CommonModule, FormsModule ],
  templateUrl: './add-collaborater.component.html',
  styleUrls: ['./add-collaborater.component.scss']
})
export class AddCollaboraterComponent implements OnInit {
  countries!: Country[];
  collaborater: Collaborater = new Collaborater();
  selectedNationality1!: string;
  selectedNationality2!: string;

  constructor(private countryService: CountryService,
    private collaboraterService:CollaboraterService
  ) { }

  ngOnInit() {
    this.countryService.getAllNationalities().subscribe({
      next: (value) => {
        this.countries = value;
      },
      error: (err) => {
        console.error('Error fetching Countries:', err);
      }
    });
  }

  onSubmit() {
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
