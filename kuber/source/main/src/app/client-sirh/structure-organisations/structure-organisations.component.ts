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
import {TypeUnityService} from "../../services/TypeUnity.service";
import {TypeUnity} from "../../models/TypeUnity.model";
import {Unity} from "../../models/Unity.model";
import {UnityService} from "../../services/Unity.service";
import {MatTableDataSource} from "@angular/material/table";
import {DialogNewTypeUnityComponent} from "./configuration/dialog-new-type-unity/dialog-new-type-unity.component";
import {StylesService} from "../../services/stylesService";
import {LocalStorageService} from "../../services/storage/local-storage.service";
import {ListTypeUnityComponent} from "./configuration/list-type-unity/list-type-unity.component";

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
        DialogNewTypeUnityComponent,
        ListTypeUnityComponent,
        RouterOutlet
    ],
  templateUrl: './structure-organisations.component.html',
  styleUrl: './structure-organisations.component.scss'
})
export class StructureOrganisationsComponent implements OnInit,AfterViewInit{
  listUnityComponent : boolean=true;
  addUnitComponent : boolean =false;
  configurationComponent :boolean=false;
  addTypeUnityComponent :boolean=false;
  listTypeUnitComponent : boolean=false;
  managementUnity : boolean=false;
  organigrammeComponent : boolean=false;
  componentActive:string ='';
  unities :Unity[] = [];
  @Input() loading =true ;
  @Output() refreshUnity!:boolean;
  dataSource! : MatTableDataSource<Unity>;
  typesUnity :TypeUnity[] = [];
  typesUnityNames :string[] = [];
  backgroundColorBlue='';
  userCreatedId!: number;
  idCompany!: number;

  @Output() activeTabIndex: number=0;
  @Output() unityConsult! :Unity;
  constructor(private typeUnityService:TypeUnityService,
              private unityService: UnityService,
              private stylesService:StylesService,
              private localStorageService:LocalStorageService) {

  }

  ngOnInit(): void {
    this.getAllTypesUnity();
    this.getAllUnities();
    // a changer
    this.backgroundColorBlue=this.stylesService.getBlueColor();
    this.backgroundColorBlue=this.stylesService.getBlueColor();
     this.userCreatedId=this.localStorageService.getUser()?.id || -1;
    this.idCompany =this.localStorageService.getCurrentCompany()?.id || -1;
  }

  openComponentManagement($event: any) {
    if($event.component=="viewUnity" || $event.component=="addUnity" || $event.component=="updateUnity" ){
      this.findComponentActive('managementUnity');
    }
    this.activeTabIndex=$event.activeTabIndex;
    this.unityConsult=$event.unityConsult;
  }

  refreshTypesUnity(){
    this.getAllTypesUnity();
  }
  getAllTypesUnity(){
    this.typeUnityService.getAll()
      .subscribe({
          next :data => {
             this.typesUnity = data;
             console.log("type unit data",data)
            data.forEach(type => this.typesUnityNames.push(type.name))
          },
          error : err => {
            console.log("____error ",err);
          },
          complete : () => {
          }
        }
      );
  }
  getAllUnities(){
    this.loading=true;
    this.unityService.getAll()
      .subscribe({
          next :data => {
            this.unities = data;
          },
          error : err => {
            console.log("____error ",err);
          },
          complete : () => {
            console.log("terminer");
          }
        }
      )
  }
  findComponentActive(componentActive:string) {
    if(componentActive === 'listUnityComponent'){
      console.log("holooooo")
      this.componentActive='listUnityComponent';
      this.listUnityComponent=true;
      this.addUnitComponent=false;
      this.configurationComponent=false;
      this.addTypeUnityComponent=false;
      this.listTypeUnitComponent=false;
      this.managementUnity=false;
      this.organigrammeComponent=false;
    }
    else if(componentActive === 'organigrammeComponent'){
      this.componentActive='organigrammeComponent';
      this.organigrammeComponent=true;
      this.listUnityComponent=false;
      this.addUnitComponent=false;
      this.configurationComponent=false;
      this.addTypeUnityComponent=false;
      this.listTypeUnitComponent=false;
      this.managementUnity=false;
    }
    else if (componentActive === 'addUnitComponent'){
      this.addUnitComponent=true;
      this.listUnityComponent=false;
      this.configurationComponent=false;
      this.addTypeUnityComponent=false;
      this.listTypeUnitComponent=false;
      this.managementUnity=false;
      this.componentActive='addUnitComponent';
      this.organigrammeComponent=false;
    }
    else if (componentActive === 'listTypeUnitComponent'){
      this.listTypeUnitComponent=true;
      this.addUnitComponent=false;
      this.listUnityComponent=false;
      this.configurationComponent=false;
      this.addTypeUnityComponent=false;
      this.managementUnity=false;
      this.componentActive='addUnitComponent';
      this.organigrammeComponent=false;
    }
    else if (componentActive === 'configurationComponent'){
      this.configurationComponent=true;
      this.addUnitComponent=false;
      this.listUnityComponent=false;
      this.addTypeUnityComponent=false;
      this.listTypeUnitComponent=false;
      this.managementUnity=false;
      this.componentActive='configurationComponent';
      this.organigrammeComponent=false;
    }
    else if (componentActive === 'addTypeUnityComponent'){
      this.addTypeUnityComponent=true;
      this.configurationComponent=false;
      this.addUnitComponent=false;
      this.listUnityComponent=false;
      this.listTypeUnitComponent=false;
      this.managementUnity=false;
      this.componentActive='addTypeUnityComponent';
      this.organigrammeComponent=false;
    }
    else if (componentActive === 'managementUnity'){
      console.log("hooolllla ")
      this.managementUnity=true;
      this.addTypeUnityComponent=false;
      this.configurationComponent=false;
      this.addUnitComponent=false;
      this.listUnityComponent=false;
      this.listTypeUnitComponent=false;
      this.componentActive='managementUnity';
      this.organigrammeComponent=false;
    }
    else{
     console.log("pas de route")
    }
   console.log(this.componentActive);
  }

  ngAfterViewInit(): void {

  }

  refreshEmitter($event: any) {
    this.refreshTypesUnity();
  }
}
