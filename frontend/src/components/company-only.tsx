"use client";
import { ReactNode } from "react";
import { useStoredUser } from "./account-nav";
export function CompanyOnly({ children }: { children: ReactNode }) {
  const user = useStoredUser();
  return user?.account_type === "company" ? <>{children}</> : null;
}
