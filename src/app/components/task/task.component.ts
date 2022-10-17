import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Task} from "@shared/interfaces/task";
import {TaskService} from "@shared/services/task.service";
import {Folder} from "@shared/interfaces/folder";
import {FolderService} from "@shared/services/folder.service";
import {MatDialog} from "@angular/material/dialog";
import {TaskModalComponent} from "../modals/task-modal/task-modal.component";
import {transition, trigger, useAnimation} from "@angular/animations";
import {bounceIn} from "ng-animate";
import {AlertsService} from "@shared/services/alerts.service";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss',
    '../../../assets/styles/cross.scss'],
  animations: [
    trigger('bounceIn', [transition(':enter', useAnimation(bounceIn, {
      params: { timing: .6}
    }))])
  ]
})
export class TaskComponent implements OnInit {
  @Input() public task!: Task
  @Output() public deleteTaskEvent = new EventEmitter<Task>()
  public bounceIn: string = ''
  public activeFolder: Folder | null = null

  constructor(private taskService: TaskService,
              private folderService: FolderService,
              private dialog: MatDialog,
              private alert: AlertsService) { }

  ngOnInit(): void {
    this.folderService.broadcastActiveFolder$
      .subscribe((folder) => {
        this.activeFolder = folder
      })
  }

  deleteTask(task: Task): void {
    this.alert.alertConfirmPopup()
      .then((result) => {
        if (result.isConfirmed) {
          this.taskService.deleteTask(this.activeFolder?._id! ,task._id!)
            .subscribe(task => {
              if (task) {
                this.deleteTaskEvent.emit(task)
              }
            }, error => console.log(error.message))
        }
      })
  }

  updateTaskModal($event: Event): void {
    $event.stopPropagation()
    this.dialog.open(TaskModalComponent, {
      data: {title: 'Edit task data',
        taskAction: this.updateTask,
        task: {date: this.task.date, description: this.task.description}
      }
    })
  }

  updateTask = (task: Task): void => {
    this.taskService.updateTask(Object.assign(this.task, task))
      .subscribe(task => {
        if (task) {
          this.task = task
        }
      }, error => console.log(error.message))
  }
}
