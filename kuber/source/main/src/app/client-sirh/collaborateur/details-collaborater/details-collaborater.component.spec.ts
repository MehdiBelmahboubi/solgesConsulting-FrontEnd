import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsCollaboraterComponent } from './details-collaborater.component';

describe('DetailsCollaboraterComponent', () => {
  let component: DetailsCollaboraterComponent;
  let fixture: ComponentFixture<DetailsCollaboraterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsCollaboraterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailsCollaboraterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
