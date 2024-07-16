import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImmatriculationCollaboraterComponent } from './immatriculation-collaborater.component';

describe('ImmatriculationCollaboraterComponent', () => {
  let component: ImmatriculationCollaboraterComponent;
  let fixture: ComponentFixture<ImmatriculationCollaboraterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImmatriculationCollaboraterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImmatriculationCollaboraterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
