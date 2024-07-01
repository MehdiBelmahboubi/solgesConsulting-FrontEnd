
import {Company} from "./company.model";
export class Client {
  public id!: number;
  public firstName!: string;
  public lastName!: string;
  public passWord!: string;
  public confirmPassWord!: string;
  public email!: string;
  public telephone!: string;
  public address!: string;
  public uuid!: string;
  public ville!: string;
  public uuidExpiredDate!: Date;
  public status!: string;
  public companies!: Company[];
  public imageCompanyId! :number;
  public company!:Company;

  constructor(firstName:string,lastName :string,email:string,company:Company) {
    {
      this.lastName=lastName || '';
      this.firstName=firstName || '';
      this.email=email || '';
      this.company=company;
      //this.last_modify = formatDate(new Date(), 'yyyy-MM-dd', 'en') || '';
    }
  }

}
