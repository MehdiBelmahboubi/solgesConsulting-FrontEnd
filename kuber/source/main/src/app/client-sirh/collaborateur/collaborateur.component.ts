import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderSirhClientComponent } from '../header-sirh-client/header-sirh-client.component';
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

@Component({
  selector: 'app-collaborateur',
  standalone: true,
  imports: [
    BreadcrumbComponent, RouterLink, HeaderSirhClientComponent, MatTableModule, 
    MatSortModule, MatCardModule, MatPaginatorModule, MatFormFieldModule, 
    MatInputModule, MatSelectModule, MatCheckboxModule, ReactiveFormsModule, 
    MatButtonModule, MatMenuModule, MatIconModule
  ],
  templateUrl: './collaborateur.component.html',
  styleUrls: ['./collaborateur.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CollaborateurComponent implements AfterViewInit, OnInit {

  collaboraters: Collaborater[] = [];
  displayedColumns: string[] = ['select', 'matricule', 'initiales','email', 'lieuNaissance', 'sexe', 'civNomPrenom', 'cnie', 'action'];
  collaboraterDataSource = new MatTableDataSource<Collaborater>(this.collaboraters);
  selection = new SelectionModel<Collaborater>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private collaboraterService: CollaboraterService,private router: Router) {}

  ngOnInit() {
    this.collaboraterService.getByComany().subscribe({
      next: (value) => {
        this.collaboraters = value;
        this.collaboraterDataSource.data = this.collaboraters;
      },
      error: (err) => {
        console.error('Error fetching Collaboraters:', err);
      }
    });
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
    this.router.navigate(['/client/detailsCollaborateur'], { state: { collaborater } });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.collaboraterDataSource.filter = filterValue.trim().toLowerCase();
  }
}
