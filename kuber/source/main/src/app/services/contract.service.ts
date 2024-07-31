import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { AppConfig, CONFIG_TOKEN } from "@config/config";
import { Contract } from 'app/models/contract.model';
import { contractType } from 'app/models/contractType.model';

@Injectable({
  providedIn: 'root'
})
export class ContractService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'assets/data/my-projects-client.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<Contract[]> = new BehaviorSubject<Contract[]>(
    []
  );

  dialogData!: Contract;
  constructor(private httpClient: HttpClient,
    @Inject(CONFIG_TOKEN) private appConfig: AppConfig) {
    super();
  }

  addContract(contract:Contract):Observable<any>{
    return this.httpClient.post<Contract>(`${this.appConfig.apiUrl}/contract/add`,contract);
  }

  updateContract(contract:Contract):Observable<any>{
    return this.httpClient.put<Contract>(`${this.appConfig.apiUrl}/contract/update`,contract);
  }

  getAllTypes() : Observable<contractType[]>{
    return this.httpClient.get<contractType[]>(`${this.appConfig.apiUrl}/contract/getTypes`)
  }
}
