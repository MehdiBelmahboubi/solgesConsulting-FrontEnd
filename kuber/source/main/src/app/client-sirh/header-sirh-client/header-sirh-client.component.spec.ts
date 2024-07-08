import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderSirhClientComponent } from './header-sirh-client.component';

describe('HeaderSirhClientComponent', () => {
  let component: HeaderSirhClientComponent;
  let fixture: ComponentFixture<HeaderSirhClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderSirhClientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderSirhClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
