// src/app/components/signup/signup.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray, AbstractControl } from '@angular/forms';

// Custom Validator for checking if password and confirmPassword match
export function passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  // If controls are not yet available, don't validate
  if (!password || !confirmPassword) {
    return null;
  }

  // Return null if they match, or a 'mismatch' error if they don't
  return password.value === confirmPassword.value ? null : { mismatch: true };
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule // Import for using reactive forms
  ],
  templateUrl: './signup.html',
  styleUrls: ['./signup.css', '../navbar/navbar.css']
})
export class Signup implements OnInit {

  userType: 'teacher' | 'student' = 'teacher'; // Default to teacher
  teacherForm!: FormGroup;
  studentForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Initialize the form for the Teacher
    this.teacherForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      allocatedCourses: this.fb.array([])
    }, { validators: passwordMatchValidator }); // Apply the custom validator to the whole form group

    // Initialize the form for the Student
    this.studentForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      enrolledCourses: this.fb.array([])
    }, { validators: passwordMatchValidator });
  }

  // --- Helper Getters for Teacher FormArray ---
  get allocatedCourses(): FormArray {
    return this.teacherForm.get('allocatedCourses') as FormArray;
  }

  newCourse(): FormGroup {
    return this.fb.group({
      id: [''], // ID can be optional at creation
      name: ['', Validators.required]
    });
  }

  addAllocatedCourse() {
    this.allocatedCourses.push(this.newCourse());
  }

  removeAllocatedCourse(i: number) {
    this.allocatedCourses.removeAt(i);
  }

  // --- Helper Getters for Student FormArray ---
  get enrolledCourses(): FormArray {
    return this.studentForm.get('enrolledCourses') as FormArray;
  }

  addEnrolledCourse() {
    this.enrolledCourses.push(this.newCourse());
  }

  removeEnrolledCourse(i: number) {
    this.enrolledCourses.removeAt(i);
  }

  // --- General Methods ---
  setUserType(type: 'teacher' | 'student') {
    this.userType = type;
  }

  onTeacherSubmit() {
    if (this.teacherForm.valid) {
      console.log('Signing up as Teacher:', this.teacherForm.value);
      // Here you would send the data to your backend API
    } else {
      console.error('Teacher form is invalid');
      this.teacherForm.markAllAsTouched(); // Show validation errors
    }
  }

  onStudentSubmit() {
    if (this.studentForm.valid) {
      console.log('Signing up as Student:', this.studentForm.value);
      // Here you would send the data to your backend API
    } else {
      console.error('Student form is invalid');
      this.studentForm.markAllAsTouched(); // Show validation errors
    }
  }
}
