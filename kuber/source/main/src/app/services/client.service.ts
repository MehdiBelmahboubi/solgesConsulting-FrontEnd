import {Inject, Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import {Client} from "../models/client.model";
import {AppConfig, CONFIG_TOKEN} from "@config/config";


@Injectable({
  providedIn: 'root',
})
export class ClientService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'assets/data/my-projects-client.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<Client[]> = new BehaviorSubject<Client[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData!: Client;
  constructor(private httpClient: HttpClient,
              @Inject(CONFIG_TOKEN) private appConfig :AppConfig) {
    super();
  }
  get data(): Client[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }

  checkMail(user: Client): Observable<Client> {
    return this.httpClient.post<Client>(this.appConfig.apiUrl+'/auth/confirmedEmail',user);
  }
  save(user: Client): Observable<Client> {
    console.log("on est dans methode savee ")
    return this.httpClient.post<Client>(this.appConfig.apiUrl+'/auth/register',user);
  }
  register(user: Client): Observable<Client> {
    console.log("on est dans methode register ")
    return this.httpClient.post<Client>(this.appConfig.apiUrl+'/users/register',user);
  }
}
