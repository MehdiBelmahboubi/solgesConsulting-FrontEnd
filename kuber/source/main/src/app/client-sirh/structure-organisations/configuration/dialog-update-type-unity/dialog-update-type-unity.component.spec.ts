import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUpdateTypeUnityComponent } from './dialog-update-type-unity.component';

describe('DialogUpdateTypeUnityComponent', () => {
  let component: DialogUpdateTypeUnityComponent;
  let fixture: ComponentFixture<DialogUpdateTypeUnityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogUpdateTypeUnityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogUpdateTypeUnityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
