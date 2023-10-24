export interface LoginDTO {
  email: string;
  password: string
}

export interface RegisterDTO {
  email: string;
  password: string;
  name: string
}
export interface CategoryDTO {
  title: string;
}
export interface TestDTO {
  title: string;
  description: string;
  duration: number;
  categories: string[];
  isPublic: boolean;
  status: string;
}

export interface QuestionDto {
  type: string;
  title: string;
  description: string;
  q_image: FileDTO | null;
  answers: Array<{
    text: string;
    isCorrect: boolean;
    isStrictText: boolean;
    a_image: FileDTO | null;
  }>;
}

export interface UserDTO {
  // firstName: string;
  // lastName: string;
  // phone: string;
  // gender: string;
  // birth: string;
  email:string;
  password: string;
  name: string;
  // tgUserId?: number;
}

export interface FileDTO
{
  fileName: string;
  contentType: string;
  data: number[];
}

export interface User extends UserDTO {
  id: number;
}
export interface Test extends TestDTO {
  Id: number;
}
export interface TrainingDTO {
  name: string;
  duration: number;
  maxPeople: number;
  price: number;
  organizationId: number;
}

export interface Training extends TrainingDTO {
  id: number;
}

export interface Category extends CategoryDTO {
  id: number;
}

export interface QuestionType {
  id: number;
  type: string;
}

export interface Organization {
  id: number;
  isActive: boolean;
  name: string;
}

export interface LoggedInUser extends User {
  ownerOrganizations: Array<Organization>;
}

export interface ServerError {
  statusCode: number;
  message: string;
}

export type AuthResponse = { token: string; user: LoggedInUser };
