export class Role {
  public id!: number;
  public name!: string;


  constructor(name:string) {
    {
      this.name=name || '';
    }
  }


}
