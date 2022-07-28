import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditfonctionComponent } from './editfonction.component';

describe('EditfonctionComponent', () => {
  let component: EditfonctionComponent;
  let fixture: ComponentFixture<EditfonctionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditfonctionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditfonctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
