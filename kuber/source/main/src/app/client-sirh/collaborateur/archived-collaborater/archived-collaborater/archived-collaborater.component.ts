import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
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
import { CollaboraterService } from 'app/services/collaborater.service';
import { Collaborater } from 'app/models/collaborater.model';
import { SnackBarService } from 'app/services/snackBar.service';
import { HeaderSirhClientComponent } from "../../../header-sirh-client/header-sirh-client.component";
import { Page } from 'app/models/page.models';

@Component({
  selector: 'app-archived-collaborater',
  standalone: true,
  imports: [
    BreadcrumbComponent, RouterLink, HeaderSirhClientComponent, MatTableModule,
    MatSortModule, MatCardModule, MatPaginatorModule, MatFormFieldModule,
    MatInputModule, MatSelectModule, MatCheckboxModule, ReactiveFormsModule,
    MatButtonModule, MatMenuModule, MatIconModule
  ],
  templateUrl: './archived-collaborater.component.html',
  styleUrl: './archived-collaborater.component.scss'
})
export class ArchivedCollaboraterComponent implements OnInit{
  collaboraters: Collaborater[] = [];
  displayedColumns: string[] = ['select', 'civNomPrenom', 'matricule', 'cnie', 'initiales', 'email', 'lieuNaissance', 'sexe', 'action'];
  collaboraterDataSource = new MatTableDataSource<Collaborater>(this.collaboraters);
  selection = new SelectionModel<Collaborater>(true, []);
  page: number = 0;
  size: number = 4;
  totalElements: number = 0;
  totalPages: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private collaboraterService: CollaboraterService, private router: Router,private snackBarService:SnackBarService) { }

  ngOnInit() {
   this.getArchivedCollaboraters(this.page, this.size);
  }

  getArchivedCollaboraters(page: number, size: number) {
    this.collaboraterService.getArchived(page, size).subscribe({
      next: (data: Page<Collaborater>) => {
        this.collaboraters = data.content;
        this.collaboraterDataSource.data = this.collaboraters;
        this.totalElements = data.totalElements;
        this.totalPages = data.totalPages;
      },
      error: (err) => {
        console.error('Error fetching Collaboraters:', err);
      }
    });
  }
  
  onPageChange(event: any) {
    this.page = event.pageIndex;
    this.size = event.pageSize;
    this.getArchivedCollaboraters(this.page, this.size);
  }


  ngAfterViewInit() {
    this.collaboraterDataSource.paginator = this.paginator;
    this.collaboraterDataSource.sort = this.sort;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.collaboraterDataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.collaboraterDataSource.data);
  }

  checkboxLabel(row?: Collaborater): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.matricule}`;
  }

  openCollaboraterDetails(collaborater: Collaborater) {
    this.router.navigate(['/client/detailsCollaborateur'], { queryParams: { id: collaborater.id } });
  }

  openAddCollaborater() {
    this.router.navigate(['/client/detailsCollaborateur']);
  }

  openEditCollaborater(id: number) {
    this.router.navigate(['/client/detailsCollaborateur'], { queryParams: { id: id, mode: "update" } });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.collaboraterDataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteCollaborater(id: number) {
    this.collaboraterService.deleteCollaborater(id).subscribe({
      next: () => {
        this.snackBarService.showSuccess('Collaborateur Supprimer !!!');
      },
      error: (err) => {
        console.error('Error Updating Collaborator:', err);
      }
    });
  }
}
