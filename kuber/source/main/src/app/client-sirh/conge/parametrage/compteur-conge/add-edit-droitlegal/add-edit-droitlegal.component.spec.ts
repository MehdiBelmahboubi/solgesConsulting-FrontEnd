import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditDroitlegalComponent } from './add-edit-droitlegal.component';

describe('AddEditDroitlegalComponent', () => {
  let component: AddEditDroitlegalComponent;
  let fixture: ComponentFixture<AddEditDroitlegalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditDroitlegalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddEditDroitlegalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
