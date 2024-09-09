import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { HttpClient } from '@angular/common/http';
import { AppConfig, CONFIG_TOKEN } from "@config/config";
import { Contract } from 'app/models/contract.model';
import { contractType } from 'app/models/contractType.model';
import { LocalStorageService } from './storage/local-storage.service';

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
    @Inject(CONFIG_TOKEN) private appConfig: AppConfig,
    private localStorageService: LocalStorageService) {
    super();
  }

  addContract(contract:Contract):Observable<any>{
    const companyId = this.localStorageService.getCurrentCompany()?.id;
    if (companyId !== undefined) {
      contract.companyId = companyId;
      return this.httpClient.post<Contract>(`${this.appConfig.apiUrl}/contracts`,contract);
    } else {
      throw new Error('Current company ID is undefined');
    }
  }

  updateContract(contract:Contract):Observable<any>{
    return this.httpClient.put<Contract>(`${this.appConfig.apiUrl}/contracts`,contract);
  }

  getAllTypes() : Observable<contractType[]>{
    return this.httpClient.get<contractType[]>(`${this.appConfig.apiUrl}/contracts/types`)
  }
}
