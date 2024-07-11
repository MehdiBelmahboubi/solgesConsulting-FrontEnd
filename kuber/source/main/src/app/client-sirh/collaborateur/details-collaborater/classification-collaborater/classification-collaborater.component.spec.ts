import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassificationCollaboraterComponent } from './classification-collaborater.component';

describe('ClassificationCollaboraterComponent', () => {
  let component: ClassificationCollaboraterComponent;
  let fixture: ComponentFixture<ClassificationCollaboraterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassificationCollaboraterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClassificationCollaboraterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
