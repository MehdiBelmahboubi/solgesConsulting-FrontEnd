import {Client} from "./client.model";
import {Image} from "./image.model";
import {Unity} from "./Unity.model";
export class Company {
  public id!: number;
  public name!: string;
  public raisonSocial!: string;
  code!: string;
  public titledCommercial!: string;
  rc!: string;
  public ice!: string;
  public iss!: string;
  public tva!: string;
  public patent!: string;
  public cnss!: string;
  public codePostal!: string;
  public image?: Image;
  public imageId?: number;
  public client!: Client;
  public address!:string;
  public filialCompany!: Company[];
  public number!:string;
  public parentCompany!: Company;
  public unitOrganisationalList!: Unity[];
  constructor(name:string,code:string,address:string,number:string) {
    this.address=address;
    this.name=name;
    this.code=code;
    this.number=number;
  }

}
