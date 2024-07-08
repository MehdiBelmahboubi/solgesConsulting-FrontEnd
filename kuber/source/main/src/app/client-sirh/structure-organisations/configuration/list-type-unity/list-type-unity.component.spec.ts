import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTypeUnityComponent } from './list-type-unity.component';

describe('ListTypeUnityComponent', () => {
  let component: ListTypeUnityComponent;
  let fixture: ComponentFixture<ListTypeUnityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListTypeUnityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListTypeUnityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
