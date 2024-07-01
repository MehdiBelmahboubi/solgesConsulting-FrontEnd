
export class TypeUnity {
  public id!: number;
  public name!: string;
  public code!: string;
  public level! :number;
  public companyId!:number;
  public idUserCreated!:number;
  public active! :boolean;
  public endDate! :Date;
  public startDate! :Date;
  public createDate! :Date;
  public updateDate! :Date;
  public color! :string;
  constructor(name:string,code:string,level:number,idCompany:number,idUserCreated:number,color:string) {
    this.name=name;
    this.code=code;
    this.level=level;
    this.companyId=idCompany;
    this.idUserCreated=idUserCreated;
    this.color=color;
  }
}

