import { Injectable } from '@angular/core';
import Swal from "sweetalert2";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SnackBarComponent} from "../../components/snack-bar/snack-bar.component";

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor(private snackBar: MatSnackBar) { }


  alertMessage(message: string): void {
    Swal.fire(`${message}`)
  }

  alertConfirmPopup(text?: string) {
    return Swal.fire({
      title: 'Are you sure?',
      text: `${text || ''}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    })
  }

  topEndAlert(message: string): void {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: `${message}`,
      showConfirmButton: false,
      timer: 2500
    })
  }

  showSnackBar(message: string): void {
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: 2000,
      data: message
    });
  }
}
