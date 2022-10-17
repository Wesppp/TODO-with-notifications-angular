import {state, style, transition, trigger, useAnimation} from "@angular/animations";
import {fadeOut} from "ng-animate";

export const fadeOutAnimation = trigger('fadeOut', [
  state('default', style({opacity: 1, transform: 'translateX(0) scale(1)'})),
  state('void', style({opacity: 0, display: 'none', transform: 'translateX(0) scale(1)'})),
  transition('default => void', useAnimation(fadeOut, {
    params: {timing: .4}
  }))
])

