import {Inject, Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {UnsubscribeOnDestroyAdapter} from '@shared';
import {Company} from "../models/company.model";
import {AppConfig, CONFIG_TOKEN} from "@config/config";


@Injectable({
  providedIn: 'root',
})
export class CompanyService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'assets/data/my-projects-client.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<Company[]> = new BehaviorSubject<Company[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData!: Company;

  constructor( private http:HttpClient,
               @Inject(CONFIG_TOKEN) private appConfig:AppConfig) {
    super();
  }


  getAllCompanies() :Observable<Company[]>{
    return this.http.get<Company[]>(this.appConfig.apiUrl+'/companies')

  }
  save(Company :Company){
    return this.http.post<Company>(this.appConfig.apiUrl+'/companies',Company);
  }

  get data(): Company[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */

  addCompany(Company: Company): void {
    this.dialogData = Company;
    // this.httpClient.post(this.API_URL, Company)
    //   .subscribe({
    //     next: (data) => {
    //       this.dialogData = Company;
    //     },
    //     error: (error: HttpErrorResponse) => {
    //        // error code here
    //     },
    //   });
  }
  updateCompany(Company: Company): void {
    this.dialogData = Company;

    // this.httpClient.put(this.API_URL + Company.id, Company)
    //     .subscribe({
    //       next: (data) => {
    //         this.dialogData = Company;
    //       },
    //       error: (error: HttpErrorResponse) => {
    //          // error code here
    //       },
    //     });
  }
  deleteCompany(id: number): void {
    console.log(id);

    // this.httpClient.delete(this.API_URL + id)
    //     .subscribe({
    //       next: (data) => {
    //         console.log(id);
    //       },
    //       error: (error: HttpErrorResponse) => {
    //          // error code here
    //       },
    //     });
  }
}
