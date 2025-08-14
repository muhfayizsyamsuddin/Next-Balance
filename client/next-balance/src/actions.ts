"use server";

import { cookies } from "next/headers";

export async function LogOut() {
  const cookieStore = await cookies();
  cookieStore.delete("Authorization");
}
