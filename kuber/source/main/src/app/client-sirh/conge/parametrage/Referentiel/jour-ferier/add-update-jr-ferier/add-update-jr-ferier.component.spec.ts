import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateJrFerierComponent } from './add-update-jr-ferier.component';

describe('AddUpdateJrFerierComponent', () => {
  let component: AddUpdateJrFerierComponent;
  let fixture: ComponentFixture<AddUpdateJrFerierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUpdateJrFerierComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddUpdateJrFerierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
