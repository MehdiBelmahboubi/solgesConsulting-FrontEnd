import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatLabel, MatOption, MatSelect} from "@angular/material/select";
import {NgxMatSelectSearchModule} from "ngx-mat-select-search";
import {MatIconButton, MatMiniFabButton} from "@angular/material/button";
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef,
  MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, MatSortHeader, Sort} from "@angular/material/sort";
import {TypeUnity} from "../../../../models/TypeUnity.model";
import {compare, compareDates} from "../../structure-organisations.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DatePipe, NgForOf, NgIf, NgStyle} from "@angular/common";
import {BreadcrumbComponent} from "@shared/components/breadcrumb/breadcrumb.component";
import {SelectionModel} from "@angular/cdk/collections";
import {MatTooltip} from "@angular/material/tooltip";
import {MatIcon} from "@angular/material/icon";
import {TypeUnityService} from "../../../../services/TypeUnity.service";
import {StylesService} from "../../../../services/stylesService";
import {SnackBarService} from "../../../../services/snackBar.service";
import {DialogNewTypeUnityComponent} from "../dialog-new-type-unity/dialog-new-type-unity.component";
import {MatDialog} from "@angular/material/dialog";
import {LocalStorageService} from "../../../../services/storage/local-storage.service";
import {DialogUpdateTypeUnityComponent} from "../dialog-update-type-unity/dialog-update-type-unity.component";
import {HeaderSirhClientComponent} from "../../../header-sirh-client/header-sirh-client.component";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {FeatherIconsComponent} from "@shared/components/feather-icons/feather-icons.component";



@Component({
  selector: 'app-list-type-unity',
  standalone: true,
  imports: [
    MatProgressSpinner,
    MatSelect,
    MatLabel,
    NgxMatSelectSearchModule,
    MatOption,
    MatMiniFabButton,
    MatTable,
    MatHeaderCell,
    MatCheckbox,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatPaginator,
    MatSort,
    FormsModule,
    ReactiveFormsModule,
    NgForOf,
    BreadcrumbComponent,
    MatColumnDef,
    MatCellDef,
    MatHeaderCellDef,
    MatTooltip,
    MatIconButton,
    NgIf,
    MatHeaderRowDef,
    MatIcon,
    MatRowDef,
    MatSortHeader,
    DatePipe,
    HeaderSirhClientComponent,
    MatMenu,
    MatMenuTrigger,
    MatMenuItem,
    FeatherIconsComponent,
    NgStyle
  ],
  templateUrl: './list-type-unity.component.html',
  styleUrl: './list-type-unity.component.scss'
})
export class ListTypeUnityComponent implements OnInit{

  @ViewChild(MatPaginator) allPaginator!: MatPaginator;
  @Input() dataSource! : MatTableDataSource<TypeUnity>;
  loading! :boolean ;
  @ViewChild(MatSort) sort!: MatSort;
  typesUnity : TypeUnity[]=[];
  typeUnityFiltered :TypeUnity[]=[];
  selectedFile: File | null = null;
  backgroundColorBlue='';
  selection =new SelectionModel<TypeUnity>(true,[])
  displayColumns =['name','active','level','color','updateDate','action'];
  checkboxDisabled: boolean=true;
  archive: boolean=true;
  @Output() public refreshTypesUnityEmitter=new EventEmitter();

