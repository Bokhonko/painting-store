import { Directive, ElementRef, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[tooltip]'
})
export class TooltipDirective implements OnInit{
  @Input('tooltip') text: string 
  newEl: HTMLElement
  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.newEl = this.renderer.createElement('div')
    this.renderer.appendChild(this.el.nativeElement, this.newEl)
    this.renderer.addClass(this.newEl, 'tooltip')  
  }


  @HostListener('mouseenter') onEnter() {
    this.newEl.innerText = this.text
    this.renderer.setStyle(this.newEl, 'opacity', 1)
    this.renderer.setStyle(this.el.nativeElement, 'position', 'relative')
  }

  @HostListener('mouseleave') onLeave() {
    this.renderer.setStyle(this.newEl, 'opacity', 0)

  }
}
