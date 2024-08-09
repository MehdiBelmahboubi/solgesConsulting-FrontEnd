import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateFetesComponent } from './add-update-fetes.component';

describe('AddUpdateFetesComponent', () => {
  let component: AddUpdateFetesComponent;
  let fixture: ComponentFixture<AddUpdateFetesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUpdateFetesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddUpdateFetesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
