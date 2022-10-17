import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthPageComponent} from "@auth/auth-page/auth-page.component";
import {HomePageComponent} from "./pages/home-page/home-page.component";
import {AuthGuard} from "@auth/auth.guard";
import {FoldersResolverService} from "@shared/resolvers/folders-resolver.service";

const routes: Routes = [
  {path: '', redirectTo: '/auth', pathMatch: 'full'},
  {
    path: 'auth', component: AuthPageComponent
  },
  {
    path: 'home', component: HomePageComponent, canActivate: [AuthGuard],
    resolve: {
      folders: FoldersResolverService
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
