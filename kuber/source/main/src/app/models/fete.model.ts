import { TypeFete } from "./typefete.model";

export class Fete{  
    public id!:number;
    public code!:number;
    public libelle!:string;
    public typeId!:number;
    public typeFete!:TypeFete;
    public companyId!:number;

    constructor(){}
}