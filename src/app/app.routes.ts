// src/app/app.routes.ts

import { Routes } from '@angular/router';
import {Login} from './components/login/login';
import {Signup} from './components/signup/signup';
import {Home} from './components/home/home';
import {AddTeacher} from './components/add-teacher/add-teacher';
import {TeachersSection} from './components/teachers-section/teachers-section';
import {StudentsSection} from './components/students-section/students-section';
import {ShowTeachers} from './components/show-teachers/show-teachers';
import {EditTeacher} from './components/teachers-section/edit-teacher/edit-teacher';
import {TeacherDetails} from './components/teacher-details/teacher-details';

// Import your standalone page components

export const routes: Routes = [
  // This is the same route configuration as before
  { path: 'login', component: Login },
  { path: 'signup', component: Signup },
  { path: 'home', component: Home },
  { path: 'teachers-section', component: TeachersSection },
  { path: 'students-section', component: StudentsSection},
  { path: 'add-teacher', component: AddTeacher },
  { path: 'show-teachers', component: ShowTeachers},
  { path: 'edit-teacher/:id', component: EditTeacher},
  { path: 'teacher-details/:id', component: TeacherDetails},

  // Default and wildcard routes
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];
