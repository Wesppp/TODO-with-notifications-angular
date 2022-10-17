import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {catchError} from "rxjs";
import {Folder} from "../interfaces/folder";
import {AuthService} from "@auth/auth.service";
import {environment} from "@environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {HelperService} from "../services/helper.service";

@Injectable({
  providedIn: 'root'
})
export class FoldersResolverService implements Resolve<any> {
  public userUrl: string = environment.usersUrl

  constructor(private auth: AuthService,
              private http: HttpClient,
              private helperService: HelperService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    const url = `${this.userUrl}/folders/${this.auth.currentUserId}`

    return this.http.get<Folder[]>(url, this.httpOptions).pipe(
      catchError(this.helperService.handleError<Folder[]>("get user folders"))
    )
  }

  httpOptions = {
    headers: new HttpHeaders({ "Accept": "application/json", "Content-Type": "application/json" })
  };
}
