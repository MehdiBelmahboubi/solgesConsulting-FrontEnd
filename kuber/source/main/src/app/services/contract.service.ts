import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { AppConfig, CONFIG_TOKEN } from "@config/config";
import { Contract } from 'app/models/contract.model';

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

  getActiveContract(id:number): Observable<Contract>{
    let param = new HttpParams();
    param = param.set('id',id);
    return this.httpClient.get<Contract>(`${this.appConfig.apiUrl}/contract/collaborater`,{params:param});
  }
}
