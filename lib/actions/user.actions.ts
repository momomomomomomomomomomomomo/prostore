"use server";
import { AuthError } from "next-auth";

import { signIn, signOut } from "@/auth";
import { signInFormSchema, signUpFormSchema } from "../validators";

import { hashSync } from "bcrypt-ts-edge";
import { prisma } from "@/db/prisma";
import { formatError } from "../utils";
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

export async function signUpUser(prevState: unknown, formData: FormData) {
  try {
    const user = signUpFormSchema.parse({
      name: formData.get("name"),
      email: formData.get("email"),
      confirmPassword: formData.get("confirmPassword"),
      password: formData.get("password"),
    });

    const plainPassword = user.password;

    user.password = hashSync(user.password, 10);

    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });

    await signIn("credentials", {
      email: user.email,
      password: plainPassword,
    });

    return { success: true, message: "User created successfully" };
  } catch (error) {
    if (error instanceof AuthError) {
      throw error;
    }

    return {
      success: false,
      message: formatError(error),
    };
  }
}
