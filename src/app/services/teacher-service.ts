import {inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {forkJoin, Observable, of, switchMap} from 'rxjs';
import {Teacher} from '../models/teacher.model';
import {CourseService} from './course-service';
import {Course} from '../models/course.model';
import {GLOBALS} from '../shared/constants';

// Define a type for the data our helper method will return
export interface ResolvedTeacherData {
  teacher: Teacher;
  allocatedCoursesDetails: Course[];
  allCourses?: Course[];
}

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private teachersApiUrl = `${GLOBALS.api}/teachers`;

  private courseService = inject(CourseService);

  constructor(private http: HttpClient) { }

  // To get all teachers
  getTeachers(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(this.teachersApiUrl);
  }

  // To get one teacher by their id
  getTeacher(id: number | string): Observable<Teacher> {
    return this.http.get<Teacher>(`${this.teachersApiUrl}/${id}`);
  }

  getResolvedTeacherData(id: number, includeAllCourses: boolean = false): Observable<ResolvedTeacherData> {
    // 1. First, get the basic teacher information.
    return this.getTeacher(id).pipe(
      // 2. Use the teacher data to make further API calls.
      switchMap(teacher => {

        // Logic to get details of allocated courses
        const allocatedCoursesDetails$ = (teacher.allocatedCourseIds?.length > 0)
          ? forkJoin(teacher.allocatedCourseIds.map(courseId => this.courseService.getCourse(courseId)))
          : of([]); // If no courses, just return an empty array

        // Logic to get all courses (only if requested)
        const allCourses$ = includeAllCourses
          ? this.courseService.getAllCourses()
          : of(undefined);

        // 3. Combine all the results into a single object.
        return forkJoin({
          teacher: of(teacher),
          allocatedCoursesDetails: allocatedCoursesDetails$,
          allCourses: allCourses$
        });
      })
    );
  }

  createTeacher(teacherData: Omit<Teacher, 'id'>): Observable<Teacher> {
    return this.http.post<Teacher>(this.teachersApiUrl, teacherData);
  }

  // NEW: Method to UPDATE a teacher's data using PUT
  updateTeacher(id: number | string, teacherData: Teacher): Observable<Teacher> {
    return this.http.put<Teacher>(`${this.teachersApiUrl}/${id}`, teacherData);
  }

  // Method to DELETE a teacher by their ID
  deleteTeacher(id: number | string): Observable<void> {
    return this.http.delete<void>(`${this.teachersApiUrl}/${id}`);
  }

}
