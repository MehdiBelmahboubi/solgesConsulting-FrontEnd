import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { HeaderSirhClientComponent } from 'app/client-sirh/header-sirh-client/header-sirh-client.component';
import { SnackBarService } from 'app/services/snackBar.service';
import {AddEditDroitlegalComponent} from "../add-edit-droitlegal/add-edit-droitlegal.component";
import {AddEditDroitentrepriseComponent} from "../add-edit-droitentreprise/add-edit-droitentreprise.component";
import {CalendarService} from "../../../../../services/calendar.service";
import {Calendar} from "../../../../../models/calendar.model";
import {Router} from "@angular/router";
import {Droit} from "../../../../../models/droit.model";

@Component({
  selector: 'app-config-conge',
  standalone: true,
  imports: [FormsModule, MatDatepickerModule, MatCheckboxModule, MatIconModule, ReactiveFormsModule, MatSelectModule, MatNativeDateModule, MatInputModule, NgFor, NgIf, MatListModule, MatCardModule, MatButtonModule, HeaderSirhClientComponent],
  templateUrl: './config-conge.component.html',
  styleUrl: './config-conge.component.scss'
})
export class ConfigCongeComponent implements OnInit {
  formGroup!: FormGroup;
  calendars!: Calendar[];
  active!:boolean;
  droitLegal!:Droit;
  droitEntreprise!:Droit;

  constructor(private fb: FormBuilder,
              private router: Router,
              private dialog:MatDialog,
              private calendarService:CalendarService,
              private snackBarService:SnackBarService) { }

  ngOnInit(): void {
    this.initializeForm();
    this.loadCalendars();
    this.addCheckboxListeners();
  }

  initializeForm(): void {
    this.formGroup = this.fb.group({
      conteur: ['', Validators.required],
      bulletinpaie: [false, Validators.required],
      datevalidite: ['', Validators.required],
      finValidite: ['', Validators.required],
      unite: ['', Validators.required],
      calendrierType: ['', Validators.required],
      Statut: ['', Validators.required],
      Droitlegal: [{ value: '', disabled: true }, Validators.required],
      Droitentreprise: [{ value: '', disabled: true }, Validators.required],
      autoriseDefalcation: [false, Validators.required],
      nbrDefalcation: [{ value: '', disabled: true }, Validators.required],
      autorisationRencondiction: [false, Validators.required],
      Delai: [{ value: '', disabled: true }, Validators.required],
      Minjours: ['', Validators.required],
      Maxjours: ['', Validators.required],
      reliquat: [false, Validators.required],
      nbrAnnee: [{ value: '', disabled: true }, Validators.required],
      sexe: ['', Validators.required],
      nbrJour: ['', Validators.required],
    });
  }



  loadCalendars(): void {
    this.active=true;
    this.calendarService.getAllCalendar(this.active).subscribe({
      next: (value) => {
        this.calendars = value;
      },
      error: (err) => {
        console.error('Error fetching Classifications :', err);
        this.snackBarService.showError(err);
      }
    })
  }

  addCheckboxListeners(): void {
    this.formGroup.get('autoriseDefalcation')?.valueChanges.subscribe(value => {
      this.toggleControl('nbrDefalcation', value);
    });
    this.formGroup.get('autorisationRencondiction')?.valueChanges.subscribe(value => {
      this.toggleControl('Delai', value);
    });
    this.formGroup.get('reliquat')?.valueChanges.subscribe(value => {
      this.toggleControl('nbrAnnee', value);
    });
  }

  openDroitLegal() {
    const dialogRef = this.dialog.open(AddEditDroitlegalComponent, {
      width: '1000px',
      data: this.droitLegal ? this.droitLegal : {}  // Pass existing data if not empty
    });

    dialogRef.afterClosed().subscribe((result: Droit) => {
      if (result) {
        this.droitLegal=result;
        this.formGroup.patchValue({ Droitlegal: result.nbrJour});
      }
    });
  }

  openDroitEntreprise() {
    const dialogRef = this.dialog.open(AddEditDroitentrepriseComponent, {
      width: '1000px',
      data: this.droitEntreprise ? this.droitEntreprise : {}  // Pass existing data if not empty
    });

    dialogRef.afterClosed().subscribe((result: Droit) => {
      if (result) {
        this.droitEntreprise=result;
        this.formGroup.patchValue({ Droitentreprise: result.nbrJour });
      }
    });
  }

  toggleControl(controlName: string, enable: boolean): void {
    if (enable) {
      this.formGroup.get(controlName)?.enable();
    } else {
      this.formGroup.get(controlName)?.disable();
    }
  }

  addConges() {

  }

  back() {
    this.router.navigate(['/client/conge/listconge']);
  }
}
