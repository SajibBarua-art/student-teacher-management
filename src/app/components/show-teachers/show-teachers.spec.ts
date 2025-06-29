import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowTeachers } from './show-teachers';

describe('ShowTeachers', () => {
  let component: ShowTeachers;
  let fixture: ComponentFixture<ShowTeachers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowTeachers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowTeachers);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
