import {Component, OnInit} from '@angular/core';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent} from "@angular/router";
import {filter} from "rxjs";
import {fadeOutAnimation} from "./shared/animations/fadeOut";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeOutAnimation]
})
export class AppComponent {
  public title: string = 'not-sender-angular';
  public fadeOut: string = 'void'

  constructor(private router: Router) {
    router.events.pipe(
        filter((event): event is RouterEvent => event instanceof RouterEvent)
      )
      .subscribe(event => {
        this.checkRouterEvent(event);
      });
  }

  checkRouterEvent(routerEvent: RouterEvent): void {
    if (routerEvent instanceof NavigationStart) {
      this.fadeOut = 'default'
    }

    if (routerEvent instanceof NavigationEnd ||
      routerEvent instanceof NavigationCancel ||
      routerEvent instanceof NavigationError) {
      this.fadeOut = 'void'
    }
  }

}
