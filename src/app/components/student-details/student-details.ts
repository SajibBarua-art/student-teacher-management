import { Component } from '@angular/core';
import {ResolvedStudentData, StudentService} from '../../services/student-service';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-student-details',
  imports: [ CommonModule, RouterLink ],
  templateUrl: './student-details.html',
  styleUrl: './student-details.css'
})
export class StudentDetails {
  isLoading = true;
  // We can use the ResolvedStudentData type for our component's state
  resolvedData: ResolvedStudentData | null = null;

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService, // We only need StudentService now
  ) {}

  ngOnInit(): void {
    const studentId = Number(this.route.snapshot.paramMap.get('id'));

    if (studentId) {
      // Call the new, simple helper method from the service!
      this.studentService.getResolvedStudentData(studentId).subscribe({
        next: (data) => {
          this.resolvedData = data;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Failed to load student details', err);
          this.isLoading = false;
        }
      });
    }
  }
}
