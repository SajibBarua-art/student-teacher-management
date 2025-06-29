import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachersSection } from './teachers-section';

describe('TeachersSection', () => {
  let component: TeachersSection;
  let fixture: ComponentFixture<TeachersSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeachersSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeachersSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
