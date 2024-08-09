import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigCongeComponent } from './config-conge.component';

describe('ConfigCongeComponent', () => {
  let component: ConfigCongeComponent;
  let fixture: ComponentFixture<ConfigCongeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigCongeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfigCongeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
