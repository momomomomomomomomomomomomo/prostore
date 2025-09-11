"use server";
import { AuthError } from "next-auth";

import { signIn, signOut } from "@/auth";
import { signInFormSchema } from "../validators";

// Sign in the user with credentials
export async function signInWithCredentials(
  prevState: unknown,
  formData: FormData
) {
  try {
    // Set user from form and validate it with Zod schema
    const user = signInFormSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    await signIn("credentials", user);

    return { success: true, message: "Signed in successfully" };
  } catch (error) {
    if (error instanceof AuthError) {
      return { success: false, message: "Invalid email or password" };
    }

    throw error;
  }
}

// Sign the user out
export async function signOutUser() {
  await signOut();
}
