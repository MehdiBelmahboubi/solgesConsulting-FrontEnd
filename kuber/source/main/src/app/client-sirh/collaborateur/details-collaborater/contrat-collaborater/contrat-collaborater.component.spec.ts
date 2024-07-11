import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratCollaboraterComponent } from './contrat-collaborater.component';

describe('ContratCollaboraterComponent', () => {
  let component: ContratCollaboraterComponent;
  let fixture: ComponentFixture<ContratCollaboraterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContratCollaboraterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContratCollaboraterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
