import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
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
import { RouterLink } from '@angular/router';
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
  dataSource = new MatTableDataSource<Collaborater>(this.collaboraters);
  selection = new SelectionModel<Collaborater>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private collaboraterService: CollaboraterService) {}

  ngOnInit() {
    this.collaboraterService.getByComany().subscribe({
      next: (value) => {
        this.collaboraters = value;
        this.dataSource.data = this.collaboraters;
      },
      error: (err) => {
        console.error('Error fetching Collaboraters:', err);
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: Collaborater): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.matricule}`;
  }
}
