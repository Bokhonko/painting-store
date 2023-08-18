import {animate, style, transition, trigger} from "@angular/animations";

export default  trigger('counter', [
    transition('* => *', [
        animate(250, style({
            scale: '1.5'
        }))
    ])
])