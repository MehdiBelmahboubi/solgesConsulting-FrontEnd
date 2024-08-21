import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
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
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { HeaderSirhClientComponent } from 'app/client-sirh/header-sirh-client/header-sirh-client.component';
import { AddUpdateJrFerierComponent } from './add-update-jr-ferier/add-update-jr-ferier.component';
import { JourferierService } from 'app/services/jourferier.service';
import { SnackBarService } from 'app/services/snackBar.service';
import { JourFerier } from 'app/models/jourferier.model';

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
export class JourFerierComponent implements AfterViewInit, OnInit {
  uploadFile(event: any) {
    console.log("upload file ")
    this.selectedFile = event.target.files[0] as File;
    event.target.value = null;
    if (this.selectedFile) {
      this.snackBarService.showSuccess('Fichier importer avec success ! ');
      this.massRegisterjrsferie(this.selectedFile);
    }
    else {
      this.snackBarService.showError('Fichier n\'est pas importer  ! ')
    }
  }
  massRegisterjrsferie(event:any) {
    
  }
refresh() {
  this.searchControl='';
  this.selectedType = '';
  this.filteredOptions = [];
  this.active=true;
  this.getJrFeries(this.active);
}
  jourferies: JourFerier[] = [];
  active!:boolean;
  selectedFile: File | null = null;
  searchControl: string = '';
  search = '';
  selectedType: string = '';
  selectedOption: string = '';
  filteredOptions: any[] = [];
  displayedColumns: string[] = ['select','dateFete','fete','nbrJour', 'action'];
  jourferierDataSource = new MatTableDataSource<JourFerier>(this.jourferies);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  selection: SelectionModel<any> = new SelectionModel<any>(true, []);


  constructor(private router: Router,private dialog:MatDialog,
    private jrferierService:JourferierService,private snackBarService:SnackBarService) { }

  ngOnInit() {
    this.active=true;
    this.getJrFeries(this.active);
  }

  getJrFeries(active: boolean) {
    this.jrferierService.getAllJourFeries().subscribe({
      next: (data) => {
        this.jourferies = data;
        this.jourferierDataSource.data = this.jourferies;
        this.jourferierDataSource.paginator = this.paginator;
        this.jourferierDataSource.sort = this.sort;
      },
      error: (err) => {
        console.error('Error fetching jour feries:', err);
        this.snackBarService.showError(err);
      }
    });
  }
  

  ngAfterViewInit() {
    
  }
  
  
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

  toggleArchivedStatus() {
    this.active = !this.active;
    this.getJrFeries(this.active);
  }

  checkboxLabel(): string {
    // Implémentez la logique d'étiquette de la case à cocher ici
    return '';
  }

  openAddJF() {
    this.router.navigate(['/client/conge/referentiel/jourferier/parametrage']);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.jourferierDataSource.filter = filterValue.trim().toLowerCase();
  }
}
