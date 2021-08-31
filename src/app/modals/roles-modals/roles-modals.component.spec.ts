import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesModalsComponent } from './roles-modals.component';

describe('RolesModalsComponent', () => {
  let component: RolesModalsComponent;
  let fixture: ComponentFixture<RolesModalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RolesModalsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RolesModalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
