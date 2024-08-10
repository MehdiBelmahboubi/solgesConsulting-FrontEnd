import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
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
import { valueOrDefault } from 'chart.js/dist/helpers/helpers.core';
import { HeaderSirhClientComponent } from "../../../../header-sirh-client/header-sirh-client.component";

@Component({
  selector: 'app-calendrier',
  standalone: true,
  imports: [
    BreadcrumbComponent, RouterLink, MatTableModule,
    MatSortModule, MatCardModule, MatPaginatorModule, MatFormFieldModule,
    MatInputModule, MatSelectModule, MatCheckboxModule, ReactiveFormsModule,
    MatButtonModule, MatMenuModule, MatIconModule,
    HeaderSirhClientComponent
],
  templateUrl: './calendrier.component.html',
  styleUrl: './calendrier.component.scss'
})
export class CalendrierComponent  {
deleteCalendrier(arg0: any) {
throw new Error('Method not implemented.');
}
openCalendrierDetails(_t162: any) {
throw new Error('Method not implemented.');
}
Calendrier: any;
uploadFile($event: Event) {
throw new Error('Method not implemented.');
}
openAddCalendrier() {
throw new Error('Method not implemented.');
}
refresh() {
throw new Error('Method not implemented.');
}
openArchivedCalendrier() {
throw new Error('Method not implemented.');
}
  displayedColumns: string[] = ['code', 'typeCalendrier', 'jourFerie'];
  selectedFile: File | null = null;
  page: number = 0;
  size: number = 4;
  totalElements: number = 0;
  totalPages: number = 0;

  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  CalendrierDataSource: any;

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

  openAddconge() {
    this.router.navigate(['/client/conge/parametrage']);
  }

  openArchivedlistconge() {
    // Implémentez la logique pour ouvrir la liste des congés archivés ici
  }

 

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.CalendrierDataSource.filter = filterValue.trim().toLowerCase();
  }
}
