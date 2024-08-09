import { SelectionModel } from '@angular/cdk/collections';
import { Component, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { HeaderSirhClientComponent } from 'app/client-sirh/header-sirh-client/header-sirh-client.component';
import { AddUpdateJrFerierComponent } from './add-update-jr-ferier/add-update-jr-ferier.component';

@Component({
  selector: 'app-jour-ferier',
  standalone: true,
  imports: [BreadcrumbComponent, RouterLink, MatTableModule,
    MatSortModule, MatCardModule, MatPaginatorModule, MatFormFieldModule,
    MatInputModule, MatSelectModule, MatCheckboxModule, ReactiveFormsModule,
    MatButtonModule, MatMenuModule, MatIconModule,
    HeaderSirhClientComponent],
  templateUrl: './jour-ferier.component.html',
  styleUrl: './jour-ferier.component.scss'
})
export class JourFerierComponent {
  displayedColumns: string[] = ['select','dateFete','fete','nbrJour', 'action'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  jourferierDataSource: any;

  constructor(private router: Router,private dialog:MatDialog) { }
  conge: any;
  checkboxLabel(): string {
    // Implémentez la logique d'étiquette de la case à cocher ici
    return '';
  }
  selection: SelectionModel<any> = new SelectionModel<any>(true, []);
  
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.jourferierDataSource.data.length;
    return numSelected === numRows;
  }
  
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.jourferierDataSource.data);
  }

  openAddJF() {
    this.router.navigate(['/client/conge/referentiel/jourferier/parametrage']);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.jourferierDataSource.filter = filterValue.trim().toLowerCase();
  }
}
