import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TooltipDirective } from './tooltip.directive';

@Component({
  template: '<div tooltip="hello world" ></div>',
  selector: 'app-some'
})

class SomeComponent{}

describe('TooltipDirective', () => {
  let component: SomeComponent
  let fixture: ComponentFixture<SomeComponent>
  let el: DebugElement
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TooltipDirective, SomeComponent]
    })
    fixture = TestBed.createComponent(SomeComponent)
    component = fixture.componentInstance
    el = fixture.debugElement.query(By.css('div'))
  })
  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });

  it('tooltip should be "div" tag', () => {
    fixture.detectChanges();
    expect(el.query(By.css('.tooltip')).nativeElement.tagName).toBe('DIV')
});
});
