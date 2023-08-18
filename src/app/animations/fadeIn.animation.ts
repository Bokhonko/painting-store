import { animate, state, style, transition, trigger } from "@angular/animations";

export default trigger('fadeIn', [
    state('void', style({ opacity: 0})),
    transition(':enter', [
      animate('900ms ease-in-out', style({ opacity: 1 }))
    ])
  ])