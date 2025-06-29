import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Course} from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private coursesApiUrl = 'http://localhost:3000/courses';

  constructor(private http: HttpClient) { }

  // Method to GET all available courses
  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.coursesApiUrl);
  }

  // To get one course by their id
  getCourse(id: number | string): Observable<Course> {
    return this.http.get<Course>(`${this.coursesApiUrl}/${id}`);
  }
}
