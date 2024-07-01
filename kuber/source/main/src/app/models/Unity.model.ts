import {Company} from "./company.model";

export class Unity {
  public id!: number;
  public name!: string;
  public longName!: string;
  public shortName!: string;
  public nomenclature!: string;
  public abbreviation!: string;
  public description!: string;
  public createUserId!: number;
  public createUserEmail!:string;
  public updateUserId!: number;
  public createDateSys!: Date;
  public startDateSys! :Date;
  public endDateSys! :Date;
  public updateDateSys!: Date;
  public  createDate!: Date;
  public  updateDate!: Date;
  public  decisionDate!: Date;
  public  startDate!: Date;
  public  endDate!: Date;
  public note!: string;
  public managerName!: string;
  public company!: Company;
  public typeUnitOrganisationalId!: number;
  public parentUnitOrganisational!: Unity;
  public typeUnitOrganisational!:string;
  public manager!: string
  public address!: string
  public parentUnitOrganisationalId!: number;
  public parentUnitOrganisationalName!: string;
  public postName!: string;

  public active! :boolean;
  public level! :number;
  public parentCompanyId!: number;
  public parentUnityName!:string;
  public typeColor!:string;
   constructor(id:number,name:string,nomenclature:string,parent:number) {
     this.name=name;
     this.parentUnitOrganisationalId=parent;
     this.id=id;
     this.nomenclature=nomenclature;
   }
}

