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
import {AuthGuard} from './auth-guard';
import {Signup} from './components/signup/signup';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'signup', component: Signup },

  // All protected routes
  { path: 'home', component: Home, canActivate: [AuthGuard] },

  { path: 'teachers-section', component: TeachersSection, canActivate: [AuthGuard] },
  { path: 'add-teacher', component: AddTeacher, canActivate: [AuthGuard] },
  { path: 'show-teachers', component: ShowTeachers, canActivate: [AuthGuard] },
  { path: 'edit-teacher/:id', component: EditTeacher, canActivate: [AuthGuard] },
  { path: 'teacher-details/:id', component: TeacherDetails, canActivate: [AuthGuard] },

  { path: 'students-section', component: StudentsSection, canActivate: [AuthGuard] },
  { path: 'add-student', component: AddStudent, canActivate: [AuthGuard] },
  { path: 'show-students', component: ShowStudents, canActivate: [AuthGuard] },
  { path: 'edit-student/:id', component: EditStudent, canActivate: [AuthGuard] },
  { path: 'student-details/:id', component: StudentDetails, canActivate: [AuthGuard] },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];
