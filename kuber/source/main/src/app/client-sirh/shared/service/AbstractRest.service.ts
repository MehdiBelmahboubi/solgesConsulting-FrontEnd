import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";


export abstract class AbstractRestService<T> {
  constructor(protected httpClient:HttpClient,protected url:string,protected table:string,
              protected companyId:number,protected userCreatedId:number) {}

  uploadFile(file: File): Observable<any> {
    let params= new HttpParams();
    params=params.set('table',this.table)
    params=params.set('companyId',this.companyId)
    params=params.set('userCreatedId',this.userCreatedId)
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    console.log("name of file :",file.name)
    if(this.companyId != -1 && this.userCreatedId !=-1){
      return this.httpClient.post<any>(`${this.url}/uploadFile`, formData,{params:params})
        .pipe(
          catchError((error: any) => {
            return throwError(error);
          })
        );
    }
    else {
      return throwError("companyId or userId  not selected ");
    }
  }
}
