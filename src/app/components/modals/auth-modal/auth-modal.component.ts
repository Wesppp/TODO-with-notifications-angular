import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {User} from "@shared/interfaces/user";
import {AuthService} from "@auth/auth.service";
import {passwordsMatching} from "@shared/custom-validators/matching-passwords";

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.scss']
})
export class AuthModalComponent implements OnInit {
  public authForm!: FormGroup
  public isAuthDataLoading: boolean = true

  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    title: string,
    navigate: any,
    modalType: string,
    authFunction: (user: User, form: FormGroup) => void,
    isAuthLoading: boolean
  }, private auth: AuthService,
     private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createForm()

    this.auth.isAuthDataLoadingSubject.subscribe((isLoading) => {
      this.isAuthDataLoading = isLoading
    })
  }

  createForm(): void {
    this.authForm = this.formBuilder.group({
      "name": ["", [
        Validators.required,
        Validators.maxLength(30),
        Validators.pattern('(?=.*[A-Za-zА-Яа-яЁё]{4,}).*')
      ]],
      "email": ["", [
        Validators.required,
        Validators.email
      ]],
      "password": ["", [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(16)
      ]],
      "repeatPassword": ["", [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(16)
      ]],
    }, { validators: passwordsMatching})

    if (this.data.modalType === 'login') {
      this.authForm.removeControl("name")
      this.authForm.removeControl("repeatPassword")
    }
  }

  get _name() {
    return this.authForm.get('name')
  }

  get _email() {
    return this.authForm.get('email')
  }

  get _password() {
    return this.authForm.get('password')
  }

  get _repeatPassword() {
    return this.authForm.get('repeatPassword')
  }
}
