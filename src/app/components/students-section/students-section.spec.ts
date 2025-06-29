import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsSection } from './students-section';

describe('StudentsSection', () => {
  let component: StudentsSection;
  let fixture: ComponentFixture<StudentsSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentsSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentsSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
