import {inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {forkJoin, Observable, of, switchMap} from 'rxjs';
import {Student} from '../models/student.model';
import {CourseService} from './course-service';
import {Course} from '../models/course.model';
import {GLOBALS} from '../shared/constants';

// Define a type for the data our helper method will return
export interface ResolvedStudentData {
  student: Student;
  allocatedCoursesDetails: Course[];
  allCourses?: Course[];
}

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private studentsApiUrl = `${GLOBALS.api}/students`;

  private courseService = inject(CourseService);

  constructor(private http: HttpClient) { }

  // To get all students
  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.studentsApiUrl);
  }

  // To get one student by their id
  getStudent(id: number | string): Observable<Student> {
    return this.http.get<Student>(`${this.studentsApiUrl}/${id}`);
  }

  getResolvedStudentData(id: number, includeAllCourses: boolean = false): Observable<ResolvedStudentData> {
    // 1. First, get the basic student information.
    return this.getStudent(id).pipe(
      // 2. Use the student data to make further API calls.
      switchMap(student => {

        // Logic to get details of allocated courses
        const allocatedCoursesDetails$ = (student.allocatedCourseIds?.length > 0)
          ? forkJoin(student.allocatedCourseIds.map(courseId => this.courseService.getCourse(courseId)))
          : of([]); // If no courses, just return an empty array

        // Logic to get all courses (only if requested)
        const allCourses$ = includeAllCourses
          ? this.courseService.getAllCourses()
          : of(undefined);

        // 3. Combine all the results into a single object.
        return forkJoin({
          student: of(student),
          allocatedCoursesDetails: allocatedCoursesDetails$,
          allCourses: allCourses$
        });
      })
    );
  }

  createStudent(studentData: Omit<Student, 'id'>): Observable<Student> {
    return this.http.post<Student>(this.studentsApiUrl, studentData);
  }

  // NEW: Method to UPDATE a student's data using PUT
  updateStudent(id: number | string, studentData: Student): Observable<Student> {
    return this.http.put<Student>(`${this.studentsApiUrl}/${id}`, studentData);
  }

  // Method to DELETE a student by their ID
  deleteStudent(id: number | string): Observable<void> {
    return this.http.delete<void>(`${this.studentsApiUrl}/${id}`);
  }

}
