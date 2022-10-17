import { Component, OnInit } from '@angular/core';
import {AuthService} from "@auth/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {HintModalComponent} from "../modals/hint-modal/hint-modal.component";

@Component({
  selector: 'app-options-panel',
  templateUrl: './options-panel.component.html',
  styleUrls: ['./options-panel.component.scss']
})
export class OptionsPanelComponent implements OnInit {

  constructor(private auth: AuthService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.auth.logout()
  }

  openHintModal(): void {
    this.dialog.open(HintModalComponent)
  }
}
