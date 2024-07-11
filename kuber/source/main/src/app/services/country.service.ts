import {Inject, Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import {AppConfig, CONFIG_TOKEN} from "@config/config";
import { Country } from 'app/models/country.model';

@Injectable({
  providedIn: 'root'
})
export class CountryService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'assets/data/my-projects-client.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<Country[]> = new BehaviorSubject<Country[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData!: Country;
  constructor(private http: HttpClient,
              @Inject(CONFIG_TOKEN) private appConfig :AppConfig) {
    super();
  }
  
  getAllNationalities() :Observable<Country[]>{
    return this.http.get<Country[]>(`${this.appConfig.apiUrl}/country/getAllNationalities`)
  }
}
