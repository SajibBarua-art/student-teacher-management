// src/app/app.routes.ts

import { Routes } from '@angular/router';
import {Login} from './components/login/login';
import {Home} from './components/home/home';
import {AddTeacher} from './components/add-teacher/add-teacher';
import {TeachersSection} from './components/teachers-section/teachers-section';
import {StudentsSection} from './components/students-section/students-section';
import {ShowTeachers} from './components/show-teachers/show-teachers';
import {EditTeacher} from './components/edit-teacher/edit-teacher';
import {TeacherDetails} from './components/teacher-details/teacher-details';
import {AddStudent} from './components/add-student/add-student';
import {ShowStudents} from './components/show-students/show-students';
import {EditStudent} from './components/edit-student/edit-student';
import {StudentDetails} from './components/student-details/student-details';

// Import your standalone page components

export const routes: Routes = [
  // This is the same route configuration as before
  { path: 'login', component: Login },
  { path: 'home', component: Home },

  { path: 'teachers-section', component: TeachersSection },
  { path: 'add-teacher', component: AddTeacher },
  { path: 'show-teachers', component: ShowTeachers},
  { path: 'edit-teacher/:id', component: EditTeacher},
  { path: 'teacher-details/:id', component: TeacherDetails},

  { path: 'students-section', component: StudentsSection},
  { path: 'add-student', component: AddStudent },
  { path: 'show-students', component: ShowStudents},
  { path: 'edit-student/:id', component: EditStudent},
  { path: 'student-details/:id', component: StudentDetails},

  // Default and wildcard routes
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];
