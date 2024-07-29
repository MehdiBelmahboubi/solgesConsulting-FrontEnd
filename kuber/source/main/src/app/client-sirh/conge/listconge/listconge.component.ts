
import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
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
import { CollaboraterService } from 'app/services/collaborater.service';
import { Collaborater } from 'app/models/collaborater.model';
import { SnackBarService } from 'app/services/snackBar.service';
import { Page } from 'app/models/page.models';


@Component({
  selector: 'app-listconge',
  standalone: true,
  imports: [
    BreadcrumbComponent, RouterLink, MatTableModule,
    MatSortModule, MatCardModule, MatPaginatorModule, MatFormFieldModule,
    MatInputModule, MatSelectModule, MatCheckboxModule, ReactiveFormsModule,
    MatButtonModule, MatMenuModule, MatIconModule
  ],
  templateUrl: './listconge.component.html',
  styleUrl: './listconge.component.scss'
})
export class ListcongeComponent {
  size: unknown;

  constructor(private router: Router){}

  onPageChange($event: PageEvent) {
    throw new Error('Method not implemented.');
  }
  conge: any;
  displayedColumns: any;
  totalElements: unknown;
  checkboxLabel(): string {
    throw new Error('Method not implemented.');
  }
  selection: any;
  isAllSelected(): unknown {
    throw new Error('Method not implemented.');
  }
  toggleAllRows() {
    throw new Error('Method not implemented.');
  }
  openAddconge() {
    this.router.navigate(['/client/conge/parametrage']);
  }
  openArchivedlistconge() {
    throw new Error('Method not implemented.');
  }
  listcongeDataSource: any;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.listcongeDataSource.filter = filterValue.trim().toLowerCase();
  }

}
