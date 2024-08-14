import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
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
import { SnackBarService } from 'app/services/snackBar.service';
import { Page } from 'app/models/page.models';
import { valueOrDefault } from 'chart.js/dist/helpers/helpers.core';
import { FormsModule } from '@angular/forms';
import {debounceTime} from "rxjs";
import {ContractService} from "../../services/contract.service";
import {NgFor, NgIf} from "@angular/common";
import {ClassificationService} from "../../services/classification.service";


@Component({
  selector: 'app-collaborateur',
  standalone: true,
  imports: [
    BreadcrumbComponent, RouterLink,FormsModule, HeaderSirhClientComponent, MatTableModule,
    MatSortModule, MatCardModule, MatPaginatorModule, MatFormFieldModule,
    MatInputModule, MatSelectModule, MatCheckboxModule, ReactiveFormsModule,
    MatButtonModule, MatMenuModule, MatIconModule,NgFor,NgIf
  ],
  templateUrl: './collaborateur.component.html',
  styleUrls: ['./collaborateur.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CollaborateurComponent implements AfterViewInit, OnInit {
  collaboraters: Collaborater[] = [];
  displayedColumns: string[] = ['civNomPrenom', 'matricule', 'cnie', 'initiales', 'email', 'lieuNaissance', 'sexe', 'action'];
  collaboraterDataSource = new MatTableDataSource<Collaborater>(this.collaboraters);
  selection = new SelectionModel<Collaborater>(true, []);
  selectedColumn: string = '';
  selectedFile: File | null = null;
  page: number = 0;
  size: number = 900000;
  totalElements: number = 0;
  totalPages: number = 0;
  active!:boolean;
  searchControl: string = '';
  search = '';
  selectedType: string = '';
  selectedOption: string = '';
  filteredOptions: any[] = [];
  contractOptions: any[] = [];
  classificationOptions: any[] = [];


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private cdr: ChangeDetectorRef,
              private collaboraterService: CollaboraterService,
              private router: Router,
              private snackBarService: SnackBarService,
              private contractService:ContractService,
              private classificationService:ClassificationService) { }

  ngOnInit() {
    this.active=true;
    this.getCollaboraters(this.page, this.size,this.active);
  }

  getCollaboraters(page: number, size: number,active:boolean) {
    console.log('Fetching collaboraters', { page, size });
    this.collaboraterService.getByComany(page, size,active).subscribe({
      next: (data: Page<Collaborater>) => {
        console.log('Collaboraters fetched', data);
        this.collaboraters = data.content;
        this.collaboraterDataSource.data = this.collaboraters;
        this.totalElements = data.totalElements;
        this.totalPages = Math.ceil(this.totalElements / this.size);
        console.log('Total elements:', this.totalElements);
        this.collaboraterDataSource.paginator = this.paginator;
        this.collaboraterDataSource.sort = this.sort;
      },
      error: (err) => {
        console.error('Error fetching collaboraters:', err);
        this.snackBarService.showError(err);
      }
    });
  }

  onPageChange(event: PageEvent) {
    console.log('Page change event', event);
    this.page = event.pageIndex;
    this.size = event.pageSize;
    this.getCollaboraters(this.page, this.size,this.active);
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

  openArchivedCollaborateur() {
    this.active=false;
    this.getCollaboraters(this.page,this.size,this.active);
  }

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
  //   if (this.selectedColumn) {
  //     this.collaboraterDataSource.filterPredicate = (data: Collaborater, filter: string) => {
  //       const columnValue = data[this.selectedColumn as keyof Collaborater] as string || '';
  //       return columnValue.toLowerCase().includes(filter);
  //     };
  //   }
  //   this.collaboraterDataSource.filter = filterValue;
  // }

  refresh() {
    this.getCollaboraters(this.page,this.size,this.active);
  }

  deleteCollaborater(id: number) {
    this.collaboraterService.deleteCollaborater(id).subscribe({
      next: () => {
        this.snackBarService.showSuccess('Collaborateur Supprimer !!!');
        this.getCollaboraters(this.page, this.size,this.active);
      },
      error: (err) => {
        console.error('Error Updating Collaborator:', err);
        this.snackBarService.showError(err);
      }
    });
  }

  uploadFile(event: any) {
    console.log("upload file ")
    this.selectedFile = event.target.files[0] as File;
    event.target.value = null;
    if (this.selectedFile) {
      this.snackBarService.showSuccess('Fichier importer avec success ! ');
      this.massRegisterCollaboraters(this.selectedFile);
    }
    else {
      this.snackBarService.showError('Fichier n\'est pas importer  ! ')
    }
  }

  massRegisterCollaboraters(event:any){
    this.collaboraterService.uploadFile(event).subscribe({
      next: value => {
        if(value.message.includes('erreur')){
          this.snackBarService.showError('Ajout des Collaborateurs Echoué   ! ')
        }
        else{
          this.snackBarService.showSuccess(value.message +'!');
        }
        console.log('resp :',value)
      },
      error: err => {
        console.log("erreur response *:", err);
        this.snackBarService.showError('Ajout des Collaborateurs Echoué  ! ')
      },
      complete:()=>{
        this.refresh();
      }
    });
  }

  getCollaboratersBySearch() {
    if (this.searchControl){
      this.collaboraterService.getByComanyAndSearch(this.page, this.size, this.active, this.searchControl).subscribe({
        next: (data) => {
          console.log('Collaboraters fetched', data);
          this.collaboraters = data.content;
          this.collaboraterDataSource.data = this.collaboraters;
          this.totalElements = data.totalElements;
          this.totalPages = Math.ceil(this.totalElements / this.size);
          this.collaboraterDataSource.paginator = this.paginator;
          this.collaboraterDataSource.sort = this.sort;
        },
        error: (err) => {
          console.error('Error fetching collaboraters:', err);
          this.snackBarService.showError('Failed to fetch collaborators');
        }
      });
    }
  }

  loadClassificationTypes(): void {
    this.classificationService.getAllTypes().subscribe({
      next: (value) => {
        this.classificationOptions = value; // Store separately
        this.updateFilteredOptions();
      },
      error: (err) => {
        console.error('Error fetching Classifications:', err);
        this.snackBarService.showError(err);
      }
    });
  }

// Load contract types
  loadContracts(): void {
    this.contractService.getAllTypes().subscribe({
      next: (value) => {
        this.contractOptions = value; // Store separately
        this.updateFilteredOptions();
      },
      error: (err) => {
        console.error('Error fetching Contracts:', err);
        this.snackBarService.showError(err);
      }
    });
  }

  updateFilteredOptions(): void {
    if (this.selectedType === 'contract') {
      this.filteredOptions = this.contractOptions.map(option => ({
        id: option.id,
        label: option.code,
        type: 'contract'
      }));
    } else if (this.selectedType === 'classification') {
      this.filteredOptions = this.classificationOptions.map(option => ({
        id: option.id,
        label: option.nom,
        type: 'classification'
      }));
    } else {
      this.filteredOptions = [];
    }
  }

// Handle type changes
  onTypeChange(event: Event) {
    this.selectedType = (event.target as HTMLSelectElement).value.trim().toLowerCase();
    if (this.selectedType === 'contract') {
      this.loadContracts();
    } else if (this.selectedType === 'classification') {
      this.loadClassificationTypes();
    } else {
      this.filteredOptions = [];
    }
  }

  getCollaboratersByGroup() {
    if (this.selectedType && this.selectedOption) {
      this.collaboraterService.getByComanyAndGroup(this.page, this.size, this.active,this.selectedType, this.selectedOption).subscribe({
        next: (data: Page<Collaborater>) => {
          console.log('Collaboraters fetched', data);
          this.collaboraters = data.content;
          this.collaboraterDataSource.data = this.collaboraters;
          this.totalElements = data.totalElements;
          this.totalPages = Math.ceil(this.totalElements / this.size);
          console.log('Total elements:', this.totalElements);
          this.collaboraterDataSource.paginator = this.paginator;
          this.collaboraterDataSource.sort = this.sort;
        },
        error: (err) => {
          console.error('Error fetching collaboraters:', err);
          this.snackBarService.showError(err);
        }
      });
    } else {
      this.snackBarService.showError('Please select both type and option');
    }
  }
}
