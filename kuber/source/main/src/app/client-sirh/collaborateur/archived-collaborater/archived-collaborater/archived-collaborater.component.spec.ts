import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivedCollaboraterComponent } from './archived-collaborater.component';

describe('ArchivedCollaboraterComponent', () => {
  let component: ArchivedCollaboraterComponent;
  let fixture: ComponentFixture<ArchivedCollaboraterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArchivedCollaboraterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArchivedCollaboraterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
