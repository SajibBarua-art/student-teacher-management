export interface Teacher {
  id: number | string;
  name: string;
  email: string;
  allocatedCourseIds: number[] | string[];
}
