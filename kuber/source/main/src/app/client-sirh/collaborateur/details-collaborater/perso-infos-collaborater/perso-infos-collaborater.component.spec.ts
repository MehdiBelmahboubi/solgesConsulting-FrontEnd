import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersoInfosCollaboraterComponent } from './perso-infos-collaborater.component';

describe('PersoInfosCollaboraterComponent', () => {
  let component: PersoInfosCollaboraterComponent;
  let fixture: ComponentFixture<PersoInfosCollaboraterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersoInfosCollaboraterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PersoInfosCollaboraterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
