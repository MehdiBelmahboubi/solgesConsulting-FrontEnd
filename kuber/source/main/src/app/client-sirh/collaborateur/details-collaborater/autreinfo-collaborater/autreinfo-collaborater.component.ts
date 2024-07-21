import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { Collaborater } from 'app/models/collaborater.model';
import { CollaboraterService } from 'app/services/collaborater.service';
import {MatListModule} from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
@Component({
  selector: 'app-autreinfo-collaborater',
  standalone: true,
  imports: [FormsModule,MatCheckboxModule, MatDatepickerModule, MatIconModule, MatNativeDateModule, MatInputModule, NgIf, MatButtonModule,MatListModule, MatCardModule],
  templateUrl: './autreinfo-collaborater.component.html',
  styleUrl: './autreinfo-collaborater.component.scss'
})
export class AutreinfoCollaboraterComponent implements OnInit {
  collaborater: Collaborater = new Collaborater();
  addMode!: Boolean;
  editMode: boolean = false;


  constructor(private router: Router,private collaboraterService: CollaboraterService) { }

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

  back() {
    this.router.navigate(['/client/collaborateur']);
  }

  cancel() {
    this.editMode=false;
  }
}


