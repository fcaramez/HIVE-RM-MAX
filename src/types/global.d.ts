declare global {
  type User = {
    id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    gender: string;
    createdAt: Date;
    updatedAt: Date;
    teacherId?: string | null;
    weights?: Weight[];
    repMaxes?: RepMax[];
    Teacher?: Teacher | null;
  };

  type Teacher = {
    id: string;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    students?: User[];
  };

  type Exercise = {
    id: string;
    name: string;
    category: string;
    description?: string | null;
    createdAt: Date;
    updatedAt: Date;
    weights?: Weight[];
    repMaxes?: RepMax[];
  };

  type Weight = {
    id: string;
    weight: number;
    reps: number;
    sets: number;
    date: Date;
    userId: string;
    exerciseId: string;
    createdAt: Date;
    updatedAt: Date;
    user?: User;
    exercise?: Exercise;
  };

  type RepMax = {
    id: string;
    date: Date;
    userId: string;
    exerciseId: string;
    max: number;
    reps: number;
    createdAt: Date;
    updatedAt: Date;
    user?: User;
    exercise?: Exercise;
  };

  type RegisterFormData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: 'aluno' | 'professor';
    gender: 'male' | 'female';
    teacher?: string;
    teacherPassword?: string;
  };

  type StudentFormData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    gender: 'male' | 'female';
    teacher?: string;
  };

  type TeacherFormData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    teacherPassword: string;
  };

  type StudentRegisterRequest = {
    name: string;
    email: string;
    password: string;
    gender: 'male' | 'female';
    teacher?: string;
  };

  type TeacherRegisterRequest = {
    name: string;
    email: string;
    password: string;
    teacherPassword: string;
  };

  type LoginRequest = {
    email: string;
    password: string;
  };

  type AuthResponse =
    | {
        success: true;
        message: string;
        data: {
          token: string;
        };
      }
    | {
        success: false;
        error: string;
        data: null;
      };

  type TeacherOption = 'pombo' | 'rocha' | 'carolina';
  type UserRole = 'aluno' | 'professor';
  type Gender = 'male' | 'female';
  type RegisterTab = 'student' | 'teacher';
}

export {};
