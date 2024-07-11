import {AfterViewInit, Component, Input, OnInit, Output} from '@angular/core';
import {FeatherIconsComponent} from "@shared/components/feather-icons/feather-icons.component";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {RouterLink, RouterOutlet} from "@angular/router";
import {BreadcrumbComponent} from "@shared/components/breadcrumb/breadcrumb.component";
import {MatIcon} from "@angular/material/icon";
import {MatProgressBar} from "@angular/material/progress-bar";
import {NgApexchartsModule} from "ng-apexcharts";
import {NgScrollbar} from "ngx-scrollbar";
import {NgIf} from "@angular/common";
import { ContratCollaboraterComponent } from "./contrat-collaborater/contrat-collaborater.component";
import { ClassificationCollaboraterComponent } from './classification-collaborater/classification-collaborater.component';


export function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

@Component({
  selector: 'app-structure-organisations',
  standalone: true,
    imports: [
    FeatherIconsComponent,
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
    NgIf,
    RouterOutlet,
    ContratCollaboraterComponent,
    ClassificationCollaboraterComponent
],
  templateUrl: './details-collaborater.component.html',
  styleUrl: './details-collaborater.component.scss'
})
export class DetailsCollaboraterComponent implements OnInit,AfterViewInit{
  contratCollaboraterComponent : boolean=true;
  classificationCollaboraterComponent : boolean =false;
  componentActive:string ='';
  
  @Input() loading =true ;
  @Output() refreshUnity!:boolean;

  findComponentActive(componentActive:string) {
    if(componentActive === 'contratCollaboraterComponent'){
      console.log("holooooo")
      this.componentActive='contratCollaboraterComponent';
      this.contratCollaboraterComponent=true;
      this.classificationCollaboraterComponent=false;
      
    }
    else if(componentActive === 'classificationCollaboraterComponent'){
      this.componentActive='classificationCollaboraterComponent';
      this.classificationCollaboraterComponent=true;
      this.contratCollaboraterComponent=false;
     
    }
    else{
     console.log("pas de route")
    }
  }

  ngOnInit(): void {
    this.findComponentActive('contratCollaboraterComponent');
  }

  ngAfterViewInit(): void {

  }

 
}
