import {Component, Input, OnInit} from '@angular/core';
import {StatusCard} from "@shared/interfaces/status-card";
import {Folder} from "@shared/interfaces/folder";
import {FolderService} from "@shared/services/folder.service";
import {MatDialog} from "@angular/material/dialog";
import {TaskModalComponent} from "../modals/task-modal/task-modal.component";
import {Task} from "@shared/interfaces/task";
import {TaskService} from "@shared/services/task.service";
import {CdkDragDrop, copyArrayItem, moveItemInArray} from "@angular/cdk/drag-drop";
import {map} from "rxjs";
import {AlertsService} from "@shared/services/alerts.service";

@Component({
  selector: 'app-status-card',
  templateUrl: './status-card.component.html',
  styleUrls: ['./status-card.component.scss',
              '../../../assets/styles/card.scss']
})
export class StatusCardComponent implements OnInit {
  @Input() public statusCard!: StatusCard
  public tasks: Task[] = []
  public isTasksLoading: boolean = false
  public activeFolder: Folder | null = null

  constructor(private folderService: FolderService,
              private dialog: MatDialog,
              private taskService: TaskService,
              private alert: AlertsService) {
  }

  ngOnInit(): void {
    this.taskService.isTasksLoading$.subscribe(isLoading => this.isTasksLoading = isLoading)

    this.taskService.broadcastTasks$
      .pipe(map(tasks => tasks.filter(task => task.status === this.statusCard.status)))
      .subscribe((tasks) => {
        if (tasks) {
          this.tasks = tasks
          this.isTasksLoading = false
        }
        else { this.tasks = [] }
      })

    this.folderService.broadcastActiveFolder$
      .subscribe((folder) => {
        this.activeFolder = folder
      })
  }

  openTaskModal(): void {
    this.dialog.open(TaskModalComponent, {data: {title: 'Create new task', taskAction: this.createTask}})
  }

  filterTasks(task: Task): void {
    this.tasks = this.tasks.filter(t => t._id !== task._id)
  }

  createTask = (task: Task): void => {
    this.taskService.createTask(task, this.activeFolder?._id!)
      .subscribe(task => {
        if (task) {
          if (task) { this.tasks.push(task) }
        }
      }, error => console.log(error.message))
  }

  trackByTasks(index: number, task: Task): string { return task._id }

  drop($event: CdkDragDrop<Task[], Task[]>): void {
    if ($event.previousContainer === $event.container) {
      moveItemInArray($event.container.data, $event.previousIndex, $event.currentIndex);
    } else {
      $event.item.data.status = this.statusCard.status
      copyArrayItem($event.previousContainer.data,
        $event.container.data,
        $event.previousIndex,
        $event.currentIndex);
      $event.previousContainer.data.splice($event.previousIndex, 1)

      this.updateTask($event.item.data)
    }
  }

  updateTask(task: Task): void {
    this.taskService.updateTask(task)
      .subscribe(task => {
        if (task) {
          this.alert.showSnackBar(`Task "${task.description}" has been moved to the ${task.status} column`)
        }
      },error => console.log(error.message))
  }
}
