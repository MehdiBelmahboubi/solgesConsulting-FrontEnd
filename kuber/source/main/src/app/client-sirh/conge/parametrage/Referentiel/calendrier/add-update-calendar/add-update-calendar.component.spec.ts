import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateCalendarComponent } from './add-update-calendar.component';

describe('AddUpdateCalendarComponent', () => {
  let component: AddUpdateCalendarComponent;
  let fixture: ComponentFixture<AddUpdateCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUpdateCalendarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddUpdateCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
