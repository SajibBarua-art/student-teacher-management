import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowStudents } from './show-students';

describe('ShowStudents', () => {
  let component: ShowStudents;
  let fixture: ComponentFixture<ShowStudents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowStudents]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowStudents);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
