import { Injectable } from '@angular/core';
import {environment} from "@environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {HelperService} from "./helper.service";
import {Task} from "../interfaces/task";
import {catchError, finalize, Observable, of, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  public tasksUrl: string = environment.tasksUrl
  public isDisabled: boolean = false

  public broadcastTasks$: Subject<Task[]> = new Subject()
  public isTasksLoading$: Subject<boolean> = new Subject()

  constructor(private http: HttpClient,
              private helperService: HelperService) { }

  sendTasks(tasks: Task[]): void {
    this.broadcastTasks$.next(tasks)
  }

  createTask(task: Task, folderId: string): Observable<Task> {
    if (this.isDisabled) {return of()}
    this.isDisabled = true
    const url = `${this.tasksUrl}/${folderId}`

    return this.http.post<Task>(url, task, this.httpOptions).pipe(
      catchError(this.helperService.handleError<Task>("create task")),
      finalize(() => this.isDisabled = false)
    )
  }

  deleteTask(folderId: string, taskId: string): Observable<Task> {
    if (this.isDisabled) {return of()}
    this.isDisabled = true
    const url = `${this.tasksUrl}/${folderId}/${taskId}`

    return this.http.delete<Task>(url, this.httpOptions).pipe(
      catchError(this.helperService.handleError<Task>("delete task")),
      finalize(() => this.isDisabled = false)
    )
  }

  updateTask(task: Task): Observable<Task> {
    if (this.isDisabled) {return of()}
    this.isDisabled = true

    return this.http.put<Task>(this.tasksUrl, task, this.httpOptions).pipe(
      catchError(this.helperService.handleError<Task>("update task ")),
      finalize(() => this.isDisabled = false)
    )
  }

  httpOptions = {
    headers: new HttpHeaders({ "Accept": "application/json", "Content-Type": "application/json" })
  };
}
