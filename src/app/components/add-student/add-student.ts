import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import {StudentService} from '../../services/student-service';
import {Course} from '../../models/course.model';
import {CourseService} from '../../services/course-service'; // Import Router for navigation

// We can reuse the same custom validator
export function passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  if (!password || !confirmPassword) return null;
  return password.value === confirmPassword.value ? null : { mismatch: true };
}

@Component({
  selector: 'app-add-student',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-student.html',
  styleUrls: ['./add-student.css', '../navbar/navbar.css']
})
export class AddStudent implements OnInit {

  addStudentForm!: FormGroup;
  isLoading = true;

  // This holds the courses selected by the user
  currentlyAllocatedCourses: Course[] = [];
  // This holds all possible courses fetched from the API
  allCoursesList: Course[] = [];
  // This holds the filtered list for the datalist options
  coursesForDatalist: Course[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private studentService: StudentService,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    // This is the exact same form initialization as in the signup component
    this.addStudentForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validators: passwordMatchValidator });

    this.courseService.getAllCourses().subscribe({
      next: (courses) => {
        this.allCoursesList = courses;
        this.coursesForDatalist = [...courses];
        this.isLoading = false;
      },
      error:(err) => {
        console.error("Failed to load courses", err);
        alert("Could not load course data. Please try again.");
        this.isLoading = false;
      }
    })
  }

  // Filters the datalist to exclude already selected courses
  updateDatalist(): void {
    const allocatedIds = new Set(this.currentlyAllocatedCourses.map(c => c.id));
    this.coursesForDatalist = this.allCoursesList.filter(c => !allocatedIds.has(c.id));
  }

  // Called when a user adds a course from the search input
  addCourse(courseNameInput: HTMLInputElement): void {
    const selectedCourseName = courseNameInput.value.trim();
    if (!selectedCourseName) return;

    // Search only within the available, unallocated courses
    const courseToAdd = this.coursesForDatalist.find(
      c => c.name.toLowerCase() === selectedCourseName.toLowerCase()
    );

    if (courseToAdd) {
      this.currentlyAllocatedCourses.push(courseToAdd);
      courseNameInput.value = ''; // Clear the input
      this.updateDatalist(); // Refresh the datalist
    } else {
      alert(`'${selectedCourseName}' is not a valid or available course. Please select one from the list.`);
    }
  }

  // Called when a user removes a course from the allocated list
  removeCourse(courseId: number | string): void {
    this.currentlyAllocatedCourses = this.currentlyAllocatedCourses.filter(c => c.id !== courseId);
    this.updateDatalist(); // Refresh the datalist to make the course available again
  }

  onSubmit() {
    if (this.addStudentForm.valid) {
      console.log('Adding New Student:', this.addStudentForm.value);

      // 1. Get the IDs from the courses the user has selected
      const allocatedCourseIds = this.currentlyAllocatedCourses.map(course => course.id);

      // 2. Combine the form data with the array of course IDs
      const finalStudentData = {
        ...this.addStudentForm.value,
        allocatedCourseIds: allocatedCourseIds
      };

      console.log("final: ", finalStudentData);

      // 3. Send the complete payload to the service
      this.studentService.createStudent(finalStudentData).subscribe({
        next: (newStudent) => {
          alert(`Student "${newStudent.name}" created successfully!`);
          this.router.navigate(['/show-students']);
        },
        error: (err) => {
          console.error('Failed to create student:', err);
          alert('An error occurred. Please try again.');
        }
      });

    } else {
      console.error('Form is invalid');
      this.addStudentForm.markAllAsTouched();
      return;
    }
  }
}
