import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxsModule } from '@ngxs/store';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { BasketComponent } from './basket.component';
import { BasketState } from 'src/app/state/basket.state';

describe('BasketComponent', () => {
  let component: BasketComponent;
  let fixture: ComponentFixture<BasketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasketComponent ],
      imports: [NgxsModule.forRoot([BasketState]), HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
