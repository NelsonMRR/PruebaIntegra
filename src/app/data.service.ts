import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  //URL del servicio api que se utiliza
  private REST_API_SERVER = "https://api.coindesk.com/v1/bpi/currentprice.json";
  //Inyectamos httpclient
  constructor(private httpClient: HttpClient) { }

  //Metodo para el manejo de errores en la petición
  manejoErrores(error: HttpErrorResponse) {
    let errorMessage = 'Error desconocido!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Codigo de error: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => errorMessage);
  }

  //Metodo que envia la solicitud de get a la api
  public EnviarGetSolicitud(){
    return this.httpClient.get(this.REST_API_SERVER, {responseType:'text'}).pipe(retry(3), catchError(this.manejoErrores));
  }
}
