import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSelectModule } from '@angular/material/select';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { HeaderSirhClientComponent } from 'app/client-sirh/header-sirh-client/header-sirh-client.component';
import { Collaborater } from 'app/models/collaborater.model';
import { ContractService } from 'app/services/contract.service';
import { Contract } from 'app/models/contract.model';

@Component({
  selector: 'app-contrat-collaborater',
  standalone: true,
  imports: [
    MatIconModule, MatIcon, HeaderSirhClientComponent, RouterLink, BreadcrumbComponent,
    MatIconModule, MatProgressSpinnerModule, MatTableModule, MatSortModule, MatCardModule,
    MatPaginatorModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatCheckboxModule,
    ReactiveFormsModule, MatButtonModule, MatMenuModule, MatIconModule
  ],
  templateUrl: './contrat-collaborater.component.html',
  styleUrls: ['./contrat-collaborater.component.scss']
})
export class ContratCollaboraterComponent implements OnInit, AfterViewInit {
  collaborater!: Collaborater;
  contract!: Contract;
  displayedColumns: string[] = ['contractRef', 'motifRecrutement', 'dateEntree', 'periodNegocible', 'regimeFiscal', 'exonerationFiscale', 'motifDepart', 'dateFin', 'action'];
  contractDataSource = new MatTableDataSource<Contract>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private contractService: ContractService) { }

  ngOnInit(): void {
    if (history.state && history.state.collaborater) {
      this.collaborater = history.state.collaborater;
    }
    this.contractService.getActiveContract(this.collaborater.id).subscribe({
      next: (value) => {
        this.contract = value;
        this.contractDataSource.data = [this.contract];
      },
      error: (err) => {
        console.error('Error fetching contract:', err);
      }
    });
  }

  ngAfterViewInit() {
    this.contractDataSource.paginator = this.paginator;
    this.contractDataSource.sort = this.sort;
  }
}
