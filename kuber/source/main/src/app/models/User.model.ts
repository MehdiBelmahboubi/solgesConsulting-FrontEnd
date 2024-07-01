
import {Company} from "./company.model";
import {Role} from "./role.model";
export class User {
  public id!: number;
  public firstName!: string;
  public lastName?: string;
  public password!: string;
  public email!: string;
  public telephone!: string;
  public address!: string;
  public uuid!: string;
  public ville!: string;
  public uuidExpiredDate!: Date;
  public status!: string;
  public companies!: Company[];
  public roles: Role | never[];
  public urlImage! :string ;
  public accessToken!:string;
  public refreshToken!:string;
  constructor(firstName:string,lastName :string,email:string,roles:Role,urlImage:string) {
    {
      this.lastName=lastName || '';
      this.firstName=firstName || '';
      this.email=email || '';
      this.roles=roles || [];
      this.urlImage=urlImage || '';
    }
  }

}
