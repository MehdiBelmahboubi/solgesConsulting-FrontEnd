import {Component, Inject, OnInit} from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatCard, MatCardActions, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatTooltip} from "@angular/material/tooltip";
import {NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {TypeUnity} from "../../../../models/TypeUnity.model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TypeUnityService} from "../../../../services/TypeUnity.service";
import {SnackBarService} from "../../../../services/snackBar.service";
import {MatRadioButton, MatRadioChange, MatRadioGroup} from "@angular/material/radio";

@Component({
  selector: 'app-dialog-update-type-unity',
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardTitle,
    MatError,
    MatFormField,
    MatIcon,
    MatIconButton,
    MatInput,
    MatLabel,
    MatTooltip,
    NgIf,
    ReactiveFormsModule,
    MatRadioGroup,
    MatRadioButton,
    FormsModule
  ],
  templateUrl: './dialog-update-type-unity.component.html',
  styleUrl: './dialog-update-type-unity.component.scss'
})
export class DialogUpdateTypeUnityComponent implements OnInit{
  formGroup!: UntypedFormGroup;
  backgroundColorBlue='';
  typeUnity! :TypeUnity;
  typesUnity: TypeUnity[]=[];
  newTypeError='';
  typeLevelIsValid =true;
  typeNameIsValid =true;
  typeCodeIsValid =true;
  actionAdd=false;
  action!: string;
  dialogTitle!: string;
  statusType!: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) private data:any,
              private dialogRef:MatDialogRef<DialogUpdateTypeUnityComponent>,
              private fb:UntypedFormBuilder,
              private typeUnityService:TypeUnityService,
              private snackBarService:SnackBarService) {
    this.backgroundColorBlue=this.data.backgroundColorBlue;
    this.typesUnity=this.data.typesUnity;
    this.action=this.data.action;
    if(this.action == 'update'){

      this.actionAdd=true;
      this.typeUnity=this.data.typeUnity;
      const index = this.typesUnity.findIndex(typeUnity => typeUnity.id === this.typeUnity.id);
      this.typesUnity.splice(index, 1);
      this.dialogTitle="Modifier type d'unité "+this.typeUnity.code;
      console.log("unity a modifier :",this.typeUnity)
    }
    if(this.action=='add'){
      this.dialogTitle="else"
    }
    console.log('on est dans dialog : ',this.typesUnity)
  }
  ngOnInit(): void {
    this.formGroup = this.fb.group({
      nom : [this.typeUnity.name,Validators.required],
      code : [this.typeUnity.code,Validators.required],
      level : [this.typeUnity.level,Validators.required],
      active : [this.typeUnity.active,Validators.required],
      color :['#FFFFFF']
    });
    this.statusType=this.typeUnity.active;

  }

  updateTypeUnity() {
    const typeUnityExist=this.typesUnity.filter(value => value.level == this.formGroup.value.level || value.name == this.formGroup.value.nom || value.code == this.formGroup.value.code);
    if(typeUnityExist){
      if(this.typeCodeIsValid && this.typeNameIsValid && this.typeLevelIsValid){
        if(this.formGroup.valid){
           const typeUnity=new TypeUnity(this.formGroup.value.nom,this.formGroup.value.code,this.formGroup.value.level,this.data.idCompany,this.data.idUserCreated,this.formGroup.value.color);
           typeUnity.id=this.typeUnity.id;
          console.log("update type unity is :",this.typeUnity)
          this.typeUnityService.update(typeUnity).subscribe({
            next : value=>{
              console.log("response : ",value)
              this.snackBarService.showSuccess('Type est Modifier avec Success ! ');
              this.dialogRef.close();
            },
            error :err => {
              console.log("erreur response *:",err);
              this.snackBarService.showError('Type est attaché à des unités qui ont un type de niveau inférieur à celui entré ! ')
            }
          });
        }
      }
      if(!this.typeLevelIsValid){
        this.newTypeError="ce niveau déjà occupé"
      }
      if(!this.typeCodeIsValid){
        this.newTypeError= "cette abréviation déjà existe"
      }
      if(!this.typeNameIsValid){
        this.newTypeError="ce nom déjà existe"
      }
    }
    else{
      this.newTypeError='un type exist avec ces information';
    }
  }

  close(){
    this.dialogRef.close();
  }

  checkLevelIsNotExist() {
    if(this.formGroup.value.level){
      const levelExist :TypeUnity[]=this.typesUnity.filter(value => value.level == this.formGroup.value.level && value.active);
      if(levelExist.length !== 0 && this.formGroup.value.active) {
        this.formGroup.get('level')?.setValue('');
        this.newTypeError = "ce niveau déjà occupé";
        this.typeLevelIsValid=false;
      }
      this.typeLevelIsValid=true;
    }

  }

  checkNameIsNotExist() {
    if(this.formGroup.value.nom){
      const nameExist: TypeUnity[] = this.typesUnity.filter(value => value.name.toLowerCase() == this.formGroup.value.nom.toLowerCase());
      if (nameExist.length !== 0) {
        this.newTypeError = "ce nom déjà existe";
        console.log('',this.newTypeError)
        this.typeNameIsValid=false;
        this.formGroup.get('nom')?.setValue('');
      }
      this.typeNameIsValid=true;
    }
  }

  checkCodeIsNotExist() {
    if(this.formGroup.value.code){
      const codeExist: TypeUnity[] = this.typesUnity.filter(value => value.code.toLowerCase() == this.formGroup.value.code.toLowerCase());
      if (codeExist.length !== 0) {
        this.newTypeError = "cette abréviation déjà existe";
        this.formGroup.get('code')?.setValue('');
        this.typeCodeIsValid=false;
      }
      this.typeCodeIsValid=true;
    }
  }

  onFocusLevel() {
    // this.newTypeError='';
    this.typeLevelIsValid=false;
  }
  onFocusName() {
    //this.newTypeError='';
    this.typeNameIsValid=false;
  }
  onFocusCode() {
    //this.newTypeError='';
    this.typeCodeIsValid=false;
  }

  statusTypeChange($event: MatRadioChange) {
    const selectedValue=$event.value;
    this.checkLevelIsNotExist();
  }
}
