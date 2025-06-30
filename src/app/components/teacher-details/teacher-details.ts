import { Component } from '@angular/core';
import {ResolvedTeacherData, TeacherService} from '../../services/teacher-service';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-teacher-details',
  imports: [ CommonModule, RouterLink ],
  templateUrl: './teacher-details.html',
  styleUrl: './teacher-details.css'
})
export class TeacherDetails {
  isLoading = true;
  // We can use the ResolvedTeacherData type for our component's state
  resolvedData: ResolvedTeacherData | null = null;

  constructor(
    private route: ActivatedRoute,
    private teacherService: TeacherService, // We only need TeacherService now
  ) {}

  ngOnInit(): void {
    const teacherId = this.route.snapshot.paramMap.get('id');

    if (teacherId) {
      // Call the new, simple helper method from the service!
      this.teacherService.getResolvedTeacherData(teacherId).subscribe({
        next: (data) => {
          this.resolvedData = data;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Failed to load teacher details', err);
          this.isLoading = false;
        }
      });
    }
  }
}
