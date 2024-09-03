import {Component, OnInit, ViewChild} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { HeaderSirhClientComponent } from "../../../../header-sirh-client/header-sirh-client.component";
import { MatDialog} from "@angular/material/dialog";
import {AddUpdateCalendarComponent} from "./add-update-calendar/add-update-calendar.component";
import {CalendarService} from "../../../../../services/calendar.service";
import {SnackBarService} from "../../../../../services/snackBar.service";
import {Calendar} from "../../../../../models/calendar.model";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-calendrier',
  standalone: true,
  imports: [
    BreadcrumbComponent, RouterLink, MatTableModule,
    MatSortModule, MatCardModule, MatPaginatorModule, MatFormFieldModule,
    MatInputModule, MatSelectModule, MatCheckboxModule, ReactiveFormsModule,
    MatButtonModule, MatMenuModule, MatIconModule,
    HeaderSirhClientComponent,NgIf
],
  templateUrl: './calendrier.component.html',
  styleUrl: './calendrier.component.scss'
})

export class CalendrierComponent  implements OnInit{
  calenders: Calendar[] = [];
  displayedColumns: string[] = ['select','code', 'libelle', 'jourFerier','action'];
  CalendrierDataSource=new MatTableDataSource<Calendar>(this.calenders);
  page: number = 0;
  size: number = 4;
  totalElements: number = 0;
  active!:boolean;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  selection: SelectionModel<any> = new SelectionModel<any>(true, []);

  constructor(private router: Router,
              private dialog:MatDialog,
              private calendarService:CalendarService,
              private snackBarService:SnackBarService) { }

  ngOnInit() {
    this.active=true;
    this.getCalenders(this.active);
  }

  getCalenders(statut: boolean) {
    this.calendarService.getAllCalendar(statut).subscribe({
      next: (data) => {
        this.calenders = data;
        this.CalendrierDataSource.data = this.calenders;
        this.CalendrierDataSource.paginator = this.paginator;
        this.CalendrierDataSource.sort = this.sort;
      },
      error: (err) => {
        console.error('Error fetching calendriers:', err);
        this.snackBarService.showError(err);
      }
    });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.CalendrierDataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.CalendrierDataSource.data);
  }
  uploadFile($event: Event) {
    throw new Error('Method not implemented.');
  }
  openAddCalendrier() {
    this.dialog.open(AddUpdateCalendarComponent,{width:"1200px"})
  }

  openEditCalendre(data:Calendar) {
    this.dialog.open(AddUpdateCalendarComponent,{data,width:"1200px"})
  }

  refresh() {
    throw new Error('Method not implemented.');
  }

  toggleArchivedStatus() {
    this.active=!this.active;
    this.getCalenders(this.active);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.CalendrierDataSource.filter = filterValue.trim().toLowerCase();
  }

  onPageChange($event: PageEvent) {
    // Implémentez la logique de changement de page ici
  }

  checkboxLabel(): string {
    // Implémentez la logique d'étiquette de la case à cocher ici
    return '';
  }

  deleteCalendar(id:number) {
    this.calendarService.deleteCalendar(id).subscribe({
      next: () => {
        this.snackBarService.showSuccess('Calendrier Supprimer !!!');
        this.getCalenders(this.active);
      },
      error: (err) => {
        console.error('Error deleting calendriers:', err);
        this.snackBarService.showError(err);
      }
    });
  }

  restoreCalendar(id:number) {
    this.calendarService.restoreCalendar(id).subscribe({
      next: () => {
        this.snackBarService.showSuccess('Calendrier Activer !!!');
        this.getCalenders(this.active);
      },
      error: (err) => {
        console.error('Error activing calendriers:', err);
        this.snackBarService.showError(err);
      }
    });
  }
}
