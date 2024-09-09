import {Inject, Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Contract} from "../models/contract.model";
import {HttpClient} from "@angular/common/http";
import {AppConfig, CONFIG_TOKEN} from "@config/config";
import {LocalStorageService} from "./storage/local-storage.service";
import {UnsubscribeOnDestroyAdapter} from "@shared";
import {Conges} from "../models/conges.model";

@Injectable({
  providedIn: 'root'
})
export class CongesService extends UnsubscribeOnDestroyAdapter {
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

  addConges(conges:Conges):Observable<any>{
    const companyId = this.localStorageService.getCurrentCompany()?.id;
    if (companyId !== undefined) {
      conges.companyId = companyId;
      return this.httpClient.post<Conges>(`${this.appConfig.apiUrl}/conges`,conges);
    } else {
      throw new Error('Current company ID is undefined');
    }
  }
}
