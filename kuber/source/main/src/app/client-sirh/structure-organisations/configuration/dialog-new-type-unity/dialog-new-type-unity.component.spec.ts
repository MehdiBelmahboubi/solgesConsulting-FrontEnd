import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogNewTypeUnityComponent } from './dialog-new-type-unity.component';

describe('DialogNewTypeUnityComponent', () => {
  let component: DialogNewTypeUnityComponent;
  let fixture: ComponentFixture<DialogNewTypeUnityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogNewTypeUnityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogNewTypeUnityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
