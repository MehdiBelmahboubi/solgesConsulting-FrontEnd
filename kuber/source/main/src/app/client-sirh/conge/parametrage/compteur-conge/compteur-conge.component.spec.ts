import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompteurCongeComponent } from './compteur-conge.component';

describe('CompteurCongeComponent', () => {
  let component: CompteurCongeComponent;
  let fixture: ComponentFixture<CompteurCongeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompteurCongeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompteurCongeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
