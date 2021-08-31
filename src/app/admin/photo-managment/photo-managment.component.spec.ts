import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoManagmentComponent } from './photo-managment.component';

describe('PhotoManagmentComponent', () => {
  let component: PhotoManagmentComponent;
  let fixture: ComponentFixture<PhotoManagmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhotoManagmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoManagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
