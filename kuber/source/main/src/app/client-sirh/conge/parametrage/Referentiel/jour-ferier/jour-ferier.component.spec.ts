import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JourFerierComponent } from './jour-ferier.component';

describe('JourFerierComponent', () => {
  let component: JourFerierComponent;
  let fixture: ComponentFixture<JourFerierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JourFerierComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JourFerierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
