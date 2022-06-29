export type GetUserRequest = {
  page: number;
  role?: number;
  name?: string;
};

export type GetDetailUserRequest = {
  userId: number;
};

export type FollowRequest = {
  partnerId: number;
};

export type LoginRequest = {
  username: string;
  password: string;
};

export type RegisterRequest = {
  email: string;
  password: string;
  username: string;
  phone: string;
};

export type AccountState<T> = {
  response?: T;
  registerResponse?: T;
  pending: boolean;
  error: boolean;
  user?: User;
  users?: User[];
  totalRecord?: number;
  detailUser?: User;
  deleteSuccess: boolean;
  createUserSuccess: boolean;
  toggleFollow: boolean;
};

export interface UserResponse {
  body: User;
}

export interface User {
  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
  id: number;
  phone: string;
  email: string;
  password: string;
  name: string;
  address?: any;
  avatarId?: any;
  role: number;
  totalFollower: number;
  description?: any;
  job?: any;
  avatar?: any;
  gender?: any;
  birthday?: any;
  accessToken: string;
  follow?: any;
}
