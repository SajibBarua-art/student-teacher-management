export interface Student {
  id: number | string;
  name: string;
  email: string;
  allocatedCourseIds: number[] | string[];
}
