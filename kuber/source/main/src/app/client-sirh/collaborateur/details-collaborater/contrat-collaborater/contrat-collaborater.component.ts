import {Component, OnInit} from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Collaborater } from 'app/models/collaborater.model';
import { ContractService } from 'app/services/contract.service';
import { Contract } from 'app/models/contract.model';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgIf } from '@angular/common';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import {MatListModule} from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-contrat-collaborater',
  standalone: true,
  imports: [FormsModule, MatDatepickerModule,MatOptionModule,MatSelectModule, MatNativeDateModule, MatInputModule, NgIf, MatButtonModule,MatListModule, MatCardModule],
  templateUrl: './contrat-collaborater.component.html',
  styleUrls: ['./contrat-collaborater.component.scss']
})
export class ContratCollaboraterComponent implements OnInit{
cancel() {
throw new Error('Method not implemented.');
}
  collaborater!: Collaborater;
  contract: Contract = new Contract();
  addMode!: Boolean;
  editMode: boolean = false;

  constructor(private contractService: ContractService) { }

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
