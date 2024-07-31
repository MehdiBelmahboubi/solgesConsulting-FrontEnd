export class Contract{
    public id!:number;
    public contractRef!:string;
    public motifRecrutement!:string;
    public dateEntree!:Date;
    public periodNegocible!:number;
    public regimeFiscal!:string;
    public exonerationFiscale!:number;
    public motifDepart!:string;
    public dateFin!:Date;
    public contractType!:number;
    public collaboraterId!:number;

    constructor(){}
}