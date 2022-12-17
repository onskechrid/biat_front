import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddfonctionComponent } from './addfonction.component';

describe('AddfonctionComponent', () => {
  let component: AddfonctionComponent;
  let fixture: ComponentFixture<AddfonctionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddfonctionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddfonctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
