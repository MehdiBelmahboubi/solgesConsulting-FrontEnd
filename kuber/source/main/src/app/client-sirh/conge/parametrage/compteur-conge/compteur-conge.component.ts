import { SelectionModel } from '@angular/cdk/collections';
import { Component, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
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

@Component({
  selector: 'app-compteur-conge',
  standalone: true,
  imports: [BreadcrumbComponent, RouterLink, MatTableModule,
    MatSortModule, MatCardModule, MatPaginatorModule, MatFormFieldModule,
    MatInputModule, MatSelectModule, MatCheckboxModule, ReactiveFormsModule,
    MatButtonModule, MatMenuModule, MatIconModule,
    HeaderSirhClientComponent],
  templateUrl: './compteur-conge.component.html',
  styleUrl: './compteur-conge.component.scss'
})
export class CompteurCongeComponent {
  displayedColumns: string[] = ['select','code','dateValidite','statut','unite','droitEntreprise','droitLegal','typeCalendrier','finValidite',  'reliquat', 'nombreAnnee', 'action'];
  page: number = 0;
  size: number = 4;
  totalElements: number = 0;
  totalPages: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  listcongeDataSource: any;

  constructor(private router: Router) { }

  onPageChange($event: PageEvent) {
    // Implémentez la logique de changement de page ici
  }
  conge: any;
  checkboxLabel(): string {
    // Implémentez la logique d'étiquette de la case à cocher ici
    return '';
  }
  selection: SelectionModel<any> = new SelectionModel<any>(true, []);
  
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.listcongeDataSource.data.length;
    return numSelected === numRows;
  }
  
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.listcongeDataSource.data);
  }

  openAddconge() {
    this.router.navigate(['/client/conge/parametrage']);
  }

  openArchivedlistconge() {
    // Implémentez la logique pour ouvrir la liste des congés archivés ici
  }

 

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.listcongeDataSource.filter = filterValue.trim().toLowerCase();
  }
}
