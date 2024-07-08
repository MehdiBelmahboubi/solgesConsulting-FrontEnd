import {Component, Inject, OnInit} from '@angular/core';
import {MatCard, MatCardActions, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MatError, MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatOptgroup, MatSelect} from "@angular/material/select";
import {ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {CdkTextareaAutosize} from "@angular/cdk/text-field";
import {MatInput} from "@angular/material/input";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";
import {MatIcon} from "@angular/material/icon";
import {NgIf} from "@angular/common";
import {TypeUnity} from "../../../../models/TypeUnity.model";
import {TypeUnityService} from "../../../../services/TypeUnity.service";
import {SnackBarService} from "../../../../services/snackBar.service";

@Component({
  selector: 'app-dialog-new-type-unity',
  standalone: true,
  imports: [
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatLabel,
    MatSelect,
    MatOptgroup,
    ReactiveFormsModule,
    CdkTextareaAutosize,
    MatInput,
    MatFormField,
    MatCardActions,
    MatIconButton,
    MatTooltip,
    MatButton,
    MatError,
    MatIcon,
    MatSuffix,
    NgIf
  ],
  templateUrl: './dialog-new-type-unity.component.html',
  styleUrl: './dialog-new-type-unity.component.scss'
})
export class DialogNewTypeUnityComponent implements OnInit{
  formGroup!: UntypedFormGroup;
  backgroundColorBlue='';
  typeUnity! :TypeUnity;
  typesUnity: TypeUnity[]=[];
  newTypeError='';
  typeLevelIsValid =false;
  typeNameIsValid =false;
  typeCodeIsValid =false;
  actionAdd=false;
  action!: string;
  dialogTitle!: string;
  constructor(@Inject(MAT_DIALOG_DATA) private data:any,
              private dialogRef:MatDialogRef<DialogNewTypeUnityComponent>,
              private fb:UntypedFormBuilder,
              private typeUnityService:TypeUnityService,
              private snackBarService:SnackBarService) {
    this.backgroundColorBlue=this.data.backgroundColorBlue;
    this.typesUnity=this.data.typesUnity;
    this.action=this.data.action;
    if(this.action == 'update'){
      this.actionAdd=true;
      this.typeUnity=this.data.typeUnity;
      this.dialogTitle="Modifier type d'unité "+this.typeUnity.code;
      console.log("unity a modifier :",this.typeUnity)
    }
    if(this.action=='add'){
      this.dialogTitle="Créer un nouveau type d'unité:"
    }
    console.log('on est dans dialog : ',this.typesUnity)
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      nom : ['',Validators.required],
      code : ['',Validators.required],
      level : ['',Validators.required],
      color :['#FFFFFF']
    });
  }

  addTypeUnity() {
    const typeUnityExist=this.typesUnity.filter(value => value.level == this.formGroup.value.level || value.name == this.formGroup.value.nom || value.code == this.formGroup.value.code);
    if(typeUnityExist){
      if(this.typeCodeIsValid && this.typeNameIsValid && this.typeLevelIsValid){
        if(this.formGroup.valid){
          this.typeUnity=new TypeUnity(this.formGroup.value.nom,this.formGroup.value.code,this.formGroup.value.level,this.data.idCompany,this.data.idUserCreated,this.formGroup.value.color);
          console.log("new  type unity is :",this.typeUnity)
          this.typeUnityService.save(this.typeUnity).subscribe({
            next : value=>{
              console.log("response : ",value)
              this.snackBarService.showSuccess('Type est créer avec Success ! ');
              this.dialogRef.close(value);
          },
            error :err => {
              console.log("erreur response *:",err);
              this.snackBarService.showError('Création du type echoué  ! ')
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
      if(levelExist.length !== 0) {
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

  colorDone() {
    console.log("color choi :",this.formGroup.value.color)
  }
}
