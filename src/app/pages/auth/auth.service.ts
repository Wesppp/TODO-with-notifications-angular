import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {JwtHelperService} from "@auth0/angular-jwt";
import {UserService} from "@shared/services/user.service";
import {Tokens} from "@shared/interfaces/tokens";
import {BehaviorSubject} from "rxjs";
import {User} from "@shared/interfaces/user";
import {FormGroup} from "@angular/forms";
import {AlertsService} from "@shared/services/alerts.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public helperJWT = new JwtHelperService();
  public isAuthDataLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  constructor(private router: Router,
              private userService: UserService) { }

  emitAuthDataLoadingStatus(isLoading: boolean) {
    this.isAuthDataLoadingSubject.next(isLoading)
  }

  setTokens(tokens: Tokens) {
    localStorage.setItem('tokens', JSON.stringify(tokens))
    this.router.navigate(['/home'])
  }

  logout() {
    this.userService.logoutUser(this.currentUserId)
      .subscribe(token => {
        if (token) {
          this.router.navigate(['/auth'])
          localStorage.removeItem('tokens');
        }
      }, error => console.log(error.message))
  }

  public get loggedIn(): boolean {
    return (localStorage.getItem('tokens') !== null)
  }

  get tokens(): string | null {
    return localStorage.getItem('tokens')
  }

  get currentUserId(): string {
    const { accessToken } = JSON.parse(this.tokens!)
    return this.helperJWT.decodeToken(accessToken).userId || null;
  }

  get isAccessTokenExpired(): boolean {
    const { accessToken } = JSON.parse(this.tokens!)
    return this.helperJWT.isTokenExpired(accessToken)
  }

  get isRefreshTokenExpired(): boolean {
    const { refreshToken } = JSON.parse(this.tokens!)
    return this.helperJWT.isTokenExpired(refreshToken)
  }
}
