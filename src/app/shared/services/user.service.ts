import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "@environments/environment";
import {User} from "../interfaces/user";
import {catchError, finalize, Observable, of} from "rxjs";
import {HelperService} from "./helper.service";
import {Folder} from "../interfaces/folder";
import {Token} from "../interfaces/token";
import {Tokens} from "../interfaces/tokens";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public userUrl: string = environment.usersUrl
  public isDisabled: boolean = false

  constructor(private http: HttpClient,
              private helperService: HelperService) { }

  loginUser(user: User): Observable<Tokens> {
    if (this.isDisabled) {return of()}
    this.isDisabled = true

    const url = `${this.userUrl}/login`
    return this.http.post<Tokens>(url, user, this.httpOptions).pipe(
      catchError(this.helperService.handleError<Tokens>("login user")),
      finalize(() => this.isDisabled = false)
    )
  }

  logoutUser(userId: string): Observable<Token> {
    if (this.isDisabled) {return of()}
    this.isDisabled = true

    const url = `${this.userUrl}/logout`
    return this.http.post<Token>(url, {userId}, this.httpOptions).pipe(
      catchError(this.helperService.handleError<Token>("logout user")),
      finalize(() => this.isDisabled = false)
    )
  }

  registrationUser(user: User): Observable<User> {
    if (this.isDisabled) {return of()}
    this.isDisabled = true

    const url = `${this.userUrl}/registration`
    return this.http.post<User>(url, user, this.httpOptions).pipe(
      catchError(this.helperService.handleError<User>("registration user")),
      finalize(() => this.isDisabled = false)
    )
  }

  getUserFolders(userId: string): Observable<Folder[]> {
    const url = `${this.userUrl}/folders/${userId}`

    return this.http.get<Folder[]>(url, this.httpOptions).pipe(
      catchError(this.helperService.handleError<Folder[]>("get user folders"))
    )
  }

  changeNotificationsSettings(isNotifications: boolean): Observable<boolean> {
    const url = `${this.userUrl}/notification-settings`
    return this.http.put<boolean>(url, {isNotifications}, this.httpOptions).pipe(
      catchError(this.helperService.handleError<boolean>("change notification settings"))
    )
  }

  httpOptions = {
    headers: new HttpHeaders({ "Accept": "application/json", "Content-Type": "application/json" })
  };
}
