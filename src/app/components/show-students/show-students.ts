import { Component } from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {Student} from '../../models/student.model';
import {StudentService} from '../../services/student-service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-show-students',
  imports: [
    NgForOf,
    NgIf,
    RouterLink
  ],
  templateUrl: './show-students.html',
  styleUrl: './show-students.css'
})
export class ShowStudents {
  students: Student[] = [];

  constructor(private  studentService: StudentService) {
  }

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    console.log("loading");

    this.studentService.getStudents().subscribe({
      next: (data) => {
        this.students = data;
        console.log('Students loaded:', this.students);
      },
      error: (err) => {
        console.error('Failed to load students', err);
        alert('Could not fetch data. Is your API server running?');
      }
    });
  }

  // Method to handle the delete action
  deleteStudent(id: number | string): void {
    if (confirm('Are you sure you want to delete this student?')) {
      this.studentService.deleteStudent(id).subscribe({
        next: () => {
          console.log(`Student with id ${id} deleted.`);
          // Refresh the list by filtering out the deleted student
          this.students = this.students.filter(student => student.id !== id);
        },
        error: (err) => console.error('Failed to delete student', err)
      });
    }
  }

  // Placeholder methods for other actions
  updateStudent(id: number | string): void {
    console.log('Update student with id:', id);
    // Here you would navigate to an 'edit-student' page
    alert('Update functionality not yet implemented.');
  }

  viewDetails(id: number | string): void {
    console.log('View details for student with id:', id);
    // Here you would navigate to a 'student-details' page
    alert('Details functionality not yet implemented.');
  }
}
