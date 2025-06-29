import { Component } from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {Teacher} from '../../models/teacher.model';
import {TeacherService} from '../../services/teacher-service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-show-teachers',
  imports: [
    NgForOf,
    NgIf,
    RouterLink
  ],
  templateUrl: './show-teachers.html',
  styleUrl: './show-teachers.css'
})
export class ShowTeachers {
  teachers: Teacher[] = [];

  constructor(private  teacherService: TeacherService) {
  }

  ngOnInit(): void {
    this.loadTeachers();
  }

  loadTeachers(): void {
    console.log("loading");

    this.teacherService.getTeachers().subscribe({
      next: (data) => {
        this.teachers = data;
        console.log('Teachers loaded:', this.teachers);
      },
      error: (err) => {
        console.error('Failed to load teachers', err);
        alert('Could not fetch data. Is your API server running?');
      }
    });
  }

  // Method to handle the delete action
  deleteTeacher(id: number | string): void {
    if (confirm('Are you sure you want to delete this teacher?')) {
      this.teacherService.deleteTeacher(id).subscribe({
        next: () => {
          console.log(`Teacher with id ${id} deleted.`);
          // Refresh the list by filtering out the deleted teacher
          this.teachers = this.teachers.filter(teacher => teacher.id !== id);
        },
        error: (err) => console.error('Failed to delete teacher', err)
      });
    }
  }

  // Placeholder methods for other actions
  updateTeacher(id: number | string): void {
    console.log('Update teacher with id:', id);
    // Here you would navigate to an 'edit-teacher' page
    alert('Update functionality not yet implemented.');
  }

  viewDetails(id: number | string): void {
    console.log('View details for teacher with id:', id);
    // Here you would navigate to a 'teacher-details' page
    alert('Details functionality not yet implemented.');
  }
}
