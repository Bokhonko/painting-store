import {animate, style, transition, trigger} from "@angular/animations";

export default trigger('basket', [
    transition(':enter', [
        style({ transform: 'translateY(-100px)' }),
        animate(250)
    ]),
])