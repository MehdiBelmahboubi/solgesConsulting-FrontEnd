import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditDroitentrepriseComponent } from './add-edit-droitentreprise.component';

describe('AddEditDroitentrepriseComponent', () => {
  let component: AddEditDroitentrepriseComponent;
  let fixture: ComponentFixture<AddEditDroitentrepriseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditDroitentrepriseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddEditDroitentrepriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
