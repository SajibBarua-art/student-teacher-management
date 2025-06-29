import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {TeachersSection} from '../teachers-section/teachers-section';
import {StudentsSection} from '../students-section/students-section';
import {GLOBALS} from '../../shared/constants';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    TeachersSection,
    StudentsSection,
    NgIf
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.css', '../navbar/navbar.css']
})
export class Home {
  title = 'Welcome to the Teacher Student Management System';
}
