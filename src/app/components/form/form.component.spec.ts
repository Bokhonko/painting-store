
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './form.component';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormComponent ],
      imports: [
        HttpClientTestingModule,
        NgxsModule.forRoot([]),
        FormsModule,
        ReactiveFormsModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
    store = TestBed.inject(Store)
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create form with 4 controls', () => {
    expect(component.form.contains('name')).toBeTruthy()
    expect(component.form.contains('email')).toBeTruthy()
    expect(component.form.contains('rating')).toBeTruthy()
    expect(component.form.contains('comment')).toBeTruthy()
  })

  it('should mark validators as invalid if empty value', () => {
    const name = component.form.get('name')
    const email = component.form.get('email')
    const rating = component.form.get('rating')
    name?.setValue('')
    email?.setValue('')
    rating?.setValue('')
    expect(name?.valid).toBeFalse();
    expect(email?.valid).toBeFalse();
    expect(rating?.valid).toBeFalse();
  });
});
