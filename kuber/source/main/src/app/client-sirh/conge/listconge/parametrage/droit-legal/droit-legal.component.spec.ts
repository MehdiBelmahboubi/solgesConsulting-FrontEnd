import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DroitLegalComponent } from './droit-legal.component';

describe('DroitLegalComponent', () => {
  let component: DroitLegalComponent;
  let fixture: ComponentFixture<DroitLegalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DroitLegalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DroitLegalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
