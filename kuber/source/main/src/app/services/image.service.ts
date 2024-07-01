import { HttpClient } from '@angular/common/http';
import {Inject, Injectable } from '@angular/core';
import { AppConfig, CONFIG_TOKEN } from '@config/config';
import { Observable } from 'rxjs';
import {Image } from '../models/image.model'
@Injectable({
  providedIn: 'root'
})
export class ImageService {


  constructor(private httpClient: HttpClient,
              @Inject(CONFIG_TOKEN) private appConfig:AppConfig) { }

  public list(): Observable<Image[]> {
    return this.httpClient.get<Image[]>(this.appConfig.apiUrl + '/list');
  }

  public upload(image: File): Observable<never> {
    const formData = new FormData();
    formData.append('multipartFile', image);
    return this.httpClient.post<never>(this.appConfig.apiUrl + '/cloudinary/upload', formData);
  }

  public delete(id: number): Observable<never> {
    return this.httpClient.delete<never>(this.appConfig.apiUrl + `/delete/${id}`);
  }

}
