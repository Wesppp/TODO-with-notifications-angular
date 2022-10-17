import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Folder} from "@shared/interfaces/folder";

@Component({
  selector: 'app-folder-modal',
  templateUrl: './folder-modal.component.html',
  styleUrls: ['./folder-modal.component.scss',
  '../../../../assets/styles/modal.scss']
})
export class FolderModalComponent implements OnInit {
  public form!: FormGroup
  public folder: Folder = {_id: '', title: ''}

  constructor(@Inject(MAT_DIALOG_DATA) public data: {
                title: string,
                folderAction: (folder: Folder) => void,
                folder: Folder,
                action: string
              }, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    if (this.data.folder) { this.folder = this.data.folder }
    this.createForm()
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      'title': [this.folder.title, [Validators.required]]
    })
  }

  get _title(): any {
    return this.form.get('title')
  }
}
