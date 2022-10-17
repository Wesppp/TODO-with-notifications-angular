import { Injectable } from '@angular/core';
import {environment} from "@environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {HelperService} from "./helper.service";
import {BehaviorSubject, catchError, finalize, Observable, of, Subject} from "rxjs";
import {Folder} from "../interfaces/folder";
import {Task} from "../interfaces/task";

@Injectable({
  providedIn: 'root'
})
export class FolderService {
  public foldersUrl: string = environment.foldersUrl
  public isDisabled: boolean = false

  public broadcastActiveFolder$: BehaviorSubject<Folder | null> = new BehaviorSubject<Folder | null>(null)

  constructor(private http: HttpClient,
              private helperService: HelperService) { }

  sendActiveFolder(folder: Folder | null) {
    this.broadcastActiveFolder$.next(folder)
  }

  createFolder(folder: Folder): Observable<Folder> {
    if (this.isDisabled) {return of()}
    this.isDisabled = true

    return this.http.post<Folder>(this.foldersUrl, folder, this.httpOptions).pipe(
      catchError(this.helperService.handleError<Folder>("create folder")),
      finalize(() => this.isDisabled = false)
    )
  }

  deleteFolder(folderId: string): Observable<Folder> {
    if (this.isDisabled) {return of()}
    this.isDisabled = true
    const url: string = `${this.foldersUrl}/${folderId}`

    return this.http.delete<Folder>(url, this.httpOptions).pipe(
      catchError(this.helperService.handleError<Folder>("delete folder")),
      finalize(() => this.isDisabled = false)
    )
  }

  getFolderTasks(folderId: string): Observable<Task[]> {
    const url = `${this.foldersUrl}/tasks/${folderId}`

    return this.http.get<Task[]>(url, this.httpOptions).pipe(
      catchError(this.helperService.handleError<Task[]>("get folder tasks"))
    )
  }

  updateFolder(folder: Folder): Observable<Folder> {
    if (this.isDisabled) {return of()}
    this.isDisabled = true

    return this.http.put<Folder>(this.foldersUrl, folder, this.httpOptions).pipe(
      catchError(this.helperService.handleError<Folder>("update folder")),
      finalize(() => this.isDisabled = false)
    )
  }

  httpOptions = {
    headers: new HttpHeaders({ "Accept": "application/json", "Content-Type": "application/json" })
  };
}
