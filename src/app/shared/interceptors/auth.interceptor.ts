import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse, HttpClient, HttpHeaders
} from '@angular/common/http';
import {catchError, Observable, switchMap, throwError} from 'rxjs';
import {AuthService} from "@auth/auth.service";
import { environment } from "@environments/environment";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  public authUrl: string = environment.authUrl

  constructor(private auth: AuthService,
              private http: HttpClient) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const url = `${this.authUrl}/refresh-token`

    return next.handle(this.addAuthTokens(request))
      .pipe(catchError((err: HttpErrorResponse) => {
        if (err.status === 401 && this.auth.isRefreshTokenExpired) {
          this.auth.logout()
        }

        if (err.status === 401 && !this.auth.isRefreshTokenExpired && this.auth.isAccessTokenExpired) {
          return this.http.post(url, this.auth.tokens, this.httpOptions).pipe(
            switchMap((tokens: any) => {
              this.auth.setTokens(tokens)
              return next.handle(this.addAuthTokens(request))
            }))
        }

        const error = err.error?.message || err.message || err.statusText;
        return throwError(error)
      }))
  }

  addAuthTokens(request: HttpRequest<any>) {
    const tokens = this.auth.tokens;

    if (!tokens) { return request }

    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${tokens}`,
      },
    });
  }

  httpOptions = {
    headers: new HttpHeaders({ "Accept": "application/json", "Content-Type": "application/json" })
  };
}
