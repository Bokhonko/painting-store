import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngxs/store';
import { HeaderComponent } from './header.component';
import { AppModule } from 'src/app/app.module';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [
        AppModule
    ]
    })
    .compileComponents();
    store = TestBed.inject(Store)
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
