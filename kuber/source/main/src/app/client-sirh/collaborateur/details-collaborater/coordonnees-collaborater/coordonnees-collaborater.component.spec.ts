import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordonneesCollaboraterComponent } from './coordonnees-collaborater.component';

describe('CoordonneesCollaboraterComponent', () => {
  let component: CoordonneesCollaboraterComponent;
  let fixture: ComponentFixture<CoordonneesCollaboraterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoordonneesCollaboraterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoordonneesCollaboraterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
