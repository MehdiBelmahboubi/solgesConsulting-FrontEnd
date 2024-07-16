import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilleCollaboraterComponent } from './famille-collaborater.component';

describe('FamilleCollaboraterComponent', () => {
  let component: FamilleCollaboraterComponent;
  let fixture: ComponentFixture<FamilleCollaboraterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FamilleCollaboraterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FamilleCollaboraterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
