import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxsModule } from '@ngxs/store';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PaintingsComponent } from './paintings.component';

describe('PaintingsComponent', () => {
  let component: PaintingsComponent;
  let fixture: ComponentFixture<PaintingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaintingsComponent ],
      imports: [
        NgxsModule.forRoot([]),
        HttpClientTestingModule
    ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaintingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
