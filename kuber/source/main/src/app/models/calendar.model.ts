import {DayOfWeek} from "./dayOfWeek.model";

export class Calendar{
  public id!:number;
  public code!:string;
  public libelle!:string;
  public jourFerier!:boolean;
  public daysOfWeek!: DayOfWeek[];
  public companyId!:number;


  constructor(){}
}
