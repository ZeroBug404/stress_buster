import { ReactNode } from "react";

export type TUser = {
  userId: string;
  userEmail: string;
  userRole: string;
  role: string;
  iat: number;
  exp: number;
};

export type TService = {
  id: number;
  icon: ReactNode;
  heading: string;
  titleText: string;
};
