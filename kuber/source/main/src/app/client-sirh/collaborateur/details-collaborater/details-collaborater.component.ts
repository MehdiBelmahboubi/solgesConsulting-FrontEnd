import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FeatherIconsComponent } from "@shared/components/feather-icons/feather-icons.component";
import { MatButton, MatIconButton } from "@angular/material/button";
import { MatMenu, MatMenuItem, MatMenuTrigger } from "@angular/material/menu";
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from "@angular/router";
import { BreadcrumbComponent } from "@shared/components/breadcrumb/breadcrumb.component";
import { MatIcon } from "@angular/material/icon";
import { MatProgressBar } from "@angular/material/progress-bar";
import { NgApexchartsModule } from "ng-apexcharts";
import { NgScrollbar } from "ngx-scrollbar";
import { NgClass, NgIf } from "@angular/common";
import { ContratCollaboraterComponent } from "./contrat-collaborater/contrat-collaborater.component";
import { ClassificationCollaboraterComponent } from './classification-collaborater/classification-collaborater.component';
import { HeaderSirhClientComponent } from 'app/client-sirh/header-sirh-client/header-sirh-client.component';
import { PersoInfosCollaboraterComponent } from './perso-infos-collaborater/perso-infos-collaborater.component';
import { ImmatriculationCollaboraterComponent } from "./immatriculation-collaborater/immatriculation-collaborater.component";
import { CoordonneesCollaboraterComponent } from "./coordonnees-collaborater/coordonnees-collaborater.component";
import { FamilleCollaboraterComponent } from "./famille-collaborater/famille-collaborater.component";
import { AutreinfoCollaboraterComponent } from "./autreinfo-collaborater/autreinfo-collaborater.component";
import { CollaboraterService } from 'app/services/collaborater.service';
import { Collaborater } from 'app/models/collaborater.model';
import { Contract } from 'app/models/contract.model';
import { Classification } from 'app/models/classification.model';

export function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

@Component({
  selector: 'app-structure-organisations',
  standalone: true,
  imports: [
    FeatherIconsComponent,
    HeaderSirhClientComponent,
    MatButton,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    RouterLink,
    BreadcrumbComponent,
    MatIcon,
    MatIconButton,
    MatProgressBar,
    NgApexchartsModule,
    NgScrollbar,
    NgClass,
    NgIf,
    RouterOutlet,
    PersoInfosCollaboraterComponent,
    ContratCollaboraterComponent,
    ClassificationCollaboraterComponent,
    ImmatriculationCollaboraterComponent,
    CoordonneesCollaboraterComponent,
    FamilleCollaboraterComponent,
    AutreinfoCollaboraterComponent
],
  templateUrl: './details-collaborater.component.html',
  styleUrls: ['./details-collaborater.component.scss']
})
export class DetailsCollaboraterComponent implements OnInit, AfterViewInit {
  collaborater: Collaborater = new Collaborater();
  contract: Contract = new Contract();
  classification: Classification = new Classification();
  mode!: string;

  persoInfosCollaboraterComponent: boolean = true;
  contratCollaboraterComponent: boolean = false;
  classificationCollaboraterComponent: boolean = false;
  immatriculationCollaboraterComponent: boolean = false;
  coordonneesCollaboraterComponent: boolean = false;
  familleCollaboraterComponent: boolean = false;
  autreinfoCollaboraterComponent: boolean = false;
  componentActive: string = '';

  findComponentActive(componentActive: string) {
    this.componentActive = componentActive;
    this.resetComponents();
    if (componentActive === 'persoInfosCollaboraterComponent') {
      this.persoInfosCollaboraterComponent = true;
    } else if (componentActive === 'contratCollaboraterComponent') {
      this.contratCollaboraterComponent = true;
    } else if (componentActive === 'classificationCollaboraterComponent') {
      this.classificationCollaboraterComponent = true;
    } else if (componentActive === 'immatriculationCollaboraterComponent') {
      this.immatriculationCollaboraterComponent = true;
    } else if (componentActive === 'coordonneesCollaboraterComponent') {
      this.coordonneesCollaboraterComponent = true;
    } else if (componentActive === 'familleCollaboraterComponent') {
      this.familleCollaboraterComponent = true;
    } else if (componentActive === 'autreinfoCollaboraterComponent') {
      this.autreinfoCollaboraterComponent = true;
    } else {
      console.log("No route found");
    }
  }

  resetComponents() {
    this.persoInfosCollaboraterComponent = false;
    this.contratCollaboraterComponent = false;
    this.classificationCollaboraterComponent = false;
    this.immatriculationCollaboraterComponent = false;
    this.coordonneesCollaboraterComponent = false;
    this.familleCollaboraterComponent = false;
    this.autreinfoCollaboraterComponent = false;
  }

  constructor(
    private collaboraterService: CollaboraterService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      this.mode = params['mode'] || 'view';

      if (this.mode === 'update' && id) {
        this.mode = "editMode";
        this.collaboraterService.getById(id).subscribe({
          next: (value) => {
            this.collaborater = value;
            if(value.contract===null){
              this.contract = new Contract();
            }else{
              this.contract = value.contract;
            }
            if(value.classification===null){
              this.classification = new Classification();
            }else{
              this.classification = value.classification;
            }
          },
          error: (err) => {
            console.error('Error fetching Collaborater:', err);
          }
        });
      } else if (id) {
        this.collaboraterService.getById(id).subscribe({
          next: (value) => {
            this.collaborater = value;
            if(value.contract===null){
              this.contract = new Contract();
            }else{
              this.contract = value.contract;
            }
            if(value.classification===null){
              this.classification = new Classification();
            }else{
              this.classification = value.classification;
            }
          },
          error: (err) => {
            console.error('Error fetching Collaborater:', err);
          }
        });
      } else {
        this.mode = "addMode";
        this.collaborater = new Collaborater();
        this.contract = new Contract();
        this.classification = new Classification();
      }

      this.findComponentActive('persoInfosCollaboraterComponent');
    });
  }

  ngAfterViewInit(): void { }

  handleCollaboratorUpdate(updatedCollaborator: Collaborater) {
    this.collaborater = updatedCollaborator;
  }
}
