export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  profilePhoto: string | null;
  role: "USER" | "ADMIN";
}

export interface RegisterPayload {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface RegisterResponse {
  id: number;
  name: string;
  email: string;
  phone: string;
  profilePhoto: string | null;
  role: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}
export interface LoginResponse {
  token: string;
  user: User;
}

export interface UserProfile {
  id: number;
  name: string;
  email: string;
  phone: string;
  profilePhoto: string | null;
  role: "USER" | "ADMIN";
  createdAt: string;
}

export interface LoanStats {
  borrowed: number;
  late: number;
  returned: number;
  total: number;
}

export interface MeResponse {
  profile: UserProfile;
  loanStats: LoanStats;
  reviewsCount: number;
}
