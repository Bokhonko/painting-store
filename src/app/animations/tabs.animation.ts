import {animate, style, transition, trigger} from "@angular/animations";

export default trigger('tabs', [
    transition('void => left', [
        style({ transform: 'translateX(-100px)' }),
        animate(250)
    ]),

    transition('void => right', [
        style({ transform: 'translateX(100px)'}),
        animate(250)
    ])
    
])