import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutreinfoCollaboraterComponent } from './autreinfo-collaborater.component';

describe('AutreinfoCollaboraterComponent', () => {
  let component: AutreinfoCollaboraterComponent;
  let fixture: ComponentFixture<AutreinfoCollaboraterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutreinfoCollaboraterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AutreinfoCollaboraterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
