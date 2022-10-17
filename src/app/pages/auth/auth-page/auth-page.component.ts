import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AuthModalComponent} from "../../../components/modals/auth-modal/auth-modal.component";
import {User} from "@shared/interfaces/user";
import {FormGroup} from "@angular/forms";
import {UserService} from "@shared/services/user.service";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {AlertsService} from "@shared/services/alerts.service";

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent implements OnInit, OnDestroy {

  constructor(private dialog: MatDialog,
              private userService: UserService,
              private auth: AuthService,
              private router: Router,
              private alert: AlertsService) {
    if (this.auth.loggedIn) { this.router.navigate(['/home']) }
  }

  ngOnInit(): void {
    this.openLoginDialog()
  }

  openLoginDialog = (): void => {
    this.dialog.closeAll()
    this.dialog.open(AuthModalComponent, {
      data: {
        title: 'Login',
        navigate: this.openRegistrationDialog,
        authFunction: this.login,
        modalType: 'login',
      },
      disableClose: true
    }, );
  }

  login = (user: User, form: FormGroup): void => {
    this.userService.loginUser(user)
      .subscribe(tokens => {
        if (tokens) {
          this.auth.emitAuthDataLoadingStatus(false)
          this.dialog.closeAll()
          form.reset()
          this.auth.setTokens(tokens)
        } else {
          this.auth.emitAuthDataLoadingStatus(false)
        }
      }, error => console.log(error.message))
  }

  openRegistrationDialog = ():void => {
    this.dialog.closeAll()
    this.dialog.open(AuthModalComponent, {
      data: {
        title: 'Registration',
        navigate: this.openLoginDialog,
        authFunction: this.registration,
        modalType: 'registration',
      },
      disableClose: true
    })
  }

  registration = (user: User, form: FormGroup): void => {
    this.userService.registrationUser(user)
      .subscribe(user => {
        if (user) {
          this.auth.emitAuthDataLoadingStatus(false)
          form.reset()
          this.openLoginDialog()
          this.alert.topEndAlert('Check your email and confirm your account!')
        } else {
          this.auth.emitAuthDataLoadingStatus(false)
        }
      }, error => console.log(error.message))
  }

  ngOnDestroy(): void {
    this.dialog.closeAll()
  }
}