  constructor(private typeUnityService:TypeUnityService,
              private stylesService:StylesService,
              private snackBarService:SnackBarService,
              private localStorageService:LocalStorageService,
              private dialog:MatDialog) {
    this.dataSource = new MatTableDataSource<TypeUnity>([])
  }
  ngOnInit(): void {
    this.getAllTypesUnity();
    this.backgroundColorBlue=this.stylesService.getBlueColor();
  }
  getAllTypesUnity(){
    this.checkboxDisabled=false;
    this.typeUnityService.getAll()
      .subscribe({
          next :(data: TypeUnity[]) => {
            this.typesUnity = data;
            console.log("-------------- :",this.typesUnity);
            this.typeUnityFiltered=this.typesUnity.filter(type =>type.active );
            this.dataSource.data=this.typeUnityFiltered;
            this.dataSource.paginator = this.allPaginator;
            console.log("dataSource :",this.dataSource);
            this.loading=false;

          },
          error : err => {
            this.loading=true;
            this.snackBarService.showError(err)
          },
          complete : () => {

          }
        }
      );
  }
  sortData(sort: Sort) {
    console.log("sort event :",this.sort);
    const data = this.dataSource.data.slice();
    if (!sort.active || sort.direction === '') {
      this.typesUnity = data;
      return;
    }
    this.dataSource.data = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return compare(a.name, b.name, isAsc);
        case 'code':
          return compare(a.code, b.code, isAsc);
        case 'id':
          return compare(a.id, b.id, isAsc);
        case 'level':
          return compare(a.level, b.level, isAsc);
        case 'updateDate':
          return compareDates( b.updateDate,a.updateDate,isAsc);
        default:
          return 0;
      }
    });
  }

  applyFilter(event: KeyboardEvent) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  refresh() {
    this.archive=true;
    this.getAllTypesUnity();

  }
  isAllSelected() {
    return this.selection.selected?.length == this.typesUnity.length;
  }
  toggleAll() {
    if(this.isAllSelected()){
      this.selection.clear();
      console.log("list selected clear :",this.selection.selected)
    }
    else{
      this.selection.select(...this.typesUnity);
      console.log("list selected all :",this.selection.selected)
    }
  }
  duplicate(typeUnity :TypeUnity) {
    this.typeUnityService.duplicate(typeUnity).subscribe({
      next : (value :TypeUnity)=>{
        console.log("response : ",value)
        this.snackBarService.showSuccess('Type est dupliquer avec Success ! ');
      },
      error :(err: any)  => {
        console.log("erreur response *:",err);
        this.snackBarService.showError('Duplication du type echoué  ! ')
      },
      complete :()=>{
        this.getAllTypesUnity();
      }
    });

  }

  updateType(typeUnity :TypeUnity) {
    console.log("---update type");
    const idUser=this.localStorageService.getUser()?.id || -1;
    const idCompany =this.localStorageService.getCurrentCompany()?.id || -1;
    if(idUser==-1 || idCompany==-1) return ;
    this.openPopupUpdateTypeUnity(this.dialog, idCompany,idUser,typeUnity)
      .subscribe(item=>{
        this.sort.active='updateDate';
        this
        this.sort.direction === 'desc'
        this.sortData(this.sort)
        this.refresh();
        if(item){
          /*this.commentService.save(item).subscribe({
            next :res =>{
              this.toastService.showSuccess("Votre commentaire est ajouter avec succes ");
              this.getCommentByTicket(this.ticket.id);
            },
            error :err => {
              this.toastService.showError(err);
            }
          })*/
        }
      });

  }

  deleteTypeUnity(id :number) {

  }

  viewTypeUnity(typeUnity :TypeUnity) {

  }
  onTypeToggled(typeUnity :TypeUnity) {
    this.selection.toggle(typeUnity);
    console.log("list selected :",this.selection.selected)
  }

  getColorsTrueOrFalse(status:boolean):string {
    return this.stylesService.getColorsTrueOrFalse(status);
  }


  onCheckboxChangeActive(event: any): void {
    const isChecked = event.checked;
    this.checkboxDisabled = event.checked;
    console.log('Checkbox is checked:', isChecked);
    if(isChecked){
      this.typeUnityFiltered=this.typesUnity;
      this.dataSource.data=this.typeUnityFiltered;
    }
    else{
      this.typeUnityFiltered=this.typesUnity.filter(type =>type.active );
      this.dataSource.data=this.typeUnityFiltered;
    }

  }
  openPopupNewTypeUnity(dialog :MatDialog,idCompany:number,idUser:number){
    var _popup=dialog.open(DialogNewTypeUnityComponent,{
      width:"500px",
      enterAnimationDuration :'200ms',
      exitAnimationDuration : '300ms',
      data : {
        idCompany : idCompany,
        idUser :idUser,
        backgroundColorBlue:this.backgroundColorBlue,
        typesUnity :this.typesUnity,
        action:"add",
      }
    });
    return _popup.afterClosed()
  }
  openPopupUpdateTypeUnity(dialog :MatDialog,idCompany:number,idUser:number,typeUnity:TypeUnity){
    var _popup=dialog.open(DialogUpdateTypeUnityComponent,{
      width:"600px",
      enterAnimationDuration :'200ms',
      exitAnimationDuration : '300ms',
      data : {
        idCompany : idCompany,
        idUser :idUser,
        backgroundColorBlue:this.backgroundColorBlue,
        typesUnity :this.typesUnity,
        typeUnity:typeUnity,
        action:"update",
      }
    });
    return _popup.afterClosed()
  }
  openComponentAddTypeUnity() {
    console.log("---new type");
    const idUser=this.localStorageService.getUser()?.id || -1;
    const idCompany =this.localStorageService.getCurrentCompany()?.id || -1;
    if(idUser==-1 || idCompany==-1) return ;
    this.openPopupNewTypeUnity(this.dialog, idCompany,idUser)
      .subscribe(item=>{
        if(item){
          this.refreshTypesUnityEmitter.emit();
          this.refresh();
        }
      });
  }

  archiverType(status: boolean) {
    this.archive=status;
    if(!this.archive){
      this.typeUnityFiltered=this.typesUnity;
      this.dataSource.data=this.typeUnityFiltered;
    }
    else{
      this.typeUnityFiltered=this.typesUnity.filter(type =>type.active );
      this.dataSource.data=this.typeUnityFiltered;
    }
  }

  advancedSearch() {

  }

  uploadFile(event: any) {
    console.log("upload file ")
    this.selectedFile = event.target.files[0] as File;
    event.target.value = null;
    if (this.selectedFile) {
      this.snackBarService.showSuccess('Fichier importer avec success ! ');
      this.massRegisterTypes(this.selectedFile);
    }
    else {
      this.snackBarService.showError('Fichier n\'est pas importer  ! ')
    }
  }
  massRegisterTypes(event:any){
    this.typeUnityService.uploadFile(event).subscribe({
      next: value => {
        if(value.message.includes('erreur')){
          this.snackBarService.showError('Création des types Echoué  ! ')
        }
        else{
          this.snackBarService.showSuccess(value.message +'! ');
        }
        console.log('resp :',value)
      },
      error: err => {
        console.log("erreur response *:", err);
        this.snackBarService.showError('Création des types Echoué  ! ')
      },
      complete:()=>{
        this.refresh();
      }
    });
  }
}
