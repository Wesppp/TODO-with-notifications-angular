import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {FolderModalComponent} from "../modals/folder-modal/folder-modal.component";
import {Folder} from "@shared/interfaces/folder";
import {UserService} from "@shared/services/user.service";
import {AuthService} from "@auth/auth.service";
import {TaskService} from "@shared/services/task.service";
import {FolderService} from "@shared/services/folder.service";

@Component({
  selector: 'app-resources-card',
  templateUrl: './resources-card.component.html',
  styleUrls: ['./resources-card.component.scss',
              '../../../assets/styles/card.scss']
})
export class ResourcesCardComponent implements OnInit {
  @Input() public folders: Folder[] = []
  public activeFolder: Folder | null = null

  constructor(private dialog: MatDialog,
              private userService: UserService,
              private auth: AuthService,
              private taskService: TaskService,
              private folderService: FolderService) { }

  ngOnInit(): void {
    this.folderService.broadcastActiveFolder$
      .subscribe((folder) => {
        this.activeFolder = folder
      })
  }

  openFolderModal(): void {
    this.dialog.open(FolderModalComponent, {data:
        {
          title: 'Create new folder',
          folderAction: this.createFolder,
          action: 'Create'
        }
    })
  }

  deleteFolder(folder: Folder): void {
    if(folder?._id === this.activeFolder?._id) {
      this.folderService.sendActiveFolder(null)
      this.taskService.sendTasks([])
    }

    this.folders = this.folders.filter(f => f._id !== folder._id)
  }

  createFolder = (folder: Folder): void => {
    this.folderService.createFolder(folder)
      .subscribe(folder => {
        if (folder) {
          this.folders.push(folder)
        }
      }, error => console.log(error.message))
  }

  trackByFolders(index: number, folder: Folder): string { return folder._id }
}
