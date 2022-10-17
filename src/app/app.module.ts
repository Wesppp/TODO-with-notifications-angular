import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthPageComponent } from '@auth/auth-page/auth-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AuthModalComponent } from './components/modals/auth-modal/auth-modal.component';
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import {AuthInterceptor} from "@shared/interceptors/auth.interceptor";
import { OptionsPanelComponent } from './components/options-panel/options-panel.component';
import { ResourcesCardComponent } from './components/resources-card/resources-card.component';
import { StatusCardComponent } from './components/status-card/status-card.component';
import { FolderModalComponent } from './components/modals/folder-modal/folder-modal.component';
import { FolderComponent } from './components/folder/folder.component';
import { TaskModalComponent } from './components/modals/task-modal/task-modal.component';
import { TaskComponent } from './components/task/task.component';
import { ProgressSpinnerComponent } from './components/custom-loadings/progress-spinner/progress-spinner.component';
import { FullscreenLoadingComponent } from './components/custom-loadings/fullscreen-loading/fullscreen-loading.component';
import { HintModalComponent } from './components/modals/hint-modal/hint-modal.component';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';
import {MaterialDesignModule} from "./modules/material-design/material-design.module";
import { SettingsComponent } from './components/settings/settings.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthPageComponent,
    HomePageComponent,
    AuthModalComponent,
    OptionsPanelComponent,
    ResourcesCardComponent,
    StatusCardComponent,
    FolderModalComponent,
    FolderComponent,
    TaskModalComponent,
    TaskComponent,
    ProgressSpinnerComponent,
    FullscreenLoadingComponent,
    HintModalComponent,
    SnackBarComponent,
    SettingsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialDesignModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
