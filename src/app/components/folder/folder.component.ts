import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Folder} from "@shared/interfaces/folder";
import {FolderService} from "@shared/services/folder.service";
import {TaskService} from "@shared/services/task.service";
import {MatDialog} from "@angular/material/dialog";
import {FolderModalComponent} from "../modals/folder-modal/folder-modal.component";
import {state, style, transition, trigger, useAnimation} from "@angular/animations";
import {bounceIn, jello} from "ng-animate";
import {AlertsService} from "@shared/services/alerts.service";

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.scss',
  '../../../assets/styles/cross.scss'],
  animations: [
    trigger('bounceIn', [transition(':enter', useAnimation(bounceIn, {
      params: { timing: .6}
    }))]),
    trigger('jello', [
      state('clicked', style({})), transition('* => clicked', useAnimation(jello))
    ])
  ],
})
export class FolderComponent implements OnInit {
  @Input() public folder!: Folder
  @Output() public deleteFolderEvent = new EventEmitter<Folder>()
  public bounceIn: string = ''
  public activeFolder: Folder | null = null

  constructor(private folderService: FolderService,
              private alert: AlertsService,
              private taskService: TaskService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.folderService.broadcastActiveFolder$
      .subscribe((folder) => {
        this.activeFolder = folder
      })
  }

  openFolder(folder: Folder): void {
    if (folder === this.activeFolder) { return }
    this.activeFolder = folder
    this.taskService.isTasksLoading$.next(true)
    this.folderService.sendActiveFolder(folder)
    this.getFolderTasks(folder._id!)
  }

  deleteFolder($event: Event, folder: Folder): void {
    $event.stopPropagation()

    this.alert.alertConfirmPopup()
      .then((result) => {
        if (result.isConfirmed) {
          this.folderService.deleteFolder(folder._id!)
            .subscribe(folder => {
              if (folder) {
                this.deleteFolderEvent.emit(folder)
              }
            }, error => console.log(error.message))
        }
      })
  }

  getFolderTasks(id: string): void {
    this.folderService.getFolderTasks(id)
      .subscribe(tasks => {
        if (tasks.length && tasks) {
          this.taskService.sendTasks(tasks)
        } else {
          this.taskService.sendTasks([])
          this.alert.alertMessage('There are no tasks in this folder, create them so that there is not so empty')
        }
      }, error => console.log(error.message))
  }

  updateFolderModal($event: Event): void {
    $event.stopPropagation()
    this.dialog.open(FolderModalComponent, {
      data: {
        title: 'Edit folder data',
        folderAction: this.updateFolder,
        folder: this.folder,
        action: 'Update'
      }
    })
  }

  updateFolder = (folder: Folder): void => {
    this.folderService.updateFolder(Object.assign(this.folder, folder))
      .subscribe(folder => {
        if (folder) {
          this.folder = folder
        }
      }, error => console.log(error.message))
  }
}
