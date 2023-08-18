import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { RouterTestingModule } from '@angular/router/testing';
import { PaintingComponent } from './painting.component';
import { PaintingsState } from 'src/app/state/paintings.state';
import { ReviewsOfPaintingsState } from 'src/app/state/reviews-of-paintings.state';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppModule } from 'src/app/app.module';

describe('PaintingComponent', () => {
  let component: PaintingComponent;
  let fixture: ComponentFixture<PaintingComponent>;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaintingComponent ],
      imports: [
        AppModule,
        
        NgxsModule.forRoot([PaintingsState, ReviewsOfPaintingsState]),
        RouterTestingModule,
        HttpClientTestingModule
    ]
    })
    .compileComponents();
    store = TestBed.inject(Store)
    fixture = TestBed.createComponent(PaintingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
