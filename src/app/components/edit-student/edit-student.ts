import { Component } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {StudentService} from '../../services/student-service';
import { Student } from '../../models/student.model';
import {Course} from '../../models/course.model';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-edit-student',
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './edit-student.html',
  styleUrl: './edit-student.css'
})
export class EditStudent {
  editForm!: FormGroup;
  studentId!: number | string;
  isLoading = true;

  currentlyAllocatedCourses: Course[] = [];
  allCoursesList: Course[] = [];
  coursesForDatalist: Course[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });

    this.studentId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.studentId) {
      // Call the same helper method, but pass 'true' to get all courses
      this.studentService.getResolvedStudentData(this.studentId, true).subscribe({
        next: (data) => {
          const { student, allocatedCoursesDetails, allCourses } = data;

          this.editForm.patchValue({ name: student.name, email: student.email });
          this.currentlyAllocatedCourses = allocatedCoursesDetails;
          this.allCoursesList = allCourses || []; // Use the fetched list
          this.updateDatalist();

          this.isLoading = false;
        },
        error: (err) => {
          console.error('Failed to load initial data', err);
          this.isLoading = false;
        }
      });
    }
  }

  // Filters the datalist to exclude already allocated courses
  updateDatalist(): void {
    const allocatedIds = new Set(this.currentlyAllocatedCourses.map(c => c.id));
    this.coursesForDatalist = this.allCoursesList.filter(c => !allocatedIds.has(c.id));

    console.log("coursesForDatalist: ", this.coursesForDatalist);
  }

  // Called when a user adds a course from the search input
  addCourse(courseNameInput: HTMLInputElement): void {
    const selectedCourseName = courseNameInput.value;
    if (!selectedCourseName) return;

    // Search ONLY within the list of unallocated courses available in the datalist.
    // This is more efficient and secure.
    const courseToAdd = this.coursesForDatalist.find(
      c => c.name.toLowerCase() === selectedCourseName.toLowerCase()
    );

    if (courseToAdd) {
      // If a valid, unallocated course is found:

      // 1. Add it to the student's list of allocated courses.
      this.currentlyAllocatedCourses.push(courseToAdd);

      console.log("currentlyAllocated: ", this.currentlyAllocatedCourses);

      // 2. Clear the input field for the next entry.
      courseNameInput.value = '';

      // 3. Refresh the datalist to remove the newly added course from the options.
      this.updateDatalist();
    } else {
      // If the user typed something that is not a valid, unallocated course:
      alert(`'${selectedCourseName}' is not a valid or available course. Please select a course from the dropdown list.`);
      // Optional: Clear the invalid input
      courseNameInput.value = '';
    }
  }

  // Called when a user removes a course from the allocated list
  removeCourse(courseId: number | string): void {
    this.currentlyAllocatedCourses = this.currentlyAllocatedCourses.filter(c => c.id !== courseId);
    // Refresh the datalist to make this course available again
    this.updateDatalist();
  }

  // --- Form Submission ---
  onSubmit(): void {
    if (this.editForm.invalid) {
      this.editForm.markAllAsTouched();
      return;
    }

    // Map the array of course objects back to an array of just their IDs
    const finalCourseIds = this.currentlyAllocatedCourses.map(course => course.id);

    const finalStudentData = {
      ...this.editForm.value,
      allocatedCourseIds: finalCourseIds
    };

    this.studentService.updateStudent(this.studentId, finalStudentData as Student).subscribe({
      next: () => {
        alert('Student updated successfully!');
        this.router.navigate(['/show-students']);
      },
      error: (err) => console.error('Failed to update student', err)
    });
  }
}
