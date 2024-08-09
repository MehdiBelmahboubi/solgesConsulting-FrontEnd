import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateTypesFetesComponent } from './add-update-types-fetes.component';

describe('AddUpdateTypesFetesComponent', () => {
  let component: AddUpdateTypesFetesComponent;
  let fixture: ComponentFixture<AddUpdateTypesFetesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUpdateTypesFetesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddUpdateTypesFetesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
