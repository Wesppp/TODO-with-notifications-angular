import { Injectable } from '@angular/core';
import { Observable, of} from "rxjs";
import {AlertsService} from "./alerts.service";

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(private alert: AlertsService) { }

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.alert.alertMessage(error)
      return of(result as T);
    }
  }
}
