import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StructureOrganisationsComponent } from './structure-organisations.component';

describe('StructureOrganisationsComponent', () => {
  let component: StructureOrganisationsComponent;
  let fixture: ComponentFixture<StructureOrganisationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StructureOrganisationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StructureOrganisationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
